const mongoose = require("mongoose");

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
    culture: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
eventSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
