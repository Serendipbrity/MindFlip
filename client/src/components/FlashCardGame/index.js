import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "../../css/flashcards.css";

const FlashCardGame = ({ flashCards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(""); // Change this to a string
  const [answeredCards, setAnsweredCards] = useState([]);

  const handlers = useSwipeable({
    onSwipedLeft: () => answerCard(false),
    onSwipedRight: () => answerCard(true),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const answerCard = (knewAnswer) => {
    setAnsweredCards([
      ...answeredCards,
      { ...flashCards[currentCardIndex], knewAnswer },
    ]);
    setIsFlipped(knewAnswer ? "swipe-right" : "swipe-left"); // Add classes for swipe animations
    setTimeout(() => {
      // Delay to allow animation to complete
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }, 1000); // Adjust delay to match animation duration
  };

  // game starts off not showing
  const [gameStarted, setGameStarted] = useState(false);

  if (currentCardIndex === flashCards.length) {
    // End the game
    return (
      <div id="gameOverContainer">
        <div id="gameOver">Game Over!</div>;
      </div>
    );
  }

  const handleFlip = () => {
    setIsFlipped(isFlipped === "" ? "is-flipped" : ""); // Toggle between '' and 'is-flipped'
  };

  return (
    <div>
      <div
        {...handlers}
        onClick={handleFlip}
        className={`card ${isFlipped}`}
        id="gameCard"
      >
        <div className="card__face card__face--front">
          {flashCards && flashCards[currentCardIndex]?.frontInput}
          <button className="exitGame" onClick={() => setGameStarted(false)}>
            Exit Game
          </button>
        </div>
        <div className="card__face card__face--back">
          {flashCards && flashCards[currentCardIndex]?.backInput}
          <button className="exitGame" onClick={() => setGameStarted(false)}>
            Exit Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashCardGame;
