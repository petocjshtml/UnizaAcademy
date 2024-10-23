const UserController = require("./controllers/UserController");

const userController = new UserController();


const express = require('express');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const verifyToken = require('./my_modules/authMiddleware'); 

require("dotenv").config();

// video modules
const fetchVideoData = require('./my_modules/videoinfo/fetchVideoData');
const parseVideoData = require('./my_modules/videoinfo/parseVideoData');

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
            if(isPasswordCorrect)
            {
              //login success
              const token = jwt.sign({ id: user._id }, process.env.API_KEY, { expiresIn: '1h' });
              res.status(200).send({
                success: true,
                message: "Prihlásenie prebehlo úspešne!",
                token: token,  
                user: {
                    id: user._id,
                    email: user.email,
                    nickName: user.nickName,
                    isAdmin: user.isAdmin,
                    //heslo sa vraj neposiela na frontend z bezpečnostných dôvodov
                }  
              });
            }
            else
            {
                res.status(200).send({ success: false, message: "Nesprávne heslo !" });
            }
        }
        else
        {
            res.status(200).send({ success: false, message: "Email neexistuje !" });
        } 
    } catch (error) {
       res.status(400).send({ error: error.message });
    }
});


//zabezpečená backend endpointy - pridaný verifyToken auth middleware
app.post("/change-nickname",verifyToken, async (req, res) => {
    try {
       const response = await userController.changeNickName(req.userId, req.body.newNickName);
       res.status(200).send(response);
    } catch (error) {
       res.status(400).send({ error: error.message });
    }
});

//zabezpečená backend endpointy - pridaný verifyToken auth middleware
app.post("/change-email",verifyToken, async (req, res) => {
    try {
       const response = await userController.changeEmail(req.userId, req.body.newEmail);
       res.status(200).send(response);
    } catch (error) {
       res.status(400).send({ error: error.message });
    }
});

app.post("/change-password",verifyToken, async (req, res) => {
    try {
       const response = await userController.changePassword(req.userId, req.body.oldPassword, req.body.newPassword);
       res.status(200).send(response);
    } catch (error) {
       res.status(400).send({ error: error.message });
    }
});


//získanie parametrov a overenie platnosti videa (na youtube) :
//http://localhost:3000/check-video?url=https://www.youtube.com/watch?v=z0-Lk4P-c3o
app.get('/check-video', verifyToken, async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.status(400).json({ message: 'No video URL provided' });
    }
    try {
        const { data, statusCode } = await fetchVideoData(videoUrl);
        const videoInfo = parseVideoData(data);

        if (statusCode === 200 && videoInfo.hasVideoMetaTag && !videoInfo.videoUnavailable) {
            res.json({
                exists: true,
                duration: videoInfo.videoDurationFormatted,
                thumbnail: videoInfo.thumbnailUrl,
                title: videoInfo.videoTitle,
                views: videoInfo.viewCount,
                likes: videoInfo.likeCount
            });
        } else {
            res.json({ exists: false, message: 'Video is unavailable or restricted' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching video URL', error: error.toString() });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
