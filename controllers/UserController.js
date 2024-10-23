const User = require("../models/User");
const crypto = require('crypto');

class UserController {
   async addUser(userData) {
      try {
        // Overenie, či už existuje používateľ s rovnakým emailom alebo prezývkou
        const existingUser = await User.findOne({
            $or: [{ email: userData.email }, { nickName: userData.nickName }]
        });

        if (existingUser) {
            if (existingUser.email === userData.email) {
               return { success: false, message: "Zadaný email už existuje." };
            }
            if (existingUser.nickName === userData.nickName) {
               return { success: false, message: "Zadaná prezývka už existuje." };
            }
        }

        // Vytvorenie salt a zahashovanie hesla pomocou SHA-256
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto.pbkdf2Sync(userData.password, salt, 1000, 64, 'sha256').toString('hex');
        userData.password = `${salt}:${hashedPassword}`;  

        await new User(userData).save();

        return { success: true, message: "User is registered successfull !" };

      } catch (error) {
        throw new Error(`Error adding user: ${error.message}`);
      }
   }

   verifyUserPassword(inputPassword, storedPassword) {
      const [salt, originalHash] = storedPassword.split(':');
      const hashedInputPassword = crypto.pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha256').toString('hex');
      return hashedInputPassword === originalHash;
   }

   async selectUserByEmail(email) {
      try {
         const user = await User.findOne({ email: email });
         if (!user) {
            return null;  
         }
         return user;  
      } catch (error) {
         throw new Error(`Chyba pri hľadaní používateľa podľa emailu: ${error.message}`);
      }
   }

   async changeEmail(userId, newEmail) {
      try {
     
          // Overenie, či už nový email existuje
          const existingUser = await User.findOne({ email: newEmail });
          if (existingUser) {
              return { success: false, message: "Tento email už je používaný." };
          }
  
          // Aktualizácia emailu
          const updatedUser = await User.findByIdAndUpdate(userId, { email: newEmail }, { new: true });
          if (!updatedUser) {
              throw new Error("Používateľ nebol nájdený.");
          }

          // Konverzia Mongoose dokumentu na obyčajný JS objekt
          const updatedUserObject = updatedUser.toObject();
          // neposielať heslo na frontend
          delete updatedUserObject.password;
          return { success: true, message: "Email úspešne zmenený.", user: updatedUserObject };
      } catch (error) {
          throw new Error(`Chyba pri zmene emailu: ${error.message}`);
      }
   }

   async changeNickName(userId, newNickName) {
      try {
          // Overenie, či už nová prezývka existuje
          const existingUser = await User.findOne({ nickName: newNickName });
          if (existingUser) {
              return { success: false, message: "Táto prezývka už je používaná." };
          }
  
          // Aktualizácia prezývky
          const updatedUser = await User.findByIdAndUpdate(userId, { nickName: newNickName }, { new: true });
          if (!updatedUser) {
              throw new Error("Používateľ nebol nájdený.");
          }
  
          // Konverzia Mongoose dokumentu na obyčajný JS objekt
          const updatedUserObject = updatedUser.toObject();
          // neposielať heslo na frontend
          delete updatedUserObject.password;
          return { success: true, message: "Prezývka úspešne zmenená.", user: updatedUserObject };
      } catch (error) {
          throw new Error(`Chyba pri zmene prezývky: ${error.message}`);
      }
   }

   async changePassword(userId, oldPassword, newPassword) {
      try {
          // Nájdeme používateľa podľa ID
          const user = await User.findById(userId);
          if (!user) {
              throw new Error("Používateľ nebol nájdený.");
          }
  
          // Overenie starého hesla
          const [salt, originalHash] = user.password.split(':');
          const hashedOldPassword = crypto.pbkdf2Sync(oldPassword, salt, 1000, 64, 'sha256').toString('hex');
  
          if (hashedOldPassword !== originalHash) {
              return { success: false, message: "Staré heslo nie je správne." };
          }
  
          // Vytvorenie salt a zahashovanie nového hesla pomocou SHA-256
          const newSalt = crypto.randomBytes(16).toString('hex');
          const hashedNewPassword = crypto.pbkdf2Sync(newPassword, newSalt, 1000, 64, 'sha256').toString('hex');
          const passwordWithSalt = `${newSalt}:${hashedNewPassword}`;
  
          // Aktualizácia hesla
          const updatedUser = await User.findByIdAndUpdate(userId, { password: passwordWithSalt }, { new: true });
          if (!updatedUser) {
              throw new Error("Používateľ nebol nájdený.");
          }
  
          // Konverzia Mongoose dokumentu na obyčajný JS objekt
          const updatedUserObject = updatedUser.toObject();
          // neposielať heslo na frontend
          delete updatedUserObject.password;
          return { success: true, message: "Heslo úspešne zmenené.", user: updatedUserObject };
      } catch (error) {
          throw new Error(`Chyba pri zmene hesla: ${error.message}`);
      }
   }
  
   async isAdmin(userId) {
      try {
         const user = await User.findById(userId);
         if (!user) {
            throw new Error("Používateľ nebol nájdený.");
         }
         return user.isAdmin === true;
      } catch (error) {
         throw new Error(`Chyba pri kontrole admin práv: ${error.message}`);
      }
   }
}

module.exports = UserController;