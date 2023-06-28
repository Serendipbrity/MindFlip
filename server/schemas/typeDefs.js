const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type Category {
        _id: ID
        category: String
        flashcards: [FlashCards]
    }

    type FlashCards {
        _id: ID
        frontInput: String
        backInput: String
        category: ID
        user: ID
    }

    type Query {
        viewUsers: [User]
        viewFlashCards: [FlashCards]
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
  
        addFlashCard(frontInput: String!, backInput: String!, category: ID, user: ID): FlashCards
    }
`;

module.exports = typeDefs;