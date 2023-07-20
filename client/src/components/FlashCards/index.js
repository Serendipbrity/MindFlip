import { useState } from "react";
import { VIEW_FLASHCARDS } from "../../utils/queries";
import "../../css/flashcards.css";
import { useQuery } from "@apollo/client";
import Modal from "react-modal";
import '../../css/modals.css';

const FlashCards = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentFlashCard, setCurrentFlashCard] = useState(null);

  function openModal(flashcard) {
    setCurrentFlashCard(flashcard);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { loading, data } = useQuery(VIEW_FLASHCARDS);
  // viewFlashCards is from the query / graphql
  const flashcards = props.flashCards || [];
  const { showFlashCards } = props;

  // Declare a new state variable for flip action
  const [isFlipped, setIsFlipped] = useState({});

  if (!showFlashCards) {
    return null;
  }

  // Function to handle flip action
  const handleFlip = (id) => {
    setIsFlipped((prevState) => ({
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
              <div className="flashcards-container" key={flashcard._id}>
                <div className="scene">
                  <div
                    className={`card ${
                      isFlipped[flashcard._id] ? "is-flipped" : ""
                    }`}
                    onClick={() => handleFlip(flashcard._id)}
                  >
                    <div className="card__face card__face--front">
                      {flashcard.frontInput}
                    </div>
                    <div className="card__face card__face--back">
                      {flashcard.backInput}
                    </div>
                    <div className="btn-square btn-outline exBtn"  onClick={() => openModal(flashcard)}>&#8942;</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* UPDATE flash card Modal */}
          <Modal className="modal"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Flashcard Options"
      >
        <div className="modal-content">
        <h2 className="modalTitles">Update Flashcard</h2>
        <div className="modalSubTitles">Front of Flash Card:</div>
        <textarea className="modalTextareas"></textarea>
        <div className="modalSubTitles">Back of Flash Card:</div>
        <textarea className="modalTextareas"></textarea>
        <button className="btn submit">Update</button>
        <button id="deleteBtn">Delete</button>
          <button className="closeBtn" onClick={closeModal}>Close</button>
          </div>
    </Modal>
    </div>
  );
};

export default FlashCards;
