const Tag = require('../models/Tag');

class TagController {
    async addTags(tagsArray) {
        console.log("tagsArray",tagsArray);
        try {
            const existingTags = await Tag.find();
            const existingTagNames = existingTags.map(tag => tag.tagName.toLowerCase());
            const newTags = tagsArray.filter(tag => 
                !existingTagNames.includes(tag.tagName.toLowerCase())
            );
            if (newTags.length === 0) {
                return { success: true, message: "No new tags to add." };
            }
            await Tag.insertMany(newTags);
            return { success: true, message: "Tags successfully added!", newTags };
        } catch (error) {
            throw new Error(`Error adding tags: ${error.message}`);
        }
    }

    async getTags() {
        try {
            const tags = await Tag.find();
            return tags;
        } catch (error) {
            throw new Error(`Error fetching tags: ${error.message}`);
        }
    }
}

module.exports = TagController;
