const mongoose = require('mongoose');

const quotesSchema = mongoose.Schema({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  context: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('quotes', quotesSchema);