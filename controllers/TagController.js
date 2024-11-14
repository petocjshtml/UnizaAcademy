const Tag = require('../models/Tag');

class TagController {
    // Metóda na pridanie viacerých tagov
    async addTags(tagsArray) {
        console.log("tagsArray",tagsArray);
        try {
            const existingTags = await Tag.find();
            const existingTagNames = existingTags.map(tag => tag.tagName.toLowerCase());

            // Filtrovanie nových tagov, ktoré ešte neexistujú
            const newTags = tagsArray.filter(tag => 
                !existingTagNames.includes(tag.tagName.toLowerCase())
            );

            // Ak nie sú žiadne nové tagy, vrátime správu
            if (newTags.length === 0) {
                return { success: true, message: "No new tags to add." };
            }

            // Pridanie nových tagov
            await Tag.insertMany(newTags);
            return { success: true, message: "Tags successfully added!", newTags };
        } catch (error) {
            throw new Error(`Error adding tags: ${error.message}`);
        }
    }


    // Metóda na získanie všetkých tagov
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
