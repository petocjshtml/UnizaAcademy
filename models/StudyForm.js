const mongoose = require('mongoose');

const studyFormSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  studyFormName: { type: String, required: true },
});

module.exports = mongoose.model('StudyForm', studyFormSchema);
