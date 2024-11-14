const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    tagName: { type: String, required: true },
    color: { type: String, required: true } // Farba v RGB formáte
});


module.exports = mongoose.model('Tag', tagSchema);
