import "../../css/signinRegister.css";
import Nav from "../Nav";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { REGISTER_USER } from '../../utils/mutations';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Register = ({ drawerOpen, toggleDrawer }) => {
   // set initial form state
   const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { loading, error }] = useMutation(REGISTER_USER);

  const [showPassword, setShowPassword] = useState(false); // state to toggle password visibility

  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // for success message

  const navigate = useNavigate(); // for redirect

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target['confirm-password'].value;
    // if the password and confirm password don't match, alert the user
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const result = await addUser({ variables: { username, email, password } });
      console.log(result);
      // assuming result.data.addUser.token holds the authentication token
      localStorage.setItem('auth-token', result.data.addUser.token); // save token to localStorage
      setShowSuccessMessage(true); // display success message
      setTimeout(() => {
        navigate('/dashboard'); // redirect to dashboard after 2 seconds
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
      <div className="border flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* ----- title and sub header ------- */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
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
                <h1 className="mb-5 " style={{ cursor: "pointer" }} >
                  MindFlip
                </h1>
              </label>
            </div>
            <Nav drawerOpen={drawerOpen} />
          </div>
          {/* -------------------------------- */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Register New Account
          </h2>
        </div>
        {/* ----------------------------------- */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {showSuccessMessage && 
      <div className="my-4 px-6 py-3 bg-green-500 text-white text-center">
        Successfully registered! Redirecting to dashboard...
      </div>
    }
          {/* form */}
        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
           {/* -------- username-------- */}
           <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  placeholder="Enter Username"
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 inputSigninRegister"
                />
              </div>
            </div>
            {/* ------------------------- */}
            {/* -------- email-------- */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  placeholder="Enter Email"
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 inputSigninRegister"
                />
              </div>
            </div>
            {/* ------------------------- */}
            {/* ---------create password ---------- */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                Create Password
                
              </label>
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
              </div>
            <div className="mt-2">
     
                <input
                  placeholder="Enter Password"
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 inputSigninRegister"
              >
              </input>
              </div>
            </div>
            {/* ------------------------------------- */}
            {/* ---------re type password ---------- */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Confirm Password
              </label>
  
              </div>
              <div className="mt-2">
                <input
                  placeholder="Re Enter Password"
                  id="confirm-password"
                  name="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 inputSigninRegister"
                />
              </div>
            </div>
            {/* ------------------------------------- */}
            {/* ------ register button --------- */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 btn" 
              >
                Register
              </button>
            </div>
            {/* ---------------------------- */}
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link to="/login" className="text-white leading-6 btnLinks">
              Login
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Register;
