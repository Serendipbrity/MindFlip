// import {
//   VIEW_USERS,
//   VIEW_USER,
//   VIEW_FLASHCARDS,
//   VIEW_FLASHCARD,
// } from "../../utils/queries";
// import { useQuery } from "@apollo/client";
import {Link} from "react-router-dom";
import nasa from "../../assets/img/lightNasa.jpg";
import mesh from "../../assets/img/mesh-gradient.png"

const Home = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${mesh})` }}
    >
      <div className="hero-overlay bg-opacity-10"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white title">MindFlip</h1>
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
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
  htmlFor="my-drawer"
  className="btn drawer-button text-white bg-opacity-20"
>
  Get Started
</label>

            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <li>
                <Link to="/login">Login</Link>
                </li>
                <li>
                  <a>Sign Up</a>
                </li>
                <li>
                  <a>Features</a>
                </li>
                <li>
                  <a>Community</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
