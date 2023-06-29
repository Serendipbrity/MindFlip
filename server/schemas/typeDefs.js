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
        user: ID
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

        deleteUser(_id: ID): User
  
        addFlashCard(frontInput: String!, backInput: String!, category: ID, user: ID): FlashCards
    }
`;

module.exports = typeDefs;