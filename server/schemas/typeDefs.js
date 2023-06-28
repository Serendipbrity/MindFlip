const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type FlashCards {
        _id: ID
        frontInput: String
        backInput: String
    }

    type Query {
        users: [User]
        flashCards: [FlashCards]
    }
`;

module.exports = typeDefs;