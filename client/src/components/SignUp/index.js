import "../../css/signupsignin.css";
import Nav from "../Nav";

const SignUp = ({drawerOpen, toggleDrawer}) => {
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
          {/* form */}
          <form className="space-y-6" action="#" method="POST">
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 inputSingupSignIn"
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
              </div>
              <div className="mt-2">
                <input
                  placeholder="Enter Password"
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 inputSingupSignIn"
                />
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
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 inputSingupSignIn"
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
        </div>
      </div>
  );
};

export default SignUp;
