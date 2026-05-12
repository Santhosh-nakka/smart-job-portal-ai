import { useContext } from "react";

import { SkillsContext } from "../context/SkillsContext";

function Jobs() {

  const { skills } = useContext(SkillsContext);

  // ALL JOBS
  const allJobs = [

  {
    title: "Frontend Developer",
    company: "Google",
    skills: ["react", "javascript", "css"]
  },

  {
    title: "Backend Developer",
    company: "Amazon",
    skills: ["java", "spring", "sql"]
  },

  {
    title: "Full Stack Developer",
    company: "Microsoft",
    skills: ["react", "node", "mongodb"]
  },

  {
    title: "Machine Learning Engineer",
    company: "OpenAI",
    skills: ["python", "machine learning", "tensorflow"]
  },

  {
    title: "MERN Stack Developer",
    company: "Netflix",
    skills: ["mongodb", "express", "react", "node"]
  },

  {
    title: "Cloud Engineer",
    company: "IBM",
    skills: ["aws", "docker", "kubernetes"]
  },

  {
    title: "DevOps Engineer",
    company: "Accenture",
    skills: ["docker", "jenkins", "linux"]
  },

  {
    title: "Data Scientist",
    company: "TCS",
    skills: ["python", "pandas", "numpy"]
  },

  {
    title: "Java Developer",
    company: "Oracle",
    skills: ["java", "spring boot", "mysql"]
  },

  {
    title: "Python Developer",
    company: "Infosys",
    skills: ["python", "flask", "sql"]
  },

  {
    title: "AI Engineer",
    company: "NVIDIA",
    skills: ["python", "deep learning", "tensorflow"]
  },

  {
    title: "Software Engineer",
    company: "Wipro",
    skills: ["c++", "git", "sql"]
  },

  {
    title: "UI/UX Designer",
    company: "Adobe",
    skills: ["figma", "css", "html"]
  },

  {
    title: "Android Developer",
    company: "Samsung",
    skills: ["java", "kotlin", "android"]
  },

  {
    title: "iOS Developer",
    company: "Apple",
    skills: ["swift", "ios", "xcode"]
  },

  {
    title: "Cyber Security Analyst",
    company: "Cisco",
    skills: ["linux", "networking", "security"]
  },

  {
    title: "Blockchain Developer",
    company: "Coinbase",
    skills: ["solidity", "javascript", "web3"]
  },

  {
    title: "Data Analyst",
    company: "Deloitte",
    skills: ["sql", "excel", "power bi"]
  },

  {
    title: "Game Developer",
    company: "Ubisoft",
    skills: ["c++", "unity", "unreal"]
  },

  {
    title: "Site Reliability Engineer",
    company: "Meta",
    skills: ["linux", "docker", "kubernetes"]
  },

  {
    title: "QA Engineer",
    company: "Capgemini",
    skills: ["testing", "selenium", "java"]
  },

  {
    title: "React Developer",
    company: "PayPal",
    skills: ["react", "javascript", "redux"]
  },

  {
    title: "Node.js Developer",
    company: "Spotify",
    skills: ["node", "express", "mongodb"]
  },

  {
    title: "Database Administrator",
    company: "SAP",
    skills: ["mysql", "postgresql", "oracle"]
  },

  {
    title: "Big Data Engineer",
    company: "Cloudera",
    skills: ["hadoop", "spark", "python"]
  },

  {
    title: "Business Intelligence Analyst",
    company: "EY",
    skills: ["power bi", "sql", "excel"]
  },

  {
    title: "Embedded Systems Engineer",
    company: "Intel",
    skills: ["c", "c++", "linux"]
  },

  {
    title: "AR/VR Developer",
    company: "Unity",
    skills: ["unity", "c#", "3d"]
  },

  {
    title: "Network Engineer",
    company: "Juniper Networks",
    skills: ["networking", "linux", "security"]
  },

  {
    title: "Automation Engineer",
    company: "Bosch",
    skills: ["python", "selenium", "testing"]
  },

  {
    title: "Technical Support Engineer",
    company: "HP",
    skills: ["linux", "troubleshooting", "networking"]
  },

  {
    title: "PHP Developer",
    company: "Zoho",
    skills: ["php", "mysql", "html"]
  },

  {
    title: "Spring Boot Developer",
    company: "Flipkart",
    skills: ["java", "spring boot", "microservices"]
  },

  {
    title: "Kubernetes Engineer",
    company: "Red Hat",
    skills: ["docker", "kubernetes", "linux"]
  },

  {
    title: "Research Engineer",
    company: "DeepMind",
    skills: ["python", "deep learning", "pytorch"]
  }

];

  // MATCH %
  const getMatch = (jobSkills) => {

    if (!skills.length) return 0;

    const matchedSkills =
      jobSkills.filter(skill =>
        skills.includes(skill)
      );

    return Math.round(
      (matchedSkills.length /
        jobSkills.length) * 100
    );
  };

  // ADD MATCH %
  const jobsWithMatch =
    allJobs.map(job => ({
      ...job,
      match: getMatch(job.skills)
    }));

  // FILTER ONLY RELEVANT JOBS
  const filteredJobs =
    jobsWithMatch
      .filter(job => job.match > 0)
      .sort((a, b) => b.match - a.match);

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>
        AI Job Recommendations
      </h1>

      {/* NO SKILLS */}
      {skills.length === 0 && (

        <div style={styles.emptyCard}>

          <h2 style={styles.emptyTitle}>
            No Resume Uploaded
          </h2>

          <p style={styles.emptyText}>
            Upload your resume to get
            AI-powered job matches.
          </p>

        </div>
      )}

      {/* NO MATCH */}
      {skills.length > 0 &&
        filteredJobs.length === 0 && (

        <div style={styles.emptyCard}>

          <h2 style={styles.emptyTitle}>
            No Matching Jobs
          </h2>

          <p style={styles.emptyText}>
            Try uploading a resume with
            more technical skills.
          </p>

        </div>
      )}

      {/* JOBS */}
      <div style={styles.jobContainer}>

        {filteredJobs.map((job, index) => (

          <div
            key={index}
            style={styles.card}
          >

            {/* TOP */}
            <div style={styles.topSection}>

              <div>

                <h2 style={styles.jobTitle}>
                  {job.title}
                </h2>

                <p style={styles.company}>
                  {job.company}
                </p>

              </div>

              {/* MATCH */}
              <div style={styles.matchCircle}>
                {job.match}%
              </div>

            </div>

            {/* SKILLS */}
            <div style={styles.skillWrap}>

              {job.skills.map((skill, i) => (

                <span
                  key={i}
                  style={{
                    ...styles.skillTag,

                    background:
                      skills.includes(skill)
                        ? "rgba(34,197,94,0.15)"
                        : "rgba(0,198,255,0.12)",

                    border:
                      skills.includes(skill)
                        ? "1px solid rgba(34,197,94,0.35)"
                        : "1px solid rgba(0,198,255,0.25)",

                    color:
                      skills.includes(skill)
                        ? "#4ade80"
                        : "#38bdf8"
                  }}
                >

                  {skill}

                </span>

              ))}

            </div>

            {/* TEXT */}
            <p style={styles.matchText}>
              AI Match Score
            </p>

            {/* PROGRESS */}
            <div style={styles.progressBar}>

              <div
                style={{
                  ...styles.progressFill,
                  width: `${job.match}%`
                }}
              />

            </div>

            {/* BUTTON */}
            <button style={styles.button}>
              Apply Now
            </button>

          </div>
        ))}

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

  title: {

    color: "#e2e8f0",

    marginBottom: "35px",

    fontWeight: "700",

    fontSize: "34px",

    textShadow:
      "0 0 12px rgba(0,198,255,0.35)"
  },

  /* EMPTY CARD */
  emptyCard: {

    padding: "30px",

    borderRadius: "22px",

    background:
      "rgba(15,23,42,0.65)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    marginBottom: "30px",

    textAlign: "center"
  },

  emptyTitle: {
    color: "#e2e8f0",
    marginBottom: "12px"
  },

  emptyText: {
    color: "#94a3b8"
  },

  jobContainer: {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap"
  },

  /* CARD */
  card: {

    width: "320px",

    padding: "24px",

    borderRadius: "22px",

    background:
      "rgba(15,23,42,0.65)",

    backdropFilter: "blur(16px)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    boxShadow:
      "0 0 30px rgba(0,198,255,0.12)",

    color: "#fff"
  },

  topSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  jobTitle: {
    marginBottom: "6px",
    fontSize: "22px",
    color: "#e2e8f0"
  },

  company: {
    color: "#94a3b8",
    fontSize: "14px"
  },

  /* MATCH CIRCLE */
  matchCircle: {

    width: "70px",
    height: "70px",

    borderRadius: "50%",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    background:
      "linear-gradient(135deg, #00c6ff, #0072ff)",

    color: "#fff",

    fontWeight: "700",

    boxShadow:
      "0 0 20px rgba(0,198,255,0.4)"
  },

  /* SKILLS */
  skillWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "18px"
  },

  skillTag: {

    padding: "8px 12px",

    borderRadius: "10px",

    fontSize: "13px",

    fontWeight: "500"
  },

  matchText: {
    marginBottom: "10px",
    color: "#cbd5e1",
    fontSize: "14px"
  },

  /* PROGRESS */
  progressBar: {

    height: "10px",

    width: "100%",

    background:
      "rgba(255,255,255,0.08)",

    borderRadius: "20px",

    overflow: "hidden",

    marginBottom: "20px"
  },

  progressFill: {

    height: "100%",

    background:
      "linear-gradient(90deg, #00c6ff, #0072ff)",

    borderRadius: "20px",

    boxShadow:
      "0 0 12px rgba(0,198,255,0.35)"
  },

  /* BUTTON */
  button: {

    width: "100%",

    padding: "14px",

    border: "none",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg, #00c6ff, #0072ff)",

    color: "#fff",

    fontWeight: "700",

    fontSize: "15px",

    cursor: "pointer",

    boxShadow:
      "0 0 18px rgba(0,198,255,0.35)"
  }
};

export default Jobs;