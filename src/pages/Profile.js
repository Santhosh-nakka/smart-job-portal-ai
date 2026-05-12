import { useContext } from "react";

import { SkillsContext } from "../context/SkillsContext";

import {
  FaUserCircle,
  FaEnvelope
} from "react-icons/fa";

function Profile() {

  const { skills } = useContext(SkillsContext);

  return (
    <div style={styles.container}>

      {/* PAGE TITLE */}
      <h1 style={styles.pageTitle}>
        👤 Profile
      </h1>

      {/* PROFILE CARD */}
      <div style={styles.profileCard}>

        <div style={styles.topSection}>

          {/* AVATAR */}
          <div style={styles.avatar}>
            <FaUserCircle />
          </div>

          {/* USER DETAILS */}
          <div>

            <h2 style={styles.name}>
              Santhosh
            </h2>

            <p style={styles.role}>
              Aspiring Software Developer
            </p>

            <p style={styles.email}>
              <FaEnvelope />
              santhosh@email.com
            </p>

          </div>

        </div>

      </div>

      {/* SKILLS CARD */}
      <div style={styles.skillsCard}>

        <h2 style={styles.skillsTitle}>
          Your Skills
        </h2>

        {skills.length === 0 ? (

          <p style={styles.empty}>
            Upload resume to see your skills
          </p>

        ) : (

          <div>

            {skills.map((skill, index) => {

              const percentage =
                Math.min(70 + index * 5, 100);

              return (

                <div
                  key={index}
                  style={styles.skillItem}
                >

                  {/* HEADER */}
                  <div style={styles.skillHeader}>

                    <span style={styles.skillName}>
                      {skill}
                    </span>

                    <span style={styles.percent}>
                      {percentage}%
                    </span>

                  </div>

                  {/* PROGRESS BAR */}
                  <div style={styles.bar}>

                    <div
                      style={{
                        ...styles.fill,
                        width: `${percentage}%`
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "'Poppins', sans-serif"
  },

  /* TITLE */
  pageTitle: {

    color: "#e2e8f0",

    marginBottom: "28px",

    fontSize: "36px",

    fontWeight: "700",

    textShadow:
      "0 0 12px rgba(0,198,255,0.35)"
  },

  /* PROFILE CARD */
  profileCard: {

    padding: "35px",

    borderRadius: "24px",

    background:
      "rgba(15,23,42,0.65)",

    backdropFilter: "blur(16px)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    boxShadow:
      "0 0 35px rgba(0,198,255,0.12)",

    marginBottom: "30px"
  },

  topSection: {
    display: "flex",
    alignItems: "center",
    gap: "25px"
  },

  /* AVATAR */
  avatar: {

    fontSize: "90px",

    color: "#38bdf8",

    textShadow:
      "0 0 20px rgba(0,198,255,0.45)"
  },

  /* NAME */
  name: {
    color: "#e2e8f0",
    fontSize: "34px",
    marginBottom: "10px"
  },

  /* ROLE */
  role: {
    color: "#94a3b8",
    fontSize: "17px",
    marginBottom: "12px"
  },

  /* EMAIL */
  email: {

    display: "flex",

    alignItems: "center",

    gap: "10px",

    color: "#38bdf8",

    fontSize: "15px"
  },

  /* SKILLS CARD */
  skillsCard: {

    padding: "30px",

    borderRadius: "24px",

    background:
      "rgba(15,23,42,0.65)",

    backdropFilter: "blur(16px)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    boxShadow:
      "0 0 35px rgba(0,198,255,0.12)"
  },

  /* SKILLS TITLE */
  skillsTitle: {

    color: "#e2e8f0",

    marginBottom: "25px",

    fontSize: "28px",

    fontWeight: "700"
  },

  empty: {
    color: "#94a3b8"
  },

  /* SKILL ITEM */
  skillItem: {
    marginBottom: "22px"
  },

  skillHeader: {

    display: "flex",

    justifyContent: "space-between",

    marginBottom: "10px"
  },

  skillName: {
    color: "#e2e8f0",
    fontWeight: "500",
    textTransform: "capitalize"
  },

  percent: {
    color: "#38bdf8",
    fontWeight: "600"
  },

  /* BAR */
  bar: {

    height: "12px",

    background:
      "rgba(255,255,255,0.08)",

    borderRadius: "20px",

    overflow: "hidden"
  },

  /* FILL */
  fill: {

    height: "100%",

    borderRadius: "20px",

    background:
      "linear-gradient(90deg, #00c6ff, #0072ff)",

    boxShadow:
      "0 0 12px rgba(0,198,255,0.35)"
  }
};

export default Profile;