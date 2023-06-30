const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        flashcards: [FlashCards]
        friends: [User]
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
        userId: ID
    }

    type Query {
        viewUsers: [User]
        viewUser: User
        viewFlashCards: [FlashCards]
        viewFlashCard: FlashCards
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): User

        updateUser(_id:ID, username: String, email: String, password: String, flashcards:ID): User

        updateFlashCard(_id: ID, frontInput: String, backInput: String, category: ID, userId: ID): FlashCards

        deleteUser(_id: ID): User

        deleteFlashCard(_id: ID): FlashCards
  
        addFlashCard(frontInput: String!, backInput: String!, category: ID, userId: ID): FlashCards

        addFlashCardToUser(userId: ID, flashcards: ID): User
    }
`;

module.exports = typeDefs;