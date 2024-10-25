const UserController = require("./controllers/UserController");
const FacultyController = require("./controllers/FacultyController");
const StudyFormController = require("./controllers/StudyFormController");
const StudyYearController = require("./controllers/StudyYearController");
const StudyProgramController = require("./controllers/StudyProgramController");
const StudySubjectController = require("./controllers/StudySubjectController");

const userController = new UserController();
const facultyController = new FacultyController();
const studyFormController = new StudyFormController();
const studyYearController = new StudyYearController();
const studyProgramController = new StudyProgramController();
const studySubjectController = new StudySubjectController();

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


//user profile endpoints
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

//kategorizácia predmetov

// Vytvorenie fakulty (iba admin)
app.post("/faculties", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId); // overenie, či je admin
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const response = await facultyController.addFaculty(req.body);
        res.status(201).send(response);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Získanie všetkých fakúlt (iba admin)
app.get("/faculties", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId); // overenie, či je admin
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const faculties = await facultyController.getFaculties();
        res.status(200).send(faculties);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Získanie fakulty podľa ID (iba admin)
app.get("/faculties/:id", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId); // overenie, či je admin
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const faculty = await facultyController.getFacultyById(req.params.id);
        res.status(200).send(faculty);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Aktualizácia fakulty (iba admin)
app.put("/faculties/:id", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId); // overenie, či je admin
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const response = await facultyController.updateFaculty(req.params.id, req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Vymazanie fakulty (iba admin)
app.delete("/faculties/:id", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId); // overenie, či je admin
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const response = await facultyController.deleteFaculty(req.params.id);
        res.status(200).send({ message: 'Faculty deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Vytvorenie formy štúdia (iba admin)
app.post("/study-forms", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const response = await studyFormController.addStudyForm(req.body);
        res.status(201).send(response);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Získanie všetkých foriem štúdia (iba admin)
app.get("/study-forms", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const studyForms = await studyFormController.getStudyForms();
        res.status(200).send(studyForms);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Získanie formy štúdia podľa ID (iba admin)
app.get("/study-forms/:id", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const studyForm = await studyFormController.getStudyFormById(req.params.id);
        res.status(200).send(studyForm);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Aktualizácia formy štúdia (iba admin)
app.put("/study-forms/:id", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const response = await studyFormController.updateStudyForm(req.params.id, req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Vymazanie formy štúdia (iba admin)
app.delete("/study-forms/:id", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const response = await studyFormController.deleteStudyForm(req.params.id);
        res.status(200).send({ message: 'Study form deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Vytvorenie ročníka (iba admin)
app.post("/study-years", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const response = await studyYearController.addStudyYear(req.body);
        res.status(201).send(response);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Získanie všetkých ročníkov (iba admin)
app.get("/study-years", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const studyYears = await studyYearController.getStudyYears();
        res.status(200).send(studyYears);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Získanie ročníka podľa ID (iba admin)
app.get("/study-years/:id", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const studyYear = await studyYearController.getStudyYearById(req.params.id);
        res.status(200).send(studyYear);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Aktualizácia ročníka (iba admin)
app.put("/study-years/:id", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const response = await studyYearController.updateStudyYear(req.params.id, req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Vymazanie ročníka (iba admin)
app.delete("/study-years/:id", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const response = await studyYearController.deleteStudyYear(req.params.id);
        res.status(200).send({ message: 'Study year deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Vytvorenie študijného programu (iba admin)
app.post("/study-programs", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const response = await studyProgramController.addStudyProgram(req.body);
        res.status(201).send(response);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Získanie všetkých študijných programov (iba admin)
app.get("/study-programs", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const studyPrograms = await studyProgramController.getStudyPrograms();
        res.status(200).send(studyPrograms);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Získanie študijného programu podľa ID (iba admin)
app.get("/study-programs/:id", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const studyProgram = await studyProgramController.getStudyProgramById(req.params.id);
        res.status(200).send(studyProgram);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Aktualizácia študijného programu (iba admin)
app.put("/study-programs/:id", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const response = await studyProgramController.updateStudyProgram(req.params.id, req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Vymazanie študijného programu (iba admin)
app.delete("/study-programs/:id", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const response = await studyProgramController.deleteStudyProgram(req.params.id);
        res.status(200).send({ message: 'Study program deleted successfully' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


// Vytvorenie predmetu (iba admin)
app.post("/study-subjects", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const response = await studySubjectController.addStudySubject(req.body);
        res.status(201).send(response);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Získanie všetkých predmetov (iba admin)
app.get("/study-subjects", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const studySubjects = await studySubjectController.getStudySubjects();
        res.status(200).send(studySubjects);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Získanie predmetu podľa ID (iba admin)
app.get("/study-subjects/:id", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const studySubject = await studySubjectController.getStudySubjectById(req.params.id);
        res.status(200).send(studySubject);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Aktualizácia predmetu (iba admin)
app.put("/study-subjects/:id", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const response = await studySubjectController.updateStudySubject(req.params.id, req.body);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Vymazanie predmetu (iba admin)
app.delete("/study-subjects/:id", verifyToken, async (req, res) => {
    try {
        const isAdmin = await userController.isAdmin(req.userId);
        if (!isAdmin) {
            return res.status(403).send({ message: 'Prístup zamietnutý. Potrebujete práva administrátora.' });
        }
        const response = await studySubjectController.deleteStudySubject(req.params.id);
        res.status(200).send({ message: 'Study subject deleted successfully' });
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
