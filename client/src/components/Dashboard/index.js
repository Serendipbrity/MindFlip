import mesh from "../../assets/img/mesh-gradient.png";
import Nav from "../Nav";
import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_FLASHCARD_TO_USER } from "../../utils/mutations";
import FlashCards from "../FlashCards";
import "../../css/dashboard.css";
import Modal from 'react-modal';
import {
  VIEW_FLASHCARDS,
  VIEW_FLASHCARD,
} from "../../utils/queries";


const Dashboard = ({ drawerOpen, toggleDrawer }) => {
  Modal.setAppElement('#root')
  const idToken = localStorage.getItem('id_token');

// Decode the JWT to get its payload
const base64Url = idToken.split('.')[1];
const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
const payload = JSON.parse(window.atob(base64));

// Now get the userId
const userId = payload.id;


  const [showFlashCards, setShowFlashCards] = useState(false);
  const { loading, data } = useQuery(VIEW_FLASHCARDS);

  const handleButtonClick = () => {
    setShowFlashCards(true);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [flashCardInput, setFlashCardInput] = useState({frontInput: '', backInput: ''});
  
  const [addFlashCardToUser, { error }] = useMutation(ADD_FLASHCARD_TO_USER);

    // handle change of flash card inputs
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFlashCardInput(prevState => ({
          ...prevState,
          [name]: value,
      }));
  }

  const handleAddFlashCard = async () => {
    const { frontInput, backInput } = flashCardInput; // Assuming you have a form controlling these values
    
    try {
      const { data } = await addFlashCardToUser({
        variables: {
          userId,
          frontInput,
          backInput,
        },
      });
    } catch (err) {
      if (err.graphQLErrors) {
        err.graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
    
      if (err.networkError) {
        console.log(`[Network error]: ${err.networkError}`);
      }
    }
    

     // close modal and reset inputs after successful submission
     setModalIsOpen(false);
     setFlashCardInput({frontInput: '', backInput: ''});
  };


  return (
    <>
      {/* ---------- MindFlip Drawer Open------- */}
      <div className="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={drawerOpen}
          onChange={toggleDrawer}
        />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="text-5xl font-bold text-white title drawer-button"
            onClick={toggleDrawer}
          >
            <h1 style={{ cursor: "pointer" }} id="dashTitle">
              MindFlip
            </h1>
          </label>
        </div>
        <Nav drawerOpen={drawerOpen} />
      </div>
      {/* -------------------------------- */}
      <div
        className="border hero min-h-screen"
        style={{ backgroundImage: `url(${mesh})` }}
      >
        <div className="hero-overlay bg-opacity-10"></div>
        <div id="dashboardText">Dashboard</div>
        <div id="dashContainer">
          <button className="btn section row" id="begin">
            Begin Game
          </button>
          <div className="row">
            <div className="myFlashCards section">
              <div className="cardTitle"> My Flash Cards</div>
              <button onClick={handleButtonClick} className="dashButtons">
                View All Flash Cards
              </button>
              
            <button onClick={() => setModalIsOpen(true)} className="dashButtons">Add Flash Card</button>
            <div>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Add Flash Card</h2>
                <form>
                    <label>
                        Front:
                        <input 
                            type="text" 
                            name="frontInput" 
                            value={flashCardInput.frontInput}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Back:
                        <input 
                            type="text" 
                            name="backInput" 
                            value={flashCardInput.backInput}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="button" onClick={handleAddFlashCard}>Submit</button>
                </form>
                <button onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal>
        </div>
            </div>
            <div className="categories section">
              <div className="cardTitle"> Categories</div>
              <button className="dashButtons">View Categories</button>
              <button className="dashButtons">Add Category</button>
            </div>
          </div>
        </div>
        <FlashCards showFlashCards={showFlashCards} />
      </div>
    </>
  );
};

export default Dashboard;
