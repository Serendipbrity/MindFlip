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

