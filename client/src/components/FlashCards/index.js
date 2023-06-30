import {
  VIEW_USERS,
  VIEW_USER,
  VIEW_FLASHCARDS,
  VIEW_FLASHCARD,
} from "../../utils/queries";
import { useQuery } from "@apollo/client";

const FlashCards = () => {

    const { loading, data } = useQuery(VIEW_USER);
  // viewUsers is from the query / graphql
    const user = data?.viewUser || {};
  return (
    <div>
      <h1>Dashboard</h1>
      {/* if loading data */}
      {loading ? (
        //   display loading
        <div>Loading...</div>
      ) : (
        //   otherwise
        <div>
          {/* map over users and  */}
                       {/* map over users and  */}
          {user.flashcards.map((flashcard) => {
            //   display each user in a div
            return (
                <div key={flashcard._id}>
                    <h2>Welcome, {user.username}!</h2>
                    <h3>My Flash Cards</h3>
                    <h4>Front:</h4> 
                    <div> {flashcard.frontInput}</div>
                    <h4>Back:</h4>
                    <div> {flashcard.backInput}</div>
                {/* {user.flashcards.backInput} */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FlashCards;
