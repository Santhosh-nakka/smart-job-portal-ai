from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber

app = Flask(__name__)

CORS(app)

# =========================================
# 🔥 SKILLS DATABASE
# =========================================
SKILLS_DB = [

    # PROGRAMMING
    "java", "python", "c", "c++", "c#", "go",
    "ruby", "php", "swift", "kotlin",
    "typescript", "javascript", "rust",
    "scala", "perl", "r",

    # WEB
    "html", "css", "sass", "bootstrap",
    "tailwind", "material ui",

    # FRONTEND
    "react", "redux", "next.js", "vue",
    "angular", "vite",

    # BACKEND
    "node", "express", "django", "flask",
    "spring", "spring boot", "laravel",
    "fastapi", "hibernate",

    # DATABASE
    "sql", "mysql", "postgresql",
    "mongodb", "oracle", "sqlite",
    "firebase", "redis", "cassandra",

    # DEVOPS
    "docker", "kubernetes", "jenkins",
    "terraform", "ansible", "github actions",

    # CLOUD
    "aws", "azure", "gcp", "heroku",
    "netlify", "vercel",

    # AI / ML
    "machine learning", "deep learning",
    "artificial intelligence",
    "data science", "nlp",
    "computer vision",

    # AI LIBRARIES
    "tensorflow", "keras",
    "pytorch", "scikit-learn",
    "opencv", "xgboost",

    # DATA ANALYTICS
    "pandas", "numpy", "matplotlib",
    "seaborn", "plotly", "power bi",
    "tableau", "excel",

    # BIG DATA
    "hadoop", "spark", "hive",

    # VERSION CONTROL
    "git", "github", "gitlab",
    "bitbucket",

    # OPERATING SYSTEMS
    "linux", "ubuntu", "windows",

    # APIs
    "rest api", "graphql",
    "microservices",

    # MOBILE
    "android", "ios", "react native",
    "flutter", "xcode",

    # TESTING
    "selenium", "jest",
    "pytest", "junit",

    # CYBERSECURITY
    "networking", "cyber security",
    "penetration testing",
    "ethical hacking",

    # BLOCKCHAIN
    "blockchain", "solidity", "web3",

    # GAME DEV
    "unity", "unreal engine",

    # DESIGN
    "figma", "photoshop",
    "illustrator", "ui/ux",

    # OTHER
    "agile", "scrum",
    "problem solving",
    "data structures",
    "algorithms",

    # EXTRA TECH
    "chatgpt", "openai",
    "langchain", "llm",
    "generative ai"
]

# =========================================
# 🔥 IMPORTANT SKILLS
# =========================================
IMPORTANT_SKILLS = [

    "python",
    "java",
    "react",
    "node",
    "sql",
    "mongodb",
    "aws",
    "docker",
    "machine learning"
]

# =========================================
# ✅ HOME
# =========================================
@app.route("/")
def home():

    return "AI Resume Analyzer Backend Running 🚀"

# =========================================
# ✅ RESUME PARSER + AI ANALYSIS
# =========================================
@app.route("/parse", methods=["POST"])
def parse_resume():

    if "file" not in request.files:

        return jsonify({
            "error": "No file uploaded"
        }), 400

    file = request.files["file"]

    text = ""

    # =====================================
    # READ PDF
    # =====================================
    if file.filename.endswith(".pdf"):

        with pdfplumber.open(file) as pdf:

            for page in pdf.pages:

                text += (
                    page.extract_text() or ""
                )

    text = text.lower()

    # =====================================
    # 🔥 SKILL DETECTION
    # =====================================
    found_skills = list(set([

        skill for skill in SKILLS_DB

        if skill in text

    ]))

    # =====================================
    # 🔥 REALISTIC RESUME SCORE
    # =====================================
    score = 15

    # SKILL SCORE
    score += min(
        len(found_skills) * 1.2,
        30
    )

    # PROJECTS
    if "project" in text:
        score += 10

    # EXPERIENCE
    if "experience" in text:
        score += 10

    # EDUCATION
    if "education" in text:
        score += 5

    # CERTIFICATIONS
    if (
        "certificate" in text or
        "certification" in text
    ):
        score += 5

    # ACHIEVEMENTS
    if (
        "achievement" in text or
        "award" in text
    ):
        score += 5

    # LIMIT SCORE
    score = min(score, 95)

    # =====================================
    # 🔥 ATS STATUS
    # =====================================
    if score >= 80:

        ats_status = "Excellent"

    elif score >= 60:

        ats_status = "Good"

    elif score >= 40:

        ats_status = "Average"

    else:

        ats_status = "Poor"

    # =====================================
    # 🔥 MISSING SKILLS
    # =====================================
    missing_skills = [

        skill for skill
        in IMPORTANT_SKILLS

        if skill not in found_skills
    ]

    # =====================================
    # 🔥 AI FEEDBACK
    # =====================================
    feedback = []

    if score >= 80:

        feedback.append(
            "Strong technical resume."
        )

        feedback.append(
            "Excellent ATS compatibility."
        )

    elif score >= 60:

        feedback.append(
            "Good resume with decent skills."
        )

        feedback.append(
            "Add more cloud and DevOps skills."
        )

    else:

        feedback.append(
            "Resume needs improvement."
        )

        feedback.append(
            "Add more technical projects."
        )

    # =====================================
    # ✅ RESPONSE
    # =====================================
    return jsonify({

        "skills": found_skills,

        "resume_score": score,

        "ats_status": ats_status,

        "missing_skills": missing_skills,

        "feedback": feedback
    })

# =========================================
# 🚀 RUN SERVER
# =========================================
if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5050,
        debug=True
    )