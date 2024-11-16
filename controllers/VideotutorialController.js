const Videotutorial = require('../models/Videotutorial');
const TagController = require('./TagController');
const tagController = new TagController();

class VideotutorialController {
    async addVideotutorial(tutorialData) {
        try {
            const tagsResult = await tagController.addTags(tutorialData.tags);
            console.log(tagsResult.message);
            const videotutorial = new Videotutorial(tutorialData);
            await videotutorial.save();
            return { success: true, message: "Videotutorial successfully added!", videotutorial };
        } catch (error) {
            throw new Error(`Error adding videotutorial: ${error.message}`);
        }
    }

    async editVideotutorial(id, updateData) {
        try {
            if (updateData.tags) {
                await tagController.addTags(updateData.tags);
            }

            const updatedVideotutorial = await Videotutorial.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedVideotutorial) {
                return { success: false, message: "Videotutorial not found." };
            }
            return { success: true, message: "Videotutorial updated successfully.", updatedVideotutorial };
        } catch (error) {
            throw new Error(`Error editing videotutorial: ${error.message}`);
        }
    }

    async deleteVideotutorial(id) {
        try {
            const deletedVideotutorial = await Videotutorial.findByIdAndDelete(id);
            if (!deletedVideotutorial) {
                return { success: false, message: "Videotutorial not found." };
            }
            return { success: true, message: "Videotutorial deleted successfully." };
        } catch (error) {
            throw new Error(`Error deleting videotutorial: ${error.message}`);
        }
    }

    async getAllVideotutorials() {
        try {
            const videotutorials = await Videotutorial.find();
            return videotutorials;
        } catch (error) {
            throw new Error(`Error fetching videotutorials: ${error.message}`);
        }
    }

    async getAllPublicVideotutorials() {
        try {
            const publicVideotutorials = await Videotutorial.find({ status: 'public' });
            return publicVideotutorials;
        } catch (error) {
            throw new Error(`Error fetching public videotutorials: ${error.message}`);
        }
    }
}

module.exports = VideotutorialController;
