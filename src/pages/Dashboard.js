import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  useContext,
  useEffect,
  useState
} from "react";

import axios from "axios";

import { SkillsContext }
from "../context/SkillsContext";

function Dashboard() {

  const { skills } =
    useContext(SkillsContext);

  // HISTORY
  const [history, setHistory] =
    useState([]);

  // FETCH HISTORY
  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const res = await axios.get(
        "https://smart-job-backend-dcpt.onrender.com/history"
      );

      setHistory(res.data);

    } catch (err) {

      console.error(err);
    }
  };

  // CHART DATA
  const data = [

    {
      name: "Mon",
      uploads: history.length > 0 ? 1 : 0
    },

    {
      name: "Tue",
      uploads: history.length > 1 ? 2 : 0
    },

    {
      name: "Wed",
      uploads: history.length > 2 ? 3 : 0
    },

    {
      name: "Thu",
      uploads: history.length > 3 ? 2 : 0
    },

    {
      name: "Fri",
      uploads: history.length > 4 ? 4 : 0
    },

    {
      name: "Sat",
      uploads: history.length > 5 ? 3 : 0
    },

    {
      name: "Sun",
      uploads: history.length > 6 ? 5 : 0
    }
  ];

  return (
    <div style={styles.container}>

      {/* TITLE */}
      <h1 style={styles.title}>
        AI Dashboard
      </h1>

      {/* CARDS */}
      <div style={styles.cardContainer}>

        {/* RESUMES */}
        <div style={styles.card}>

          <h2 style={styles.number}>
            {history.length}
          </h2>

          <p style={styles.cardText}>
            Total Resumes
          </p>

        </div>

        {/* SKILLS */}
        <div style={styles.card}>

          <h2 style={styles.number}>
            {skills.length}
          </h2>

          <p style={styles.cardText}>
            Skills Detected
          </p>

        </div>

        {/* MATCHES */}
        <div style={styles.card}>

          <h2 style={styles.number}>
            {skills.length > 0
              ? Math.min(
                  skills.length,
                  10
                )
              : 0}
          </h2>

          <p style={styles.cardText}>
            AI Job Matches
          </p>

        </div>

      </div>

      {/* CHART */}
      <div style={styles.chartBox}>

        <h3 style={styles.chartTitle}>
          Weekly Upload Activity
        </h3>

        <ResponsiveContainer
          width="100%"
          height={260}
        >

          <BarChart data={data}>

            {/* BLUE BAR */}
            <defs>

              <linearGradient
                id="blueBar"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#00c6ff"
                />

                <stop
                  offset="100%"
                  stopColor="#0072ff"
                />

              </linearGradient>

            </defs>

            <XAxis
              dataKey="name"
              stroke="#cbd5e1"
            />

            <YAxis
              stroke="#cbd5e1"
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",

                border:
                  "1px solid rgba(0,198,255,0.3)",

                borderRadius: "12px",

                color: "#fff"
              }}
            />

            <Bar
              dataKey="uploads"

              fill="url(#blueBar)"

              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* HISTORY */}
      <div style={styles.historyBox}>

        <h3 style={styles.chartTitle}>
          Recent Resume Analysis
        </h3>

        {history.length === 0 ? (

          <p style={styles.emptyText}>
            No resume history yet
          </p>

        ) : (

          history.map((item, index) => (

            <div
              key={index}
              style={styles.historyCard}
            >

              {/* FILE */}
              <div>

                <p style={styles.fileName}>
                  {item.file_name}
                </p>

                <p style={styles.uploadTime}>
                  {item.uploaded_at}
                </p>

              </div>

              {/* SCORE */}
              <div>

                <p style={styles.score}>
                  {item.resume_score}%
                </p>

                <p style={styles.ats}>
                  {item.ats_status}
                </p>

              </div>

            </div>
          ))

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
  title: {

    color: "#e2e8f0",

    marginBottom: "30px",

    fontWeight: "700",

    fontSize: "34px",

    textShadow:
      "0 0 15px rgba(0,198,255,0.35)"
  },

  /* CARD CONTAINER */
  cardContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  },

  /* CARDS */
  card: {

    flex: 1,

    minWidth: "220px",

    padding: "28px",

    background:
      "rgba(15,23,42,0.6)",

    backdropFilter: "blur(14px)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    borderRadius: "20px",

    boxShadow:
      "0 0 25px rgba(0,198,255,0.15)",

    textAlign: "center",

    color: "#fff"
  },

  number: {

    color: "#38bdf8",

    fontWeight: "700",

    fontSize: "34px",

    textShadow:
      "0 0 15px rgba(0,198,255,0.45)"
  },

  cardText: {
    color: "#cbd5e1",
    fontSize: "15px"
  },

  /* CHART */
  chartBox: {

    marginTop: "35px",

    padding: "25px",

    background:
      "rgba(15,23,42,0.55)",

    backdropFilter: "blur(16px)",

    borderRadius: "22px",

    border:
      "1px solid rgba(255,255,255,0.08)",

    boxShadow:
      "0 0 30px rgba(0,198,255,0.15)"
  },

  chartTitle: {
    color: "#e2e8f0",
    marginBottom: "18px",
    fontWeight: "600",
    fontSize: "20px"
  },

  /* HISTORY */
  historyBox: {

    marginTop: "35px",

    padding: "25px",

    background:
      "rgba(15,23,42,0.55)",

    backdropFilter: "blur(16px)",

    borderRadius: "22px",

    border:
      "1px solid rgba(255,255,255,0.08)",

    boxShadow:
      "0 0 30px rgba(0,198,255,0.15)"
  },

  historyCard: {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    padding: "18px",

    marginBottom: "14px",

    borderRadius: "16px",

    background:
      "rgba(255,255,255,0.04)"
  },

  fileName: {
    color: "#e2e8f0",
    fontWeight: "600",
    marginBottom: "6px"
  },

  uploadTime: {
    color: "#94a3b8",
    fontSize: "13px"
  },

  score: {

    color: "#38bdf8",

    fontWeight: "700",

    fontSize: "22px",

    textAlign: "right"
  },

  ats: {
    color: "#4ade80",
    fontSize: "14px",
    textAlign: "right"
  },

  emptyText: {
    color: "#94a3b8"
  }
};

export default Dashboard;
