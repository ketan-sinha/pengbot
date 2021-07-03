const mongoose = require('mongoose');
const { colors } = require('../../resources/pet/petHelper');

const eggSchema = mongoose.Schema({
  owner: String,
  primary_color: {
    type: String,
    enum: colors.keys(),
  },
  secondary_color: {
    type: String,
    enum: colors.keys(),
  },
  hatch_time: Number,
});