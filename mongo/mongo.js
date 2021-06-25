const mongoose = require('mongoose');
const { pengdb } = require('../config.json');

module.exports = async () => {
  await mongoose.connect(pengdb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose;
};