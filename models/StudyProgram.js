const mongoose = require('mongoose');

const studyProgramSchema = new mongoose.Schema({
  studyYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyYear', required: true },
  studyFormId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyForm', required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  studyProgramName: { type: String, required: true },
});

module.exports = mongoose.model('StudyProgram', studyProgramSchema);
