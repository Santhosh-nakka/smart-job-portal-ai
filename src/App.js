import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import {
  FaHome,
  FaUpload,
  FaBriefcase,
  FaUser
} from "react-icons/fa";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {

  const { dark, toggleTheme } =
    useContext(ThemeContext);

  const location = useLocation();

  // HOME PAGE
  const isHome =
    location.pathname === "/";

  return (
    <div style={styles.wrapper}>

      {/* PARTICLES */}
      <div className="particles">
        {[...Array(25)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <div
        style={{
          ...styles.container,
          background: dark
            ? "#020617"
            : "transparent"
        }}
      >

        {/* SIDEBAR */}
        {!isHome && (
          <div
            style={{
              ...styles.sidebar,
              background: dark
                ? "linear-gradient(180deg, #020617, #0f172a)"
                : "linear-gradient(180deg, #0f172a, #1e293b)"
            }}
          >

            {/* LOGO */}
            <h2 style={styles.logo}>
              AI Portal
            </h2>

            {/* DASHBOARD */}
            <NavItem
              to="/dashboard"
              icon={<FaHome />}
              text="Dashboard"
              current={location.pathname}
            />

            {/* UPLOAD */}
            <NavItem
              to="/upload"
              icon={<FaUpload />}
              text="Upload"
              current={location.pathname}
            />

            {/* JOBS */}
            <NavItem
              to="/jobs"
              icon={<FaBriefcase />}
              text="Jobs"
              current={location.pathname}
            />

            {/* PROFILE */}
            <NavItem
              to="/profile"
              icon={<FaUser />}
              text="Profile"
              current={location.pathname}
            />

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              style={styles.toggle}
            >
              {dark
                ? "☀️ Light Mode"
                : "🌙 Dark Mode"}
            </button>

          </div>
        )}

        {/* CONTENT */}
        <div
          style={{
            ...styles.content,
            background: dark
              ? "rgba(15,23,42,0.4)"
              : "transparent",

            color: dark
              ? "#fff"
              : "#e2e8f0",

            width: "100%"
          }}
        >

          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* DASHBOARD */}
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            {/* UPLOAD */}
            <Route
              path="/upload"
              element={<Upload />}
            />

            {/* JOBS */}
            <Route
              path="/jobs"
              element={<Jobs />}
            />

            {/* PROFILE */}
            <Route
              path="/profile"
              element={<Profile />}
            />

          </Routes>

        </div>

      </div>
    </div>
  );
}

/* SIDEBAR ITEM */
function NavItem({
  to,
  icon,
  text,
  current
}) {

  const isActive = current === to;

  return (
    <Link
      to={to}
      style={{
        ...styles.link,
        ...(isActive
          ? styles.active
          : {})
      }}
    >

      <span style={styles.icon}>
        {icon}
      </span>

      {text}

    </Link>
  );
}

const styles = {

  wrapper: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden"
  },

  container: {
    display: "flex",
    position: "relative",
    zIndex: 1
  },

  /* SIDEBAR */
  sidebar: {

    width: "230px",

    height: "100vh",

    color: "#fff",

    display: "flex",

    flexDirection: "column",

    padding: "20px",

    backdropFilter: "blur(14px)",

    borderRight:
      "1px solid rgba(255,255,255,0.08)",

    boxShadow:
      "4px 0 30px rgba(0,0,0,0.3)"
  },

  /* LOGO */
  logo: {

    marginBottom: "35px",

    fontWeight: "700",

    fontSize: "28px",

    color: "#38bdf8",

    textShadow:
      "0 0 15px rgba(0,198,255,0.6)"
  },

  /* LINKS */
  link: {

    display: "flex",

    alignItems: "center",

    gap: "12px",

    color: "#e2e8f0",

    textDecoration: "none",

    marginBottom: "14px",

    padding: "14px",

    borderRadius: "12px",

    fontWeight: "500",

    backdropFilter: "blur(10px)"
  },

  icon: {
    fontSize: "18px"
  },

  /* ACTIVE LINK */
  active: {

    background:
      "rgba(0,198,255,0.15)",

    border:
      "1px solid rgba(0,198,255,0.35)",

    boxShadow:
      "0 0 15px rgba(0,198,255,0.25)"
  },

  /* THEME BUTTON */
  toggle: {

    marginTop: "20px",

    padding: "12px",

    border: "none",

    borderRadius: "12px",

    cursor: "pointer",

    background:
      "linear-gradient(135deg, #00c6ff, #0072ff)",

    color: "#fff",

    fontWeight: "600",

    boxShadow:
      "0 0 18px rgba(0,198,255,0.35)"
  },

  /* CONTENT */
  content: {
    flex: 1,
    padding: "25px",
    backdropFilter: "blur(8px)"
  }
};

export default AppWrapper;