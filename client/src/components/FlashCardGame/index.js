import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import "../../css/flashcards.css";

const FlashCardGame = ({ flashCards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(""); 
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

  const [gameStarted, setGameStarted] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    if (currentCardIndex === flashCards.length) {
      setShowGameOver(true);
      setGameStarted(false); // Set gameStarted to false when the game is over
    }
  }, [currentCardIndex, flashCards.length]);

  useEffect(() => {
    if (showGameOver) {
      const timer = setTimeout(() => {
        setShowGameOver(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [showGameOver]);

 // score
 const correctAnswers = answeredCards.filter((card) => card.knewAnswer).length;
 const totalQuestions = answeredCards.length;
 const score = (correctAnswers / totalQuestions) * 100;

  if (showGameOver) {
    return (
      <div id="gameOverContainer">
        <div id="gameOver">Game Over!</div>
        <div id="score">Score: {correctAnswers} / {totalQuestions}</div>
        <div id="score">{score}%</div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <button onClick={() => setGameStarted(true)} className="btn section row begin">Begin Game</button>
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
