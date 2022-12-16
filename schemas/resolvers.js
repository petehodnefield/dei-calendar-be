const { AuthenticationError } = require("apollo-server-express");

const { User, Event, Culture, Reaction } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate({
        path: "reactions",
        populate: {
          path: "events",
          model: "Event",
        },
      });
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate({
        path: "reactions",
        populate: {
          path: "events",
          model: "Event",
        },
      });
    },
    events: async () => {
      return await Event.find().populate("reactions");
    },
    event: async (parent, { _id }) => {
      return await Event.findById(_id);
    },
    reactions: async () => {
      return await Reaction.find().populate("events");
    },
    // cultures: async () => {
    //   return await Culture.find()
    // }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addReaction: async (
      parent,
      { userId, reactionBody, username, eventId },
      context
    ) => {
      // We will need to add context here once front end is working
      // if (context.user) {

      // Creates a reaction with input values
      const reaction = await Reaction.create({
        reactionBody,
        username: username,
        eventId,
      });

      // Pushes eventId to the event type in Reaction Model
      const updateReaction = await Reaction.updateOne(
        { _id: reaction._id },
        { $push: { events: eventId } }
      );

      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { reactions: reaction._id } },
        { new: true }
      );
      return reaction;

      // }
      // throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
