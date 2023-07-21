import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import "../../css/flashcards.css";

const FlashCardGame = ({ flashCards }) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(''); // Change this to a string
    const [answeredCards, setAnsweredCards] = useState([]);
  
    const handlers = useSwipeable({
      onSwipedLeft: () => answerCard(false),
      onSwipedRight: () => answerCard(true),
      preventDefaultTouchmoveEvent: true,
      trackMouse: true
    });
  
    const answerCard = (knewAnswer) => {
      setAnsweredCards([...answeredCards, { ...flashCards[currentCardIndex], knewAnswer }]);
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(''); // Reset the flip state when answering a card
    };
  
    const handleFlip = () => {
      setIsFlipped(isFlipped === '' ? 'is-flipped' : ''); // Toggle between '' and 'is-flipped'
    };
  
    return (
      <div {...handlers} onClick={handleFlip} className={`card ${isFlipped}`} id='gameCard'>
        <div className="card__face card__face--front" >
          {flashCards && flashCards[currentCardIndex]?.frontInput}
        </div>
        <div className="card__face card__face--back">
          {flashCards && flashCards[currentCardIndex]?.backInput}
        </div>
      </div>
    );
  };
  
  export default FlashCardGame;
  