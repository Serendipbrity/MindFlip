const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    flashcards: [FlashCards]
    friends: [User]
    categories: [Category]
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

  type AuthData {
    token: String!
    user: User
  }

  type Query {
    viewUsers: [User]
    viewUser(_id:ID): User
    viewFlashCards(userId:ID!):[FlashCards]
    viewFlashCard: FlashCards
    viewCategories(userId:ID!): [Category]
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): User

    login(email: String!, password: String!): AuthData

    updateUser(
      _id: ID
      username: String
      email: String
      password: String
      flashcards: ID
    ): User

    updateFlashCard(
      _id: ID
      frontInput: String
      backInput: String
      category: ID
      userId: ID
    ): FlashCards

    deleteUser(_id: ID): User

    deleteFlashCard(_id: ID): FlashCards

    addFlashCard(
      frontInput: String!
      backInput: String!
      category: ID
      userId: ID
    ): FlashCards

    addFlashCardToUser(userId: ID!, frontInput: String!, backInput: String!): User

    addCategoryToUser(userId:ID!, category: String!): User

    addFlashCardToCategory(categoryId:ID!, frontInput: String, backInput: String, flashCardId:ID): Category

    updateCategory(_id: ID!, category: String): Category

    deleteCategory(_id: ID!): Category
  }
`;

module.exports = typeDefs;
