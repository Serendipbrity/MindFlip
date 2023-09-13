import { useState } from "react";
import Nav from "../Nav";
const MindFlip = ({ drawerOpen, toggleDrawer }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  return (
    <>
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
    </>
  );
};

export default MindFlip;
