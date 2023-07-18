import { gql } from '@apollo/client';

export const MUTATIONS = gql`
mutation Mutation {
    addFlashCardToUser {
      _id
      email
      username
      password
      flashcards {
        _id
        frontInput
        backInput
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const ADD_FLASHCARD_TO_USER = gql`
  mutation AddFlashCardToUser($userId: ID!, $flashcards: ID!, $frontInput: String!, $backInput: String!) {
    addFlashCardToUser(userId: $userId, flashcards: $flashcards, frontInput: $frontInput, backInput: $backInput) {
      _id
      username
      email
      flashcards {
        _id
        frontInput
        backInput
      }
    }
  }
`;


