// models/VideoTutorial.js
const mongoose = require('mongoose');

const videotutorialSchema = new mongoose.Schema({
    studySubjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudySubject', required: true },
    link: { type: String, required: true },
    title: { type: String, required: true },
    duration: { type: String, required: true },
    views: { type: String, required: true },
    likes: { type: String, required: true },
    thumbnail: { type: String, required: true },
    status: { type: String, required: true },
    tags: [
        {
            tagName: { type: String, required: true },
            color: { type: String, required: true }
        }
    ] 
});

module.exports = mongoose.model('Videotutorial', videotutorialSchema);
