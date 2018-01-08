const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
    trim: true
  },
  when: {
    type: String,
    required: true,
    trim: true
  }
});

const Search = mongoose.model('Search', SearchSchema);

module.exports = { Search };
