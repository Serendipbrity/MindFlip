import { useState } from "react";
import { VIEW_FLASHCARDS } from "../../utils/queries";
import { UPDATE_FLASHCARD, DELETE_FLASHCARD } from "../../utils/mutations";
import "../../css/flashcards.css";
import { useQuery, useMutation } from "@apollo/client";
import Modal from "react-modal";
import "../../css/modals.css";
import Alert from '../Alert'; 


const FlashCards = (props) => {
  const [updateFlashCard] = useMutation(UPDATE_FLASHCARD);
  const [deleteFlashCard] = useMutation(DELETE_FLASHCARD);

  // modal starts off not showing
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentFlashCard, setCurrentFlashCard] = useState(null);

  // flash card inputs start off empty
  const [frontInput, setFrontInput] = useState("");
  const [backInput, setBackInput] = useState("");

  function openModal(flashcard) {
    setCurrentFlashCard(flashcard);
    setFrontInput(flashcard.frontInput);
    setBackInput(flashcard.backInput);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  // update flash card function
  const handleUpdateFlashCard = async () => {
    try {
      await updateFlashCard({
        variables: {
          id: currentFlashCard._id,
          frontInput,
          backInput,
        },
      });
      closeModal();
        // alert user that flash card was updated and re load the page so that it shows
      window.alert('Flash Card Updated!').location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  // delete flash card function
  const handleDeleteFlashCard = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this flash card?');
    if (confirmDelete) {
      try {
        await deleteFlashCard({
          variables: {
            id: currentFlashCard._id,
          },
        });
        // close the modal
        closeModal()
        // alert user that flash card was deleted and re load the page so that it shows
        window.alert('Flash Card Deleted!').location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };
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
                    <div
                      className="btn-square btn-outline exBtn"
                      onClick={() => openModal(flashcard)}
                    >
                      &#8942;
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* UPDATE flash card Modal */}
      <Modal
        className="modal"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Flashcard Options"
      >
        <div className="modal-content">
          <h2 className="modalTitles">Update Flashcard</h2>
          <div className="modalSubTitles">Front of Flash Card:</div>
          <textarea
            className="modalTextareas"
            value={frontInput}
            onChange={(e) => setFrontInput(e.target.value)}
          ></textarea>
          <div className="modalSubTitles">Back of Flash Card:</div>
          <textarea
            className="modalTextareas"
            value={backInput}
            onChange={(e) => setBackInput(e.target.value)}
          ></textarea>
          <button className="btn submit" onClick={handleUpdateFlashCard}>
            Update
          </button>
          <button id="deleteBtn" onClick={handleDeleteFlashCard}>
            Delete Flash Card
          </button>
          <button className="closeBtn" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default FlashCards;
