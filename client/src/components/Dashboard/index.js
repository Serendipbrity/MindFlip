import mesh from "../../assets/img/mesh-gradient.png";
import Nav from "../Nav";
import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  ADD_FLASHCARD_TO_USER,
  ADD_CATEGORY_TO_USER,
} from "../../utils/mutations";
import FlashCards from "../FlashCards";
import FlashCardGame from "../FlashCardGame";
import Categories from "../Categories";
import "../../css/dashboard.css";
import Modal from "react-modal";
import { VIEW_FLASHCARDS, VIEW_CATEGORIES } from "../../utils/queries";
import "../../css/modals.css";

const Dashboard = ({ drawerOpen, toggleDrawer }) => {
  Modal.setAppElement("#root");

  // ------ only show current users flash cards / categories ------

  // get token from local storage. We need this to get the user id so we can pull the users flash cards
  const idToken = localStorage.getItem("id_token");

  // Decode the JWT to get its payload
  const base64Url = idToken.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payload = JSON.parse(window.atob(base64));

  // Now get the userId
  const userId = payload.id;
  // ----------------------------------------------------------------
   // ----------------- View Flash Cards -----------------------------
  
  // flash cards start off not showing
  const [showFlashCards, setShowFlashCards] = useState(false);

  // when clicking the button, show flash cards
  const handleButtonClick = () => {
    setShowFlashCards(true);
  };
  const { loading: loadingFlashCards, data: dataFlashCards } = useQuery(
    VIEW_FLASHCARDS,
    {
      variables: { userId },
    }
  );
// ----------------------------------------------------------------
  // --------- begin game functionality ------------------------------
  // game starts off not showing
  const [gameStarted, setGameStarted] = useState(false);
  const startGame = () => {
    console.log(dataFlashCards.viewFlashCards);

    setGameStarted(true);
  };

  // ----------------------------------------------------------------
  const [flashCardModalIsOpen, setFlashCardModalIsOpen] = useState(false);

  // flash card inputs start off empty
  const [flashCardInput, setFlashCardInput] = useState({
    frontInput: "",
    backInput: "",
  });

  const [addFlashCardToUser, { error }] = useMutation(ADD_FLASHCARD_TO_USER);

  // handle change of flash card inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFlashCardInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddFlashCard = async () => {
    const { frontInput, backInput } = flashCardInput;

    try {
      const { dataFlashCards } = await addFlashCardToUser({
        variables: {
          userId,
          frontInput,
          backInput,
        },
      });
      window.alert("Flash Card Added!").location.reload();
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

    // close modal after successful submission
    setFlashCardModalIsOpen(false);
    // reset inputs after successful submission
    setFlashCardInput({ frontInput: "", backInput: "" });
  };

  // --------- VIEW categories ---------------------------
  const { loading: loadingCategories, data: categoriesData, error:categoriesError } =
    useQuery(
      VIEW_CATEGORIES, {
      variables: { userId },
    });
  // start off not showing categories
  const [showCategories, setShowCategories] = useState(false);

  // when clicking the button.....
  const handleCategoryButtonClick = () => {
    console.log({loadingCategories, categoriesData, categoriesError})
  if (loadingCategories) {
    console.log("Categories are still loading...");
  } else if (categoriesError) {
    console.error("An error occurred:", categoriesError);
  } else if (categoriesData && categoriesData.viewCategories) {
    console.log(categoriesData.viewCategories);
    setShowCategories(true);
  } else {
    console.log("Categories not loaded or an error occurred");
  }
};
  // ------------------------------------------------------
  // --------- ADD category ---------------------------
  const [addCategoryToUser] = useMutation(ADD_CATEGORY_TO_USER);
  const [categoryModalIsOpen, setCategoryModalIsOpen] = useState(false);
  const { refetch: refetchCategories } = useQuery(VIEW_CATEGORIES);

  const handleAddCategoryButtonClick = async () => {
    try {
      const { data } = await addCategoryToUser({
        variables: {
          userId,
          category: categoryInput,
        },
      });
      window.alert("Category Added!");
      // refetch (refresh) categories to show new category
      refetchCategories();
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

    // close modal after successful submission
    setCategoryModalIsOpen(false);
    // reset inputs after successful submission
    setCategoryInput("");
  };
  // ------------------------------------------------------
  const [categoryInput, setCategoryInput] = useState("");
  const handleCategoryInputChange = (event) => {
    setCategoryInput(event.target.value);
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
          {gameStarted &&
          Array.isArray(dataFlashCards?.viewFlashCards) &&
          dataFlashCards.viewFlashCards.length > 0 ? (
            <FlashCardGame flashCards={dataFlashCards.viewFlashCards} />
          ) : (
            <button
              className="btn section row begin"
              onClick={startGame}
              disabled={loadingFlashCards}
            >
              Begin Game
            </button>
          )}

          <div className="row">
            <div className="myFlashCards section">
              <div className="cardTitle"> My Flash Cards</div>
              <button onClick={handleButtonClick} className="dashButtons">
                View All Flash Cards
              </button>

              <button
                onClick={() => setFlashCardModalIsOpen(true)}
                className="dashButtons"
              >
                Add Flash Card
              </button>
              {/* --------- Add flash card Modal ------------ */}
              <Modal
                className="modal"
                isOpen={flashCardModalIsOpen}
                onRequestClose={() => setFlashCardModalIsOpen(false)}
              >
                <div className="modal-content" id="addModal-Content">
                  <h2 className="modalTitles">Add Flash Card</h2>
                  <form>
                    <h2 className="modalSubTitles">Front of Card:</h2>
                    <textarea
                      className="modalTextareas"
                      name="frontInput"
                      value={flashCardInput.frontInput}
                      onChange={handleInputChange}
                    />
                    <h2 className="modalSubTitles">Back of Flash Card:</h2>
                    <textarea
                      name="backInput"
                      className="modalTextareas"
                      value={flashCardInput.backInput}
                      onChange={handleInputChange}
                    />
                  </form>
                  <button
                    type="button"
                    onClick={handleAddFlashCard}
                    className="submit btn"
                    id="submit"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setFlashCardModalIsOpen(false)}
                    id="flashCardCloseBtn"
                  >
                    Close
                  </button>
                </div>
              </Modal>
              {/* ----------------------------------- */}
            </div>
            <div className="categories section">
              <div className="cardTitle"> Categories</div>
              <button
                className="dashButtons"
                onClick={handleCategoryButtonClick}
                disabled={loadingCategories}
              >
                View Categories
              </button>

              {/* add category */}
              <button
                className="dashButtons"
                onClick={() => setCategoryModalIsOpen(true)}
              >
                Add Category
              </button>
              {/* ---------- Add Category Modal --------- */}
              <Modal
                className="modal"
                isOpen={categoryModalIsOpen}
                onRequestClose={() => setCategoryModalIsOpen(false)}
              >
                <div className="modal-content" id="addModal-Content">
                  <h2 className="modalTitles">Add Category</h2>
                  <form>
                    <h2 className="modalSubTitles">Category:</h2>
                    <textarea
                      className="modalTextareas"
                      name="categoryInput"
                      value={categoryInput}
                      onChange={handleCategoryInputChange}
                    />
                  </form>
                  <button
                    type="button"
                    onClick={handleAddCategoryButtonClick}
                    className="submit btn"
                    id="submit"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setCategoryModalIsOpen(false)}
                    id="categoryCloseBtn"
                  >
                    Close
                  </button>
                </div>
              </Modal>
              {/* -------------------------------------- */}
            </div>
            <FlashCards
              showFlashCards={showFlashCards}
              flashCards={dataFlashCards?.viewFlashCards}
              handleButtonClick={handleButtonClick}
            />
            {showCategories &&
              Array.isArray(categoriesData?.viewCategories) &&
              categoriesData.viewCategories.length > 0 && (
                <Categories categories={categoriesData.viewCategories} userId={userId}/>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
