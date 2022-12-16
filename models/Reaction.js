const mongoose = require('mongoose');
// const dateFormat = require('../utils/dateFormat');
const { Schema } = mongoose;
const eventSchema = require('./Event')

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: timestamp => dateFormat(timestamp)
    },
    events: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Event'
      }
  ]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Reaction = mongoose.model('Reaction', reactionSchema)

module.exports = Reaction;