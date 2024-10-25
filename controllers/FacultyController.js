const Faculty = require("../models/Faculty");

class FacultyController {
   async addFaculty(facultyData) {
      try {
         const faculty = new Faculty(facultyData);
         await faculty.save();
         return { success: true, message: "Faculty successfully added!" };
      } catch (error) {
         throw new Error(`Error adding faculty: ${error.message}`);
      }
   }

   async getFaculties() {
      try {
         const faculties = await Faculty.find();
         return faculties;
      } catch (error) {
         throw new Error(`Error fetching faculties: ${error.message}`);
      }
   }

   async getFacultyById(id) {
      try {
         const faculty = await Faculty.findById(id);
         if (!faculty) {
            return { success: false, message: "Faculty not found." };
         }
         return faculty;
      } catch (error) {
         throw new Error(`Error fetching faculty by ID: ${error.message}`);
      }
   }

   async updateFaculty(id, updateData) {
      try {
         const updatedFaculty = await Faculty.findByIdAndUpdate(id, updateData, { new: true });
         if (!updatedFaculty) {
            return { success: false, message: "Faculty not found." };
         }
         return { success: true, message: "Faculty updated successfully.", updatedFaculty };
      } catch (error) {
         throw new Error(`Error updating faculty: ${error.message}`);
      }
   }

   async deleteFaculty(id) {
      try {
         const deletedFaculty = await Faculty.findByIdAndDelete(id);
         if (!deletedFaculty) {
            return { success: false, message: "Faculty not found." };
         }
         return { success: true, message: "Faculty deleted successfully." };
      } catch (error) {
         throw new Error(`Error deleting faculty: ${error.message}`);
      }
   }
}

module.exports = FacultyController;
