const UserController = require("./controllers/UserController");
const userController = new UserController();
const loginUser = require('./my_modules/loginUser'); 

const express = require('express');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const verifyToken = require('./my_modules/authMiddleware'); 

require("dotenv").config();

//pripojenie k db
mongoose
   .connect(process.env.MONGO_URI)
   .then(() => console.log("MongoDB Connected"))
   .catch((err) => console.error("MongoDB Connection Error:", err));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

//endpoint pre zobrazenie frontendu
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//backend endpointy
app.post("/registerUser", async (req, res) => {
    try {
       const response = await userController.addUser(req.body);
       res.status(200).send(response);
    } catch (error) {
       res.status(400).send({ error: error.message });
    }
});

app.post("/loginUser", async (req, res) => {
    try {
        const user = await userController.selectUserByEmail(req.body.email); 
        if(user)
        {
            const isPasswordCorrect = userController.verifyUserPassword(req.body.password,user.password);
            isPasswordCorrect ? loginUser(res,user) : res.status(200).send({ success: false, message: "Nesprávne heslo !" });
        }
        else {  res.status(200).send({ success: false, message: "Email neexistuje !" }); } 
    } catch (error) {
       res.status(400).send({ error: error.message });
    }
});

//chránené backend endpointy pomocou auth middlewaru //

//zmena prezývky
app.put("/change-nickname/:id",verifyToken, async (req, res) => {
    try {
       const response = await userController.changeNickName(req.params.id, req.body.newNickName);
       res.status(200).send(response);
    } catch (error) {
       res.status(400).send({ error: error.message });
    }
});

//zmena hesla
app.put("/change-password/:id",verifyToken, async (req, res) => {
    try {
       const response = await userController.changePassword(req.params.id, req.body.oldPassword, req.body.newPassword);
       res.status(200).send(response);
    } catch (error) {
       res.status(400).send({ error: error.message });
    }
});

//spustenie serveru
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
