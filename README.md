
# HIFAZAT — Your Space, Our Safety 🛡️

**A multilingual AI safety guide helping girls navigate cyber harassment, online blackmail, and digital abuse.**

🌐 **Live Demo:** [Try HIFAZAT](https://hifazat-ai-safety-guide-for-girls-1061841032678.asia-southeast1.run.app)  
💻 **GitHub Repository:** [HIFAZAT Source Code](https://github.com/InshrahSaeed/hec_proj)

---

## 📌 1. Problem Statement

Online harassment, cyber blackmail, threats, and digital abuse can leave girls feeling unsafe, confused, and unsure about what to do next.

Victims may not know how to preserve digital evidence, protect their online accounts, draft a complaint, or find appropriate support. Language barriers and fear of judgment can make seeking help even more difficult.

**The challenge:** Making practical, understandable, and accessible digital safety guidance available when it is needed most.

## 💡 2. Our Solution

HIFAZAT is a multilingual, AI-powered digital safety guide designed to help girls understand their options and take informed next steps when facing online harassment or cyber threats.

The platform provides supportive guidance in **English, Urdu, and Roman Urdu**, helping users understand digital safety measures, learn how to preserve evidence, prepare complaint drafts, and explore relevant support resources.

Our goal is to make digital safety guidance more accessible, private, and actionable.

## ✨ 3. Key Features

- **🌍 Multilingual Assistance:** Get guidance in English, Urdu, and Roman Urdu.
- **🤖 AI-Powered Guidance:** Describe a digital safety concern and receive relevant, practical next steps.
- **🔐 Privacy-Conscious Access:** Designed to make help accessible without requiring users to create an account.
- **📁 Evidence Preservation Guidance:** Learn how to safely preserve relevant screenshots, messages, URLs, and other digital evidence.
- **📝 Complaint Drafting Assistance:** Generate a draft complaint that users can review and adapt to their situation.
- **🛡️ Digital Safety Recommendations:** Understand practical steps for account security, privacy, and online protection.
- **📞 Support Resources:** Find guidance on seeking appropriate help and reporting cybercrime.
- **💬 Accessible Interface:** A straightforward experience designed around sensitive digital safety concerns.

> HIFAZAT provides informational support, not emergency services, legal representation, or a guarantee of a particular outcome. Users should verify official reporting procedures and seek qualified help when needed.

## 🧠 4. AI Methodology

HIFAZAT integrates Google's Gemini AI through its application backend to support conversational assistance and AI-generated guidance.

### AI workflow

1. **User input:** The user describes a digital safety concern.
2. **Request processing:** The application sends the relevant request to its backend.
3. **AI assistance:** The backend uses the configured Gemini integration to generate a response.
4. **Actionable guidance:** The application presents relevant safety information and next steps.
5. **Additional assistance:** Dedicated backend routes support safety-plan generation and complaint-draft generation.

### AI capabilities

- Conversational digital safety guidance.
- Structured safety-plan generation.
- Complaint-draft assistance.
- Language-aware responses for a more accessible experience.

**AI model and API:** Google Gemini API, integrated through the `@google/genai` SDK.

The exact model identifier should be confirmed against the working server configuration and successful deployed API responses before submission.

**Responsible AI considerations:** AI-generated responses may be incomplete or inaccurate. Users should verify legal information and official reporting routes. Sensitive personal information should not be shared unnecessarily.

## 🛠️ 5. Technology Stack

| Component | Technology |
|---|---|
| Frontend | React |
| Build tool | Vite |
| Language | TypeScript |
| Backend | Node.js and Express |
| AI integration | Google Gemini API |
| AI SDK | `@google/genai` |
| Package management | npm |
| Deployment | Public live application |

## 🏗️ 6. Application Architecture

```text
User
  |
  v
HIFAZAT Frontend
  |
  v
Backend API
  |
  +---- /api/chat
  |
  +---- /api/generate-plan
  |
  +---- /api/generate-complaint
  |
  v
Google Gemini API
  |
  v
AI-generated guidance
  |
  v
Frontend response
```

The frontend communicates with the backend, which handles the application's AI-related requests. API credentials are configured on the server side rather than being placed directly in frontend source code.

## ⚙️ 7. Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

- Node.js and npm
- Git
- A Google Gemini API key
- A code editor such as Visual Studio Code

### Step 1: Clone the repository

```bash
git clone https://github.com/InshrahSaeed/hec_proj.git
cd hec_proj
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Configure environment variables

Create a local `.env` file using the provided `.env.example` as a reference.

Add your Gemini API key using the **exact environment variable name expected by the backend code**.

For example, if your server reads `GEMINI_API_KEY`, configure:

```env
GEMINI_API_KEY=your_actual_api_key
```

Replace the example value with your own API key. Never commit your actual `.env` file or expose API credentials in screenshots or public code.

### Step 4: Start the application

Check the available scripts in `package.json` and use the command configured for development. For example, if a `dev` script is present:

```bash
npm run dev
```

If the backend has a separate start script, run it as specified in `package.json` and the project configuration.

### Step 5: Open the application

Use the local URL displayed in your terminal. For Vite development servers, this is commonly:

```text
http://localhost:5173
```

The actual URL and port may differ depending on your configuration.

## 🔌 8. Backend API Endpoints

The project includes the following API routes:

| Endpoint | Purpose |
|---|---|
| `/api/health` | Backend health check |
| `/api/chat` | Conversational AI assistance |
| `/api/generate-plan` | Generate a digital safety plan |
| `/api/generate-complaint` | Generate a complaint draft |

These endpoints are intended to support the application's main digital safety workflows. Request formats and response structures are defined in the backend implementation.

## 🖼️ 9. Product Screenshots

Screenshots of the working application should be added here before final submission.

Recommended screenshots:

1. **Home Page** — HIFAZAT branding and main interface.
2. **AI Chatbot** — A sample digital safety conversation.
3. **Multilingual Support** — Language selection or a supported-language response.
4. **Safety Guidance** — An example of practical next steps.
5. **Complaint Drafting** — The complaint-generation interface or a sample draft.
6. **Support Resources** — The available help and reporting information.

Add screenshots to a repository folder such as `screenshots/` and reference them below after uploading the actual image files.

Example:

```markdown
![HIFAZAT Home Page](screenshots/homepage.png)
![HIFAZAT Chatbot](screenshots/chatbot.png)
![HIFAZAT Safety Guidance](screenshots/safety-guidance.png)
```

Replace these example paths with the exact filenames you upload.

## 👥 10. Team Contributions

**Team Name: Hifazat Squad**

| Team Member | Role | Contribution |
|---|---|---|
| Inshrah Saeed | Team Lead & Full Stack/AI Developer | Project direction, application development, and AI integration |
| Sadaf Iqbal | Frontend & UI Support | Frontend interface and user experience support |
| Iza Batool | Research & Content Support | Research, safety-related content, and guidance support |

## 🚀 11. Impact and Innovation

HIFAZAT focuses on making digital safety guidance more accessible to users who may otherwise struggle to understand their options or find appropriate help.

Its key differentiators are:

- Multilingual access for users with different language preferences.
- Practical guidance instead of awareness alone.
- AI-assisted safety planning and complaint drafting.
- A privacy-conscious approach to accessing sensitive support.
- A user-centered design focused on safety, accessibility, and informed decision-making.

HIFAZAT aims to contribute to a safer digital environment by helping users understand possible next steps and available support options.

## 🔮 12. Future Improvements

Potential improvements include:

- More extensive testing across English, Urdu, and Roman Urdu.
- Improved AI response evaluation and safety guardrails.
- Verified, regularly reviewed official support resources.
- Accessibility improvements and enhanced mobile usability.
- Clearer privacy controls and transparent data-handling documentation.
- Automated testing, monitoring, and backend reliability improvements.

## ⚠️ 13. Disclaimer

HIFAZAT is an AI-assisted informational tool. It does not replace emergency services, qualified legal advice, professional counseling, or official cybercrime reporting channels.

AI-generated information may contain errors. Users should independently verify legal requirements, official contact information, and reporting procedures before acting on the guidance provided.

## 📄 14. License

No open-source license has been specified in this repository. Unless a license is added, reuse and redistribution remain subject to applicable copyright law.

---

**HIFAZAT — Your Space, Our Safety.** 🛡️

*Building a safer digital future through accessible, multilingual AI assistance.*
