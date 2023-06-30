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
      }
    }
  }
`;