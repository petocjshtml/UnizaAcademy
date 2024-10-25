const mongoose = require('mongoose');

const studyYearSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  studyFormId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyForm', required: true },
  studyYearNumber: { type: Number, required: true },
});

module.exports = mongoose.model('StudyYear', studyYearSchema);
