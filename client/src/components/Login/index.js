import { useState, useEffect } from 'react';
import "../../css/signinRegister.css";
import { gql, useMutation } from '@apollo/client';
import Nav from "../Nav";
import { LOGIN_USER } from '../../utils/mutations';
import {Link, useNavigate} from 'react-router-dom';
import Auth from '../../utils/auth';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ drawerOpen, toggleDrawer }) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // state to toggle password visibility
  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const navigate = useNavigate();

  const handleLoginSubmit = async event => {
    event.preventDefault();
  
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
  
      if (data) {
        await Auth.login(data.login.token); // wait for login to complete
        navigate("/dashboard"); // successful login, go to dashboard
      } else {
        navigate("/error"); // login failed, go to error
      }
    } catch (e) {
      navigate("/error"); // any error during login, go to error
    }
  }

  return (
      <div className=" border flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
                <h1 className="mb-5" style={{ cursor: "pointer" }}>
                  MindFlip
                </h1>
              </label>
            </div>
            <Nav drawerOpen={drawerOpen} />
          </div>
          {/* -------------------------------- */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleLoginSubmit}>
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
                  autoComplete="email"
                  required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 inputSigninRegister"
                onChange={handleInputChange}
                  value={userFormData.email}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
                <div className="text-sm">
                  <a href="#" className="btnLinks text-white">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  placeholder="Enter Password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 inputSigninRegister"
                onChange={handleInputChange}
                  value={userFormData.password}

                />
              </div>
            </div>
              <button
                type="submit"
            className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 btn"
            onSubmit={handleLoginSubmit}
              >
                Sign in
              </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link to="/register" className="text-white leading-6 btnLinks">
              Register
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Login;
