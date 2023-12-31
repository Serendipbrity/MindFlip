import mesh from "../../assets/img/mesh-gradient.png";
import "../../css/index.css";
import Nav from "../Nav";


const Home = ({ drawerOpen, toggleDrawer }) => {
  return (
    <div
      className="hero min-h-screen border"
      style={{ backgroundImage: `url(${mesh})` }}
    >
      <div className="hero-overlay bg-opacity-10"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <label
            onClick={toggleDrawer}
            className="text-5xl font-bold text-white title drawer-button"
            style={{ cursor: "pointer" }}
          >
            <h1 className="mb-5">MindFlip</h1>
          </label>
          <p className="mb-5 text-white text-opacity-7 homeText">
            Welcome to MindFlip, the flashcard app designed to make learning
            more efficient and enjoyable!
          </p>
          <p className="mb-5 text-white text-opacity-7 homeText">
            Create custom flashcards tailored to your needs, across any subject.
            With our spaced repetition system, MindFlip schedules your reviews
            at optimal intervals, enhancing memory retention and reducing study
            time.
          </p>
          {/* ---- Get Starter Drawer Open ----- */}
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
                onClick={toggleDrawer}
                className="btn drawer-button text-white bg-opacity-20"
                style={{ cursor: "pointer" }}
              >
                Get Started
              </label>
            </div>
            <Nav drawerOpen={drawerOpen} />
          </div>

          {/* --------------------------- */}
        </div>
      </div>
    </div>
  );
};

export default Home;
