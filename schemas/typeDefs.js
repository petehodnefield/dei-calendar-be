const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    password: String!
    email: String!
    firstName: String!
    reactions: [Reaction]!
  }

  type Culture {
    _id: ID
    cultureName: String
  }

  type Event {
    _id: ID
    name: String
    description: String
    date: String
    culture: String
    reactionCount: Int

    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
    events: [Event]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    culture(username: String): [Culture]
    user(username: String!): User
    events: [Event]
    event(_id: ID): Event
    reactions: [Reaction]
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      firstName: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addReaction(
      reactionBody: String!
      userId: String!
      username: String!
      eventId: String!
    ): Reaction
  }
`;

module.exports = typeDefs;
