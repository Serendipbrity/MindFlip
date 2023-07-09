import { useState } from "react";
import {
  VIEW_USERS,
  VIEW_USER,
  VIEW_FLASHCARDS,
  VIEW_FLASHCARD,
} from "../../utils/queries";
import "../../css/flashcards.css";
import { useQuery } from "@apollo/client";

const FlashCards = (props) => {
  const { loading, data } = useQuery(VIEW_USER);
  // viewUsers is from the query / graphql
  const user = data?.viewUser || {};
  const { showFlashCards } = props;

  // Declare a new state variable for flip action
  const [isFlipped, setIsFlipped] = useState(false);

  if (!showFlashCards) {
    return null;
  }

  // Function to handle flip action
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div>
      {/* if loading data */}
      {loading ? (
        //   display loading
        <div>Loading...</div>
      ) : (
        //   otherwise
        <div>
          {/* map over users and  */}
          {user.flashcards.map((flashcard, index) => {
            //   display each user in a div
            return (
              <div className="scene" key={index}>
                <div
                  className={`card ${isFlipped ? "is-flipped" : ""}`}
                  onClick={handleFlip}
                >
                  <div className="card__face card__face--front">
                    {flashcard.frontInput}
                  </div>
                  <div className="card__face card__face--back">
                    {flashcard.backInput}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FlashCards;
