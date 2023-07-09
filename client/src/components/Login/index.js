import { useState, useEffect } from 'react';
import "../../css/signinRegister.css";
import { gql, useMutation } from '@apollo/client';
import Nav from "../Nav";
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Login = ({ drawerOpen, toggleDrawer }) => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setUserFormData({
      email: '',
      password: '',
    });
  };

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
          <form className="space-y-6" action="#" method="POST" onSubmit={handleFormSubmit}>
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

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 btn"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a href="#" className="text-white leading-6 btnLinks">
              Register
            </a>
          </p>
        </div>
      </div>
  );
};

export default Login;
