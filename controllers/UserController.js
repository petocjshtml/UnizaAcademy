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
}

module.exports = UserController;