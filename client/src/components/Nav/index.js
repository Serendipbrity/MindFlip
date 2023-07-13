import { Link } from 'react-router-dom';
import "../../css/nav.css";
import Auth from '../../utils/auth';

const Nav = ({ drawerOpen }) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  }
  

  return (
    <div className={`drawer-side ${drawerOpen ? "open" : ""}`}>
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
        {Auth.loggedIn() ? (
          <>
        <li>
            <Link to="/dashboard" className='btnLinks'>My Dashboard</Link>
        </li>
        <li>
            <Link to="/stats" className='btnLinks'>Stats</Link>
          </li>
     
        <li>
            <Link to="/" className='btnLinks' onClick={logout}>Log Out</Link>
            </li>
            </>
        ) : (
            <>
        <li>
            <Link to="/" className='btnLinks'>Home</Link>
        </li>
        <li>
            <Link to="/login" className='btnLinks'>Login</Link>
        </li>
          <li>
            <Link to="/register" className='btnLinks'>Register</Link>
        </li>
       
          <li>
            <Link to="/features" className='btnLinks'>Features</Link>
          </li>
          <li>
            <Link to="/community" className='btnLinks'>Community</Link>
              </li>
              </>
        )}
        </ul>
      </div>
  );
};

export default Nav;
