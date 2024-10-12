const User = require("../models/User");

class UserController {
   async addUser(userData) {
      try {
        // Overenie, či už existuje používateľ s rovnakým emailom alebo prezývkou
        const existingUser = await User.findOne({
            $or: [{ email: userData.email }, { nickName: userData.nickName }]
        });

        if (existingUser) {
            if (existingUser.email === userData.email) {
               return { success: false, message: "Email already exists" };
            }
            if (existingUser.nickName === userData.nickName) {
               return { success: false, message: "Nickname already exists" };
            }
        }

        await new User(userData).save();
        return { success: true, message: "User is registered successfull !" };
      } catch (error) {
        throw new Error(`Error adding user: ${error.message}`);
      }
   }
}

module.exports = UserController;