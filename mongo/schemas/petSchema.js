const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  owner: String,
  name: String,

  hunger: Number,
  mood: Number,

  outline: String,
  shell: String,
  eyes: String,
  beak: String,
  feet: String,
  stomach: String,
  body: String,
});

module.exports = mongoose.model('Pet', petSchema);