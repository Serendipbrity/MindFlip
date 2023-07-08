import mesh from "../../assets/img/mesh-gradient.png";
import Nav from "../Nav";
import "../../css/dashboard.css";
const Dashboard = ({ drawerOpen, toggleDrawer }) => {
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
          <button className="btn section" id="begin">
            Begin Game
          </button>
          <div className="myFlashCards section">
            My Flash Cards
                      <button className="btn dashButtons">View All Flash Cards</button>
                      <button className="btn dashButtons">Add Flash Card</button>
          </div>
          <div className="categories section">
            Categories
                      <button className="btn dashButtons">View Categories</button>
                      <button className="btn dashButtons">Add Category</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
