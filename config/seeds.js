// const faker = require("faker");

const db = require("./connection");
const events = require("./event-data");

const { User, Event, Reaction } = require("../models");

db.once("open", async () => {
  // Clear user data
  await Reaction.deleteMany({});
  await Event.deleteMany({});
  await User.deleteMany({});

  // Create user data
  const userData = [];
  const organizations = ["Apple", "Google", "Facebook", "Tesla", "Microsoft"];

  // for (let i = 0; i < 50; i += 1) {
  //   const username = faker.internet.userName();
  //   const email = faker.internet.email(username);
  //   const password = faker.internet.password();

  //   const firstName = faker.name.firstName();
  //   userData.push({ username, email, password, firstName });
  // }

  // const createdUsers = await User.collection.insertMany(userData);

  const eventData = [];
  for (let i = 0; i < events.length; i += 1) {
    const name = events[i].name;
    const description = events[i].description;
    const date = events[i].date;
    const culture = events[i].culture;

    eventData.push({ name, description, date, culture });
  }

  const createdEvents = await Event.collection.insertMany(eventData);

  // // create reactions
  // let createdReactions = [];
  // const reactionType = ["Will be attending", "Is interested"];

  // for (let i = 0; i < 50; i += 1) {
  //   const test = "example";
  //   // Randomly pull the reactionType
  //   const reactionBody = reactionType[Math.floor(Math.random() * 2)];

  //   // Randomly select an index from the users
  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   // Destructure the username and _id from the randomly selected user
  //   const { username, _id: userId } = createdUsers.ops[randomUserIndex];

  //   // Random event, random eventId
  //   const randomEventIndex = Math.floor(
  //     Math.random() * createdEvents.ops.length
  //   );
  //   const { name, _id: eventId } = createdEvents.ops[randomEventIndex];

  //   console.log("eventId", eventId);
  //   // Create a reaction with the reactionBody and username
  //   const createdReaction = await Reaction.create({ reactionBody, username });

  //   const reactionId = createdReaction._id;
  //   // console.log('name:',name)

  //   console.log(name);
  //   const updatedReaction = await Reaction.updateOne(
  //     { _id: reactionId },
  //     { $push: { events: eventId } }
  //     // {new: true}
  //   );

  //   // Update the user data to include the reaction we just created
  //   const updatedUser = await User.updateOne(
  //     { _id: userId },
  //     { $push: { reactions: createdReaction._id } }
  //   );

  //   // Push to created reactions array
  //   createdReactions.push(createdReaction);
  // }

  // TODO:
  // We need to ObjectId from the event
  // Push eventId to the events dataType in the reaction schema

  console.log("users seeded");

  process.exit();
});
