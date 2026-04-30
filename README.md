# 🧠 ResumeAI — AI-Powered Resume Analyzer

> A full-stack SaaS application that analyzes resumes using **Google Gemini AI**, provides **ATS scoring**, and performs **skill gap analysis** against job descriptions.

![ResumeAI Banner](https://img.shields.io/badge/ResumeAI-AI%20Powered-6366f1?style=for-the-badge&logo=google&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini-2.0%20Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)

---

## 📸 Features

| Feature | Description |
|---|---|
| 🧠 **AI Resume Analysis** | Gemini AI extracts skills, strengths, weaknesses, and suggestions |
| 📊 **ATS Score Dashboard** | Keyword matching, experience, formatting score with charts |
| 🎯 **Skill Gap Analysis** | Compare resume vs job description with match percentage |
| 📄 **File Parsing** | Supports PDF, DOC, DOCX via Apache Tika |
| 🎨 **Modern UI** | SaaS-like design with Tailwind CSS, Recharts, animations |
| 🔒 **Secure** | API keys in config, file size validation, CORS protection |

---

## 🏗️ Project Structure

```
Ai resume analyzer/
├── resumeanalyzer/          # Spring Boot Backend
│   └── src/main/java/com/resumeanalyzer/resumeanalyzer/
│       ├── controller/
│       │   └── ResumeController.java       # REST API endpoints
│       ├── service/
│       │   ├── FileParserService.java       # Apache Tika file parsing
│       │   ├── OpenAIService.java           # Gemini AI integration
│       │   └── ResumeAnalysisService.java   # Core analysis logic
│       ├── dto/
│       │   ├── AnalysisResponse.java
│       │   ├── ATSScoreResponse.java
│       │   ├── SkillGapRequest.java
│       │   └── SkillGapResponse.java
│       ├── config/
│       │   └── AppConfig.java              # CORS + WebClient config
│       └── exception/
│           └── GlobalExceptionHandler.java  # Error handling
│
└── Resumefrontend/          # React + Vite Frontend
    └── src/
        ├── api/
        │   └── resumeApi.ts                # Axios API calls
        ├── components/
        │   ├── Navbar.tsx
        │   ├── Hero.tsx
        │   ├── Features.tsx
        │   ├── HowItWorks.tsx
        │   ├── Analyzer.tsx                # Upload + analyze section
        │   ├── ResultsPage.tsx             # Full results dashboard
        │   ├── AnalysisResult.tsx          # AI analysis tab
        │   ├── ATSDashboard.tsx            # ATS score tab
        │   ├── SkillGap.tsx               # Skill gap tab
        │   ├── FileUpload.tsx             # Drag & drop uploader
        │   └── Footer.tsx
        ├── types/
        │   └── index.ts                   # TypeScript interfaces
        └── App.tsx                        # Page-level navigation
```

---

## ⚙️ How It Works

### 1. Resume Upload
- User drags & drops or selects a **PDF / DOC / DOCX** file
- Frontend sends file to `POST /api/resume/upload`
- Backend uses **Apache Tika** to extract raw text from the file
- Extracted text is returned to the frontend

### 2. AI Analysis (`POST /api/resume/analyze`)
- Resume text is sent to **Google Gemini 2.0 Flash**
- Gemini returns structured JSON with:
  - `skills[]` — detected technical and soft skills
  - `strengths[]` — positive highlights
  - `weaknesses[]` — areas needing improvement
  - `suggestions[]` — actionable improvement tips

### 3. ATS Scoring (`POST /api/resume/score`)
- **No AI used** — pure rule-based scoring (like real ATS systems)
- Checks resume text against **31 industry keywords**
- Calculates 4 sub-scores:

| Sub-Score | How It's Calculated |
|---|---|
| **Keywords** | `(found keywords / 31) × 100` |
| **Skills** | `found keywords × 4` (capped at 100) |
| **Experience** | Checks for "years of experience", "senior", "bachelor", etc. |
| **Formatting** | Checks for email `@`, length > 500 chars, section headers |
| **Overall** | Average of all 4 scores |

### 4. Skill Gap Analysis (`POST /api/resume/skill-gap`)
- User pastes a **job description**
- Both resume text + job description sent to **Gemini AI**
- Gemini returns:
  - `matchingSkills[]` — skills present in both
  - `missingSkills[]` — skills in job description but not resume
  - `matchPercentage` — overall match score
  - `suggestions[]` — how to bridge the gap
  - `summary` — plain English summary

### 5. Results Page
- After analysis, app navigates to a **dedicated results page**
- Three tabs: AI Analysis | ATS Score | Skill Gap
- Summary cards show: ATS Score, Skills Found, Keywords Matched, Improvements

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Download |
|---|---|---|
| Java JDK | 17+ | [adoptium.net](https://adoptium.net) |
| Maven | 3.8+ | Bundled with project (`mvnw`) |
| Node.js | 20.19+ or 22+ | [nodejs.org](https://nodejs.org) |
| npm | 9+ | Comes with Node.js |
| Gemini API Key | Free | [aistudio.google.com](https://aistudio.google.com) |

---

### 🔑 Step 1 — Get a Gemini API Key

1. Go to [https://aistudio.google.com](https://aistudio.google.com)
2. Sign in with your Google account
3. Click **Get API Key** → **Create API key**
4. Copy the key (starts with `AIzaSy...`)

---

### 🖥️ Step 2 — Run the Backend

```bash
# Navigate to backend folder
cd resumeanalyzer

# Add your Gemini API key in src/main/resources/application.yaml
# Find this line and replace with your key:
# key: YOUR_GEMINI_API_KEY_HERE

# Run the Spring Boot application
./mvnw spring-boot:run          # Mac / Linux
mvnw.cmd spring-boot:run        # Windows
```

Backend starts at: **http://localhost:8080**

#### Backend application.yaml configuration

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB

server:
  port: 8080

gemini:
  api:
    key: YOUR_GEMINI_API_KEY_HERE
    url: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
    mock: false       # Set to true to use mock responses (no API key needed)
```

> 💡 Set `mock: true` if you don't have a Gemini API key yet — the app will return realistic demo data.

---

### 🌐 Step 3 — Run the Frontend

```bash
# Navigate to frontend folder
cd Resumefrontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend starts at: **http://localhost:5173**

> The Vite dev server automatically proxies `/api/*` requests to `http://localhost:8080` — no CORS issues.

---

### ✅ Step 4 — Use the App

1. Open **http://localhost:5173** in your browser
2. Click **"Analyze My Resume — Free"** or scroll to the upload section
3. Drag & drop your resume (PDF / DOC / DOCX)
4. Click **"Generate Full Report"**
5. View results across 3 tabs:
   - **AI Analysis** — Skills, Strengths, Weaknesses, Suggestions
   - **ATS Score** — Score breakdown with charts
   - **Skill Gap** — Paste a job description to compare

---

## 🔌 API Endpoints

Base URL: `http://localhost:8080/api/resume`

| Method | Endpoint | Description | Body |
|---|---|---|---|
| `POST` | `/upload` | Upload resume file | `multipart/form-data` with `file` |
| `POST` | `/analyze` | AI analysis of resume | `{ "resumeText": "..." }` |
| `POST` | `/score` | ATS score calculation | `{ "resumeText": "..." }` |
| `POST` | `/skill-gap` | Skill gap vs job description | `{ "resumeText": "...", "jobDescription": "..." }` |

### Example Response — `/analyze`

```json
{
  "skills": ["Java", "Spring Boot", "REST APIs", "SQL", "Docker"],
  "strengths": [
    "Strong backend development experience",
    "Good understanding of RESTful API design"
  ],
  "weaknesses": [
    "Limited cloud platform experience",
    "No CI/CD pipeline mentioned"
  ],
  "suggestions": [
    "Add measurable achievements (e.g. reduced load time by 30%)",
    "Include AWS or Azure certifications"
  ],
  "rawText": "..."
}
```

### Example Response — `/score`

```json
{
  "overallScore": 59,
  "skillScore": 40,
  "keywordScore": 32,
  "experienceScore": 65,
  "formattingScore": 100,
  "scoreLabel": "AVERAGE",
  "foundKeywords": ["java", "spring", "sql", "git", "react"],
  "missingKeywords": ["aws", "docker", "kubernetes", "ci/cd"],
  "skillsBreakdown": {
    "Keywords": 32,
    "Skills": 40,
    "Experience": 65,
    "Formatting": 100
  }
}
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Spring Boot 3.2.5 | REST API framework |
| Apache Tika 2.9.1 | PDF/DOC text extraction |
| Spring WebFlux | HTTP client for Gemini API calls |
| Lombok | Boilerplate reduction |
| Java 17 | Language version |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite 5 | UI framework + build tool |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Recharts | Charts (ATS score, skill gap pie) |
| Axios | HTTP requests to backend |
| react-dropzone | Drag & drop file upload |
| lucide-react | Icons |

---

## 🔒 Security Notes

- ✅ API key stored in `application.yaml` (add to `.gitignore` before pushing)
- ✅ File type validation via Apache Tika MIME detection
- ✅ File size limited to 10MB
- ✅ CORS restricted to `localhost:5173` and `localhost:3000`
- ✅ Global exception handler prevents stack trace leaks
- ⚠️ For production: move API key to environment variable

```bash
# Set as environment variable instead of hardcoding
export OPENAI_API_KEY=your_gemini_key_here   # Mac/Linux
set OPENAI_API_KEY=your_gemini_key_here      # Windows
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---|---|
| `429 Too Many Requests` | Gemini free tier rate limit hit. Wait 1 minute or set `mock: true` |
| `404 model not found` | Wrong model name. Use `gemini-2.0-flash` in application.yaml |
| `Failed to upload file` | Check backend is running on port 8080 |
| `crypto.hash is not a function` | Node.js version too old. Upgrade to 20.19+ or 22+ |
| `CORS error` | Make sure backend is running before frontend |
| Port 8080 already in use | Change `server.port` in application.yaml |

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 🙌 Built With

- [Google Gemini AI](https://aistudio.google.com) — AI analysis engine
- [Spring Boot](https://spring.io/projects/spring-boot) — Backend framework
- [Apache Tika](https://tika.apache.org) — Document parsing
- [React](https://react.dev) — Frontend framework
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Recharts](https://recharts.org) — Data visualization

---

<div align="center">
  <strong>⭐ Star this repo if you found it helpful!</strong><br/>
  Built with ❤️ using Gemini AI + Spring Boot + React
</div>
