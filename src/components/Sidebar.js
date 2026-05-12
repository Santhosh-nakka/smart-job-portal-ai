import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#1e1e2f",
      color: "#fff",
      padding: "20px"
    }}>
      <h2>Job Portal</h2>

      <nav style={{ marginTop: "20px" }}>
        <NavLink to="/" style={navStyle}>Dashboard</NavLink>
        <NavLink to="/upload" style={navStyle}>Upload</NavLink>
        <NavLink to="/jobs" style={navStyle}>Jobs</NavLink>
        <NavLink to="/profile" style={navStyle}>Profile</NavLink>
      </nav>
    </div>
  );
}

const navStyle = ({ isActive }) => ({
  display: "block",
  color: isActive ? "#00ffff" : "#fff",
  background: isActive ? "#2a2a40" : "transparent",
  padding: "10px",
  borderRadius: "6px",
  textDecoration: "none",
  margin: "8px 0"
});

export default Sidebar;