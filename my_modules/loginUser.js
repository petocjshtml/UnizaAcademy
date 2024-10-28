require("dotenv").config();
const jwt = require('jsonwebtoken');

function loginUser(response, user){
     const token = jwt.sign({ id: user._id }, process.env.API_KEY, { expiresIn: '1h' });
     response.status(200).send({
       success: true,
       message: "Prihlásenie prebehlo úspešne!",
       token: token,  
       user: {
           id: user._id,
           email: user.email,
           nickName: user.nickName,
           isAdmin: user.isAdmin,
           token: token, 
           //heslo sa neposiela na frontend z bezpečnostných dôvodov
       }  
     });
}

module.exports = loginUser;