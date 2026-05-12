import { useState, useContext } from "react";

import axios from "axios";

import jsPDF from "jspdf";

import { SkillsContext } from "../context/SkillsContext";

import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaCheckCircle,
  FaExclamationTriangle
} from "react-icons/fa";

function Upload() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const [dragActive, setDragActive] =
    useState(false);

  // AI DATA
  const [resumeScore, setResumeScore] =
    useState(0);

  const [atsStatus, setAtsStatus] =
    useState("");

  const [missingSkills, setMissingSkills] =
    useState([]);

  const [feedback, setFeedback] =
    useState([]);

  const { skills, setSkills } =
    useContext(SkillsContext);

  // HANDLE FILE
  const handleFile = (selectedFile) => {

    if (
      selectedFile &&
      selectedFile.type === "application/pdf"
    ) {

      setFile(selectedFile);

    } else {

      alert("Please upload PDF file");
    }
  };

  // DRAG OVER
  const handleDragOver = (e) => {

    e.preventDefault();

    setDragActive(true);
  };

  // DRAG LEAVE
  const handleDragLeave = () => {

    setDragActive(false);
  };

  // DROP
  const handleDrop = (e) => {

    e.preventDefault();

    setDragActive(false);

    const droppedFile =
      e.dataTransfer.files[0];

    handleFile(droppedFile);
  };

  // PDF DOWNLOAD
  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "AI Resume Analysis Report",
      20,
      20
    );

    doc.setFontSize(16);

    doc.text(
      `Resume Score: ${resumeScore}%`,
      20,
      45
    );

    doc.text(
      `ATS Status: ${atsStatus}`,
      20,
      60
    );

    // SKILLS
    doc.text(
      "Extracted Skills:",
      20,
      85
    );

    skills.forEach((skill, index) => {

      doc.text(
        `• ${skill}`,
        30,
        100 + (index * 10)
      );
    });

    // MISSING SKILLS
    let missingY =
      120 + (skills.length * 10);

    doc.text(
      "Missing Skills:",
      20,
      missingY
    );

    missingSkills.forEach(
      (skill, index) => {

        doc.text(
          `• ${skill}`,
          30,
          missingY + 15 + (index * 10)
        );
      }
    );

    // FEEDBACK
    let feedbackY =
      missingY + 30 +
      (missingSkills.length * 10);

    doc.text(
      "AI Feedback:",
      20,
      feedbackY
    );

    feedback.forEach((item, index) => {

      doc.text(
        `• ${item}`,
        30,
        feedbackY + 15 + (index * 10)
      );
    });

    doc.save(
      "AI_Resume_Report.pdf"
    );
  };

  // UPLOAD
  const uploadFile = async () => {

    if (!file) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:5000/parse",
        formData
      );

      // SKILLS
      setSkills(res.data.skills || []);

      // AI DATA
      setResumeScore(
        res.data.resume_score || 0
      );

      setAtsStatus(
        res.data.ats_status || ""
      );

      setMissingSkills(
        res.data.missing_skills || []
      );

      setFeedback(
        res.data.feedback || []
      );

    } catch (error) {

      console.error(error);

      alert("Error connecting to server");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        {/* TITLE */}
        <h1 style={styles.title}>
          AI Resume Analyzer
        </h1>

        <p style={styles.subtitle}>
          Upload your resume and get
          AI-powered analysis instantly
        </p>

        {/* DRAG AREA */}
        <div
          style={{
            ...styles.uploadArea,

            border: dragActive
              ? "2px solid #38bdf8"
              : "2px dashed rgba(0,198,255,0.35)",

            boxShadow: dragActive
              ? "0 0 30px rgba(0,198,255,0.35)"
              : "0 0 18px rgba(0,198,255,0.08)"
          }}

          onDragOver={handleDragOver}

          onDragLeave={handleDragLeave}

          onDrop={handleDrop}
        >

          <FaCloudUploadAlt
            style={styles.uploadIcon}
          />

          <p style={styles.uploadText}>

            {file
              ? file.name
              : "Drag & Drop Resume Here"}

          </p>

          <p style={styles.uploadSubtext}>
            or choose PDF manually
          </p>

          {/* INPUT */}
          <input
            type="file"
            accept=".pdf"
            id="resumeUpload"
            style={{ display: "none" }}

            onChange={(e) =>
              handleFile(
                e.target.files[0]
              )
            }
          />

          {/* BUTTON */}
          <label
            htmlFor="resumeUpload"
            style={styles.selectButton}
          >
            Choose File
          </label>

        </div>

        {/* FILE CARD */}
        {file && (

          <div style={styles.fileCard}>

            <FaFilePdf
              style={styles.pdfIcon}
            />

            <div>

              <p style={styles.fileName}>
                {file.name}
              </p>

              <p style={styles.fileType}>
                PDF Resume
              </p>

            </div>

          </div>
        )}

        {/* UPLOAD BUTTON */}
        <button
          onClick={uploadFile}

          disabled={loading}

          style={{
            ...styles.uploadButton,
            opacity: loading ? 0.7 : 1
          }}
        >

          {loading
            ? "Analyzing Resume..."
            : "Upload Resume"}

        </button>

        {/* AI SCORE CARD */}
        {resumeScore > 0 && (

          <div style={styles.scoreCard}>

            <h2 style={styles.scoreTitle}>
              Resume Score
            </h2>

            <div style={styles.scoreCircle}>
              {resumeScore}%
            </div>

            <p style={styles.atsText}>
              ATS Status:
              <span style={styles.atsStatus}>
                {" "} {atsStatus}
              </span>
            </p>

          </div>
        )}

        {/* SKILLS */}
        <div style={styles.skillsCard}>

          <h2 style={styles.skillsTitle}>
            Extracted Skills
          </h2>

          {skills.length === 0 ? (

            <p style={styles.emptyText}>
              No skills extracted yet
            </p>

          ) : (

            <div style={styles.skillsWrap}>

              {skills.map((skill, index) => (

                <div
                  key={index}
                  style={styles.skillTag}
                >

                  <FaCheckCircle />

                  {skill}

                </div>
              ))}

            </div>

          )}

        </div>

        {/* MISSING SKILLS */}
        {missingSkills.length > 0 && (

          <div style={styles.skillsCard}>

            <h2 style={styles.skillsTitle}>
              Missing Skills
            </h2>

            <div style={styles.skillsWrap}>

              {missingSkills.map((skill, index) => (

                <div
                  key={index}
                  style={styles.missingTag}
                >

                  <FaExclamationTriangle />

                  {skill}

                </div>
              ))}

            </div>

          </div>
        )}

        {/* FEEDBACK */}
        {feedback.length > 0 && (

          <div style={styles.feedbackCard}>

            <h2 style={styles.skillsTitle}>
              AI Feedback
            </h2>

            {feedback.map((item, index) => (

              <p
                key={index}
                style={styles.feedbackText}
              >
                • {item}
              </p>

            ))}

          </div>
        )}

        {/* PDF BUTTON */}
        {resumeScore > 0 && (

          <button
            onClick={downloadPDF}
            style={styles.pdfButton}
          >
            Download AI Report PDF
          </button>

        )}

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

  card: {
    width: "540px",
    padding: "40px",
    borderRadius: "28px",
    background:
      "rgba(15,23,42,0.68)",
    backdropFilter: "blur(18px)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "0 0 40px rgba(0,198,255,0.12)"
  },

  title: {
    color: "#e2e8f0",
    fontSize: "34px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: "30px"
  },

  uploadArea: {
    padding: "42px",
    borderRadius: "24px",
    textAlign: "center",
    background:
      "rgba(255,255,255,0.03)",
    transition: "0.3s"
  },

  uploadIcon: {
    fontSize: "70px",
    color: "#38bdf8",
    marginBottom: "18px"
  },

  uploadText: {
    color: "#e2e8f0",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px"
  },

  uploadSubtext: {
    color: "#94a3b8",
    marginBottom: "24px"
  },

  selectButton: {
    padding: "12px 24px",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg, #00c6ff, #0072ff)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    display: "inline-block"
  },

  fileCard: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginTop: "24px",
    padding: "18px",
    borderRadius: "18px",
    background:
      "rgba(255,255,255,0.04)"
  },

  pdfIcon: {
    fontSize: "40px",
    color: "#ef4444"
  },

  fileName: {
    color: "#e2e8f0"
  },

  fileType: {
    color: "#94a3b8",
    fontSize: "13px"
  },

  uploadButton: {
    width: "100%",
    padding: "15px",
    marginTop: "25px",
    border: "none",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg, #00c6ff, #0072ff)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer"
  },

  pdfButton: {
    width: "100%",
    padding: "15px",
    marginTop: "20px",
    border: "none",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer"
  },

  scoreCard: {
    marginTop: "30px",
    padding: "30px",
    borderRadius: "22px",
    background:
      "rgba(255,255,255,0.04)",
    textAlign: "center"
  },

  scoreTitle: {
    color: "#e2e8f0",
    marginBottom: "20px"
  },

  scoreCircle: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #00c6ff, #0072ff)",
    color: "#fff",
    fontSize: "28px",
    fontWeight: "700"
  },

  atsText: {
    marginTop: "20px",
    color: "#94a3b8"
  },

  atsStatus: {
    color: "#38bdf8",
    fontWeight: "700"
  },

  skillsCard: {
    marginTop: "30px",
    padding: "24px",
    borderRadius: "22px",
    background:
      "rgba(255,255,255,0.04)"
  },

  skillsTitle: {
    color: "#e2e8f0",
    marginBottom: "18px"
  },

  emptyText: {
    color: "#94a3b8"
  },

  skillsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px"
  },

  skillTag: {
    padding: "10px 14px",
    borderRadius: "12px",
    background:
      "rgba(34,197,94,0.15)",
    border:
      "1px solid rgba(34,197,94,0.3)",
    color: "#4ade80",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  missingTag: {
    padding: "10px 14px",
    borderRadius: "12px",
    background:
      "rgba(239,68,68,0.12)",
    border:
      "1px solid rgba(239,68,68,0.3)",
    color: "#f87171",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  feedbackCard: {
    marginTop: "30px",
    padding: "24px",
    borderRadius: "22px",
    background:
      "rgba(255,255,255,0.04)"
  },

  feedbackText: {
    color: "#cbd5e1",
    marginBottom: "12px",
    lineHeight: "1.7"
  }
};

export default Upload;