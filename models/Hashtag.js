const mongoose = require('mongoose');

const hashtagSchema = new mongoose.Schema({
  hashtagName: { type: String, required: true },
  hashtagColor: { type: String, required: true },
});

module.exports = mongoose.model('Hashtag', hashtagSchema);