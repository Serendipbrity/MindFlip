import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import "../../css/flashcards.css";

const FlashCardGame = ({ flashCards }) => {
  // start the card index with the first card
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  // prepare an empty string where we will add the class is-flipped once a card is flipped
  const [isFlipped, setIsFlipped] = useState("");
  // answered cards starts out as an empty array
  const [answeredCards, setAnsweredCards] = useState([]);

  // ----- Swipable Cards Effect ------------------
  const handlers = useSwipeable({
    // if they swipe left, they didnt know the answer to the card
    onSwipedLeft: () => answerCard(false),
    // if they swipe right, they did know the asnwer to the card
    onSwipedRight: () => answerCard(true),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  // -------------------------------------------------

  // --- Keep track of the cards they answered ----------------
  const answerCard = (knewAnswer) => {
    // Add card to answered cards array
    setAnsweredCards([
      // spread out the answered cards so that we dont lose the previous cards
      ...answeredCards,
      // add the current card index and if they knew the answer
      { ...flashCards[currentCardIndex], knewAnswer },
    ]);
    // Add classes for swipe animations
    setIsFlipped(knewAnswer ? "swipe-right" : "swipe-left");
    // Delay to allow animation to complete
    setTimeout(() => {
      // Move to next card
      setCurrentCardIndex(currentCardIndex + 1);
      // Reset classes for swipe animations
      setIsFlipped(false);
      // Adjust delay to match animation duration
    }, 1000);
  };
  // -------------------------------------------------

  // start off by not showing the game (first flash card)
  const [gameStarted, setGameStarted] = useState(false);
  // start off by not showing the "Game Over"
  const [showGameOver, setShowGameOver] = useState(false);

  // ----- Game Over Effect ------------------
  useEffect(() => {
    // if the current index equals the last flash card
    if (currentCardIndex === flashCards.length) {
      setShowGameOver(true); // show "Game Over"
      setGameStarted(false); // hide Large flash card showing for the game
    }
  }, [currentCardIndex, flashCards.length]);
  // --------------------------------------

  // ----- Timer for Game Over ------------------
  useEffect(() => {
    // if the game is over
    if (showGameOver) {
      // set a timer
      const timer = setTimeout(() => {
        // remove showing "Game Over"
        setShowGameOver(false);
        // after 7 seconds
      }, 7000);
      // clear the timer
      return () => clearTimeout(timer);
    }
  }, [showGameOver]);
  // --------------------------------------

  // -------- Score ---------------------------

  // the correct answers are the answered cards, filtered per card by the known answer then taking the length of the array
  const correctAnswers = answeredCards.filter((card) => card.knewAnswer).length;
  // the total number of questions are the length of the array of answered cards
  const totalQuestions = answeredCards.length;
  // the score percentage is the correct answers divided by the total questions multiplied by 100
  const score = (correctAnswers / totalQuestions) * 100;
  // --------------------------------------
  // -------- Save Score ---------------------------
  useEffect(() => {
    if (showGameOver) {
      // Get existing scores from local storage or initialize an empty array
      const existingScores = JSON.parse(localStorage.getItem("scores")) || [];

      // Add the new score
      const newScore = {
        score: correctAnswers,
        date: new Date().toISOString(),
      };

      // Save back to local storage
      localStorage.setItem(
        "scores",
        JSON.stringify([...existingScores, newScore])
      );
    }
  }, [showGameOver, correctAnswers]);

  // --------- Game Over -------------
  // if the game is over
  if (showGameOver) {
    return (
      // show the game is over
      <div id="gameOverContainer">
        <div id="gameOver">Game Over!</div>
        {/* show the score */}
        <div id="score">
          Score: {correctAnswers} / {totalQuestions}
        </div>
        {/* show the percent correct */}
        <div id="score">{score}%</div>
      </div>
    );
  }
  // --------------------------------------

  // --------- Show Begin Game Button -------------
  // if the game isnt started
  if (!gameStarted) {
    return (
      // show the button to Begin Game
      <button
        onClick={() => setGameStarted(true)}
        className="btn section row begin"
      >
        Begin Game
      </button>
    );
  }
  // --------------------------------------

  // ----- flip the card ------------------
  const handleFlip = () => {
    // Toggle between '' (no class added / not flipped) and 'is-flipped' class (flipped)
    setIsFlipped(isFlipped === "" ? "is-flipped" : "");
  };
  // --------------------------------------

  return (
    // extra div necessary for size of cards and diagnal swiping
    <div>
      <div
        {...handlers}
        onClick={handleFlip}
        className={`card ${isFlipped}`}
        id="gameCard"
      >
        {/* Front */}
        <div className="card__face card__face--front">
          {flashCards && flashCards[currentCardIndex]?.frontInput}
          {/* when clicking the Exit Game, end the game */}
          <button className="exitGame" onClick={() => setGameStarted(false)}>
            Exit Game
          </button>
        </div>
        {/* Back */}
        <div className="card__face card__face--back">
          {flashCards && flashCards[currentCardIndex]?.backInput}
          {/* when clicking the Exit Game, end the game */}
          <button className="exitGame" onClick={() => setGameStarted(false)}>
            Exit Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashCardGame;
