const mongoose = require('mongoose');

const { Schema } = mongoose;

const CultureSchema = new Schema({
  cultureName: {
    type: String,
    required: true,
  }
});

const Culture = mongoose.model('Culture', CultureSchema);

module.exports = Culture;