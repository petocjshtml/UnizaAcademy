const Faculty = require("../models/Faculty");
const StudyForm = require("../models/StudyForm");
const StudyProgram = require("../models/StudyProgram");
const StudySubject = require("../models/StudySubject");
const StudyYear = require("../models/StudyYear");
const Videotutorial = require("../models/Videotutorial");
const Tag = require("../models/Tag");

class AppController {
  async getObjects() {
    try {
      const faculties = await Faculty.find();
      const studyForms = await StudyForm.find();
      const studyPrograms = await StudyProgram.find();
      const studySubjects = await StudySubject.find();
      const studyYears = await StudyYear.find();
      const videoTutorials = await Videotutorial.find({ status: "public" });
      const tags = await Tag.find();

      return {
        faculties,
        studyForms,
        studyPrograms,
        studySubjects,
        studyYears,
        videoTutorials,
        tags,
      };
    } catch (error) {
      throw new Error(`Error fetching objects: ${error.message}`);
    }
  }

  //právo na prístup ku všetkým videám
  async getObjectsLoggedIn() {
    try {
      const faculties = await Faculty.find();
      const studyForms = await StudyForm.find();
      const studyPrograms = await StudyProgram.find();
      const studySubjects = await StudySubject.find();
      const studyYears = await StudyYear.find();
      const videoTutorials = await Videotutorial.find();
      const tags = await Tag.find();

      return {
        faculties,
        studyForms,
        studyPrograms,
        studySubjects,
        studyYears,
        videoTutorials,
        tags,
      };
    } catch (error) {
      throw new Error(`Error fetching objects: ${error.message}`);
    }
  }
}

module.exports = AppController;
