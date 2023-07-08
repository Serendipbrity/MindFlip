import mesh from "../../assets/img/mesh-gradient.png";
import Nav from "../Nav";
import "../../css/dashboard.css";
const Dashboard = () => {
  return (
    <>
      <div
        className="border hero min-h-screen"
        style={{ backgroundImage: `url(${mesh})` }}
      >
        <div className="hero-overlay bg-opacity-10"></div>
        <div className="dashboardText">Dashboard</div>
        {/* <h2>My Flash Cards</h2>
      <button>Add Flash Card</button>
      <h2>Categories</h2>
      <button>Add Category</button> */}
      </div>
    </>
  );
};

export default Dashboard;
