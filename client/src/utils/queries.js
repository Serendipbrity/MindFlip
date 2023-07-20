import { gql } from "@apollo/client";

export const VIEW_USERS = gql`
  query Query {
    viewUsers {
      _id
      email
      username
      flashcards {
        _id
        backInput
        frontInput
        category
        userId
      }
    }
  }
`;
export const VIEW_USER = gql`
  query Query {
    viewUser {
      _id
      email
      username
      password
      flashcards {
        _id
        backInput
        frontInput
        category
      }
    }
  }
`;
export const VIEW_FLASHCARDS = gql`
  query Query($userId: ID!) {
    viewFlashCards(userId: $userId) {
      _id
      backInput
      frontInput
      category
    }
  }
`;
export const VIEW_FLASHCARD = gql`
  query Query {
    viewFlashCard {
      _id
      backInput
      frontInput
      category
    }
  }
`;
