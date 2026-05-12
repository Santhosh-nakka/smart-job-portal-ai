import { Link } from "react-router-dom";

function Home() {

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          AI Resume Analyzer
        </h1>

        <p style={styles.subtitle}>
          Upload resumes, analyze skills, and get AI-powered
          job recommendations instantly.
        </p>

        <div style={styles.buttonContainer}>

          <Link
            to="/dashboard"
            style={styles.primaryButton}
          >
            Enter Portal
          </Link>

          <Link
            to="/upload"
            style={styles.secondaryButton}
          >
            Upload Resume
          </Link>

        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    padding: "20px",

    fontFamily: "'Poppins', sans-serif"
  },

  /* MAIN CARD */
  card: {

    width: "650px",

    padding: "60px",

    borderRadius: "30px",

    background:
      "rgba(15,23,42,0.68)",

    backdropFilter: "blur(18px)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    boxShadow:
      "0 0 45px rgba(0,198,255,0.15)",

    textAlign: "center"
  },

  title: {

    fontSize: "52px",

    fontWeight: "700",

    color: "#e2e8f0",

    marginBottom: "18px",

    textShadow:
      "0 0 18px rgba(0,198,255,0.35)"
  },

  subtitle: {

    color: "#94a3b8",

    fontSize: "18px",

    lineHeight: "1.8",

    marginBottom: "40px"
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "18px",
    flexWrap: "wrap"
  },

  /* PRIMARY BUTTON */
  primaryButton: {

    padding: "16px 32px",

    borderRadius: "14px",

    textDecoration: "none",

    background:
      "linear-gradient(135deg, #00c6ff, #0072ff)",

    color: "#fff",

    fontWeight: "700",

    fontSize: "16px",

    boxShadow:
      "0 0 18px rgba(0,198,255,0.35)"
  },

  /* SECONDARY BUTTON */
  secondaryButton: {

    padding: "16px 32px",

    borderRadius: "14px",

    textDecoration: "none",

    background:
      "rgba(255,255,255,0.05)",

    border:
      "1px solid rgba(255,255,255,0.1)",

    color: "#e2e8f0",

    fontWeight: "600",

    fontSize: "16px"
  }
};

export default Home;