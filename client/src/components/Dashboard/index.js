import mesh from "../../assets/img/mesh-gradient.png";
import Nav from "../Nav";
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import FlashCards from "../FlashCards";
import "../../css/dashboard.css";
import {
  VIEW_USERS,
  VIEW_USER,
  VIEW_FLASHCARDS,
  VIEW_FLASHCARD,
} from "../../utils/queries";
const Dashboard = ({ drawerOpen, toggleDrawer }) => {
  const [showFlashCards, setShowFlashCards] = useState(false);
  const { loading, data } = useQuery(VIEW_FLASHCARDS);

  const handleButtonClick = () => {
    setShowFlashCards(true);
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
              <button className="dashButtons">Add Flash Card</button>
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
