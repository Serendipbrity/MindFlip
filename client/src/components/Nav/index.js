import { Link } from 'react-router-dom';
import "../../css/nav.css";

const Nav = ({ drawerOpen }) => {
  return (
    <div className={`drawer-side ${drawerOpen ? "open" : ""}`}>
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          <li>
            <Link to="/login" className='btnLinks'>Login</Link>
          </li>
          <li>
            <Link to="/signup" className='btnLinks'>Register</Link>
          </li>
          <li>
            <Link to="/features" className='btnLinks'>Features</Link>
          </li>
          <li>
            <Link to="/community" className='btnLinks'>Community</Link>
          </li>
          <li>
            <Link to="/dashboard" className='btnLinks'>Dashboard</Link>
          </li>
        </ul>
      </div>
  );
};

export default Nav;
