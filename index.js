const UserController = require("./controllers/UserController");
const userController = new UserController();
const FacultyController = require("./controllers/FacultyController");
const facultyController = new FacultyController();
const StudyFormController = require("./controllers/StudyFormController");
const studyFormController = new StudyFormController();
const StudyYearController = require("./controllers/StudyYearController");
const studyYearController = new StudyYearController();
const StudyProgramController = require("./controllers/StudyProgramController");
const studyProgramController = new StudyProgramController();
const StudySubjectController = require("./controllers/StudySubjectController");
const studySubjectController = new StudySubjectController();
const VideotutorialController =  require("./controllers/VideotutorialController");
const videotutorialController = new VideotutorialController();
const TagController = require("./controllers/TagController");
const tagController = new TagController();
const AppController = require("./controllers/AppController");
const appController = new AppController();

const loginUser = require('./my_modules/loginUser'); 

const express = require('express');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const verifyToken = require('./my_modules/authMiddleware'); 
const checkAdmin = require('./my_modules/checkAdmin'); 
const checkVideo = require('./my_modules/checkVideo'); 

require("dotenv").config();
console.log("MongoDB URI:", process.env.MONGODB_URI);

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

app.get("/getAllAdmins", async (req, res) => {
    try {
        const users = await userController.getAllAdmins();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

//objekty
app.get("/getObjects", async (req, res) => {
    try {
        const response = await appController.getObjects();
        res.status(200).send(response);
    } catch (error) {
       res.status(400).send({ error: error.message });
    }
});

//objekty pre prihlásených
app.get("/getObjectsLoggedIn",verifyToken, async (req, res) => {
    try {
        const response = await appController.getObjectsLoggedIn();
        res.status(200).send(response);
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

//pridanie fakulty
app.post("/addFaculty",verifyToken, async (req, res) => {
    try {
        if(await checkAdmin(req, res, userController))
        {
            const response = await facultyController.addFaculty(req.body);
            res.status(200).send(response);
        }
    } catch (error) {
       res.status(400).send({ error: error.message });
    }
});

//pridanie formy štúdia
app.post("/addStudyForm",verifyToken, async (req, res) => {
    try {
        if(await checkAdmin(req, res, userController))
        {
            const response = await studyFormController.addStudyForm(req.body);
            res.status(200).send(response);
        }
    } catch (error) {
       res.status(400).send({ error: error.message });
    }
});

app.post("/addStudyYear",verifyToken, async (req, res) => {
    try {
        if(await checkAdmin(req, res, userController))
        {
            const response = await studyYearController.addStudyYear(req.body);
            res.status(200).send(response);
        }
    } catch (error) {
       res.status(400).send({ error: error.message });
    }
});

app.post("/addStudyProgram",verifyToken, async (req, res) => {
    try {
        if(await checkAdmin(req, res, userController))
        {
            const response = await studyProgramController.addStudyProgram(req.body);
            res.status(200).send(response);
        }
    } catch (error) {
       res.status(400).send({ error: error.message });
    }
});

app.post("/addStudySubject",verifyToken, async (req, res) => {
    try {
        if(await checkAdmin(req, res, userController))
        {
            const response = await studySubjectController.addStudySubject(req.body);
            res.status(200).send(response);
        }
    } catch (error) {
       res.status(400).send({ error: error.message });
    }
});

app.put("/editStudySubject/:id", verifyToken, async (req, res) => {
    try {
        if(await checkAdmin(req, res, userController)) 
        {
            const response = await studySubjectController.updateStudySubject(req.params.id, req.body);
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.delete("/deleteStudySubject/:id", verifyToken, async (req, res) => {
    try {
        if(await checkAdmin(req, res, userController)) 
        {
            const response = await studySubjectController.deleteStudySubject(req.params.id);
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post('/checkVideotutorial', verifyToken, async (req, res) => {
    try {
        if(await checkAdmin(req, res, userController)) 
        {
            const videoInfo = await checkVideo(req.body.youtubeUrl);
            res.status(200).send(videoInfo);
        } 
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post("/addVideotutorial", verifyToken, async (req, res) => {
    try {
        if (await checkAdmin(req, res, userController)) 
        { 
            await tagController.addTags(req.body.tags);
            const response = await videotutorialController.addVideotutorial(req.body);
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get("/getVideotutorials",verifyToken, async (req, res) => {
    try {
        const videotutorials = await videotutorialController.getAllVideotutorials();
        res.status(200).send(videotutorials);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

//public endpoint bez zabezpečenia
app.get("/getPublicVideotutorials", async (req, res) => {
    try {
        const publicVideotutorials = await videotutorialController.getAllPublicVideotutorials();
        res.status(200).send(publicVideotutorials);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.delete("/deleteVideotutorial/:id", verifyToken, async (req, res) => {
    try {
        if(await checkAdmin(req, res, userController)) 
        {
            const response = await videotutorialController.deleteVideotutorial(req.params.id);
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get("/getTags", verifyToken, async (req, res) => {
    try {
        if (await checkAdmin(req, res, userController)) 
        { 
            const tags = await tagController.getTags();
            res.status(200).send(tags);
        }
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

const net = require('net');

const findAvailablePort = (startPort, callback) => {
    const server = net.createServer();
    server.unref();
    server.on('error', () => {
        findAvailablePort(startPort + 1, callback);
    });
    server.listen(startPort, () => {
        server.close(() => callback(startPort));
    });
};


findAvailablePort(3000, (port) => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});

