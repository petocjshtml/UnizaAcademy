const Faculty = require("../models/Faculty");
const StudyForm = require("../models/StudyForm");
const StudyProgram = require("../models/StudyProgram");
const StudySubject = require("../models/StudySubject");
const StudyYear = require("../models/StudyYear");

class AppController {
  async getObjects() {
    try {
      const faculties = await Faculty.find();
      const studyForms = await StudyForm.find();
      const studyPrograms = await StudyProgram.find();
      const studySubjects = await StudySubject.find();
      const studyYears = await StudyYear.find();

      return {
        faculties,
        studyForms,
        studyPrograms,
        studySubjects,
        studyYears,
      };
    } catch (error) {
      throw new Error(`Error fetching objects: ${error.message}`);
    }
  }
}

module.exports = AppController;
