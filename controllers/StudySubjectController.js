const StudySubject = require("../models/StudySubject");

class StudySubjectController {
   async addStudySubject(studySubjectData) {
      try {
         const studySubject = new StudySubject(studySubjectData);
         await studySubject.save();
         return { success: true, message: "Study subject successfully added!" };
      } catch (error) {
         throw new Error(`Error adding study subject: ${error.message}`);
      }
   }

   async getStudySubjects() {
      try {
         const studySubjects = await StudySubject.find();
         return studySubjects;
      } catch (error) {
         throw new Error(`Error fetching study subjects: ${error.message}`);
      }
   }

   async updateStudySubject(id, updateData) {
      try {
         const updatedStudySubject = await StudySubject.findByIdAndUpdate(id, updateData, { new: true });
         if (!updatedStudySubject) {
            return { success: false, message: "Study subject not found." };
         }
         return { success: true, message: "Study subject updated successfully.", updatedStudySubject };
      } catch (error) {
         throw new Error(`Error updating study subject: ${error.message}`);
      }
   }
}

module.exports = StudySubjectController;
