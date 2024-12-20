const StudyYear = require("../models/StudyYear");

class StudyYearController {
   async addStudyYear(studyYearData) {
      try {
         const studyYear = new StudyYear(studyYearData);
         await studyYear.save();
         return { success: true, message: "Study year successfully added!" };
      } catch (error) {
         throw new Error(`Error adding study year: ${error.message}`);
      }
   }

   async getStudyYears() {
      try {
         const studyYears = await StudyYear.find();
         return studyYears;
      } catch (error) {
         throw new Error(`Error fetching study years: ${error.message}`);
      }
   }

   async updateStudyYear(id, updateData) {
      try {
         const updatedStudyYear = await StudyYear.findByIdAndUpdate(id, updateData, { new: true });
         if (!updatedStudyYear) {
            return { success: false, message: "Study year not found." };
         }
         return { success: true, message: "Study year updated successfully.", updatedStudyYear };
      } catch (error) {
         throw new Error(`Error updating study year: ${error.message}`);
      }
   }
}

module.exports = StudyYearController;
