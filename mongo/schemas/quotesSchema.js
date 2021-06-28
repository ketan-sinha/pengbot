const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const quotesSchema = mongoose.Schema({
  _id: Number,
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
}, { _id: false });

quotesSchema.plugin(AutoIncrement);

module.exports = mongoose.model('Quote', quotesSchema);