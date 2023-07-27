import { gql } from '@apollo/client';

export const UPDATE_FLASHCARD = gql`
  mutation UpdateFlashCard($id: ID!, $frontInput: String, $backInput: String) {
    updateFlashCard(_id: $id, frontInput: $frontInput, backInput: $backInput) {
      _id
      frontInput
      backInput
    }
  }
`;

export const DELETE_FLASHCARD = gql`
  mutation DeleteFlashCard($id: ID!) {
    deleteFlashCard(_id: $id) {
      _id
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
mutation AddFlashCardToUser($userId: ID!, $frontInput: String!, $backInput: String!) {
  addFlashCardToUser(userId: $userId, frontInput: $frontInput, backInput: $backInput) {
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

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $category: String) {
    updateCategory(_id: $id, category: $category) {
      _id
      category
      }
      }`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(_id: $id) {
      _id
    }
  }`;

