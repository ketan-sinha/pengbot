const mongoose = require('mongoose');

const pengwingSchema = new mongoose.Schema({
  hunger: Number,
  mood: Number,
});