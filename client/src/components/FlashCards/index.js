import { useState } from "react";
import { VIEW_FLASHCARDS } from "../../utils/queries";
import "../../css/flashcards.css";
import { useQuery } from "@apollo/client";

const FlashCards = (props) => {
  
  const { loading, data } = useQuery(VIEW_FLASHCARDS);
  // viewFlashCards is from the query / graphql
  const flashcards = data?.viewFlashCards || [];
  const { showFlashCards } = props;

  // Declare a new state variable for flip action
  const [isFlipped, setIsFlipped] = useState({});

  if (!showFlashCards) {
    return null;
  }

  // Function to handle flip action
  const handleFlip = (id) => {
    setIsFlipped(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
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
          {/* map over flashcards and  */}
          {flashcards.map((flashcard) => {
            //   display each flashcard in a div
            return (
              <div className="flashcards-container">
              <div className="scene" key={flashcard._id}>
                <div
                  className={`card ${isFlipped[flashcard._id] ? "is-flipped" : ""}`}
                  onClick={() => handleFlip(flashcard._id)}
                >
                  <div className="card__face card__face--front">
                    {flashcard.frontInput}
                  </div>
                  <div className="card__face card__face--back">
                    {flashcard.backInput}
                  </div>
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
