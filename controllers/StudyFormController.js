const StudyForm = require("../models/StudyForm");

class StudyFormController {
   async addStudyForm(studyFormData) {
      try {
         const studyForm = new StudyForm(studyFormData);
         await studyForm.save();
         return { success: true, message: "Study form successfully added!" };
      } catch (error) {
         throw new Error(`Error adding study form: ${error.message}`);
      }
   }

   async getStudyForms() {
      try {
         const studyForms = await StudyForm.find();
         return studyForms;
      } catch (error) {
         throw new Error(`Error fetching study forms: ${error.message}`);
      }
   }

   async getStudyFormById(id) {
      try {
         const studyForm = await StudyForm.findById(id);
         if (!studyForm) {
            return { success: false, message: "Study form not found." };
         }
         return studyForm;
      } catch (error) {
         throw new Error(`Error fetching study form by ID: ${error.message}`);
      }
   }

   async updateStudyForm(id, updateData) {
      try {
         const updatedStudyForm = await StudyForm.findByIdAndUpdate(id, updateData, { new: true });
         if (!updatedStudyForm) {
            return { success: false, message: "Study form not found." };
         }
         return { success: true, message: "Study form updated successfully.", updatedStudyForm };
      } catch (error) {
         throw new Error(`Error updating study form: ${error.message}`);
      }
   }

   async deleteStudyForm(id) {
      try {
         const deletedStudyForm = await StudyForm.findByIdAndDelete(id);
         if (!deletedStudyForm) {
            return { success: false, message: "Study form not found." };
         }
         return { success: true, message: "Study form deleted successfully." };
      } catch (error) {
         throw new Error(`Error deleting study form: ${error.message}`);
      }
   }
}

module.exports = StudyFormController;
