const mongoose = require('mongoose');

const studySubjectSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  studyFormId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyForm', required: true },
  studyYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyYear', required: true },
  studyProgramId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyProgram', required: true },
  studySubjectName: { type: String, required: true },
  studySubjectAbbreviation: { type: String },
});

module.exports = mongoose.model('StudySubject', studySubjectSchema);
