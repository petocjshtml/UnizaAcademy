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
}

module.exports = FacultyController;
