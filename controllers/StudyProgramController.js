const StudyProgram = require("../models/StudyProgram");

class StudyProgramController {
   async addStudyProgram(studyProgramData) {
      try {
         const studyProgram = new StudyProgram(studyProgramData);
         await studyProgram.save();
         return { success: true, message: "Study program successfully added!" };
      } catch (error) {
         throw new Error(`Error adding study program: ${error.message}`);
      }
   }

   async getStudyPrograms() {
      try {
         const studyPrograms = await StudyProgram.find();
         return studyPrograms;
      } catch (error) {
         throw new Error(`Error fetching study programs: ${error.message}`);
      }
   }

   async getStudyProgramById(id) {
      try {
         const studyProgram = await StudyProgram.findById(id);
         if (!studyProgram) {
            return { success: false, message: "Study program not found." };
         }
         return studyProgram;
      } catch (error) {
         throw new Error(`Error fetching study program by ID: ${error.message}`);
      }
   }

   async updateStudyProgram(id, updateData) {
      try {
         const updatedStudyProgram = await StudyProgram.findByIdAndUpdate(id, updateData, { new: true });
         if (!updatedStudyProgram) {
            return { success: false, message: "Study program not found." };
         }
         return { success: true, message: "Study program updated successfully.", updatedStudyProgram };
      } catch (error) {
         throw new Error(`Error updating study program: ${error.message}`);
      }
   }

   async deleteStudyProgram(id) {
      try {
         const deletedStudyProgram = await StudyProgram.findByIdAndDelete(id);
         if (!deletedStudyProgram) {
            return { success: false, message: "Study program not found." };
         }
         return { success: true, message: "Study program deleted successfully." };
      } catch (error) {
         throw new Error(`Error deleting study program: ${error.message}`);
      }
   }
}

module.exports = StudyProgramController;
