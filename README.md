# Class-Pulse 🚀

A high-performance, real-time classroom polling system designed for instant student-teacher feedback.

### [Live Production Site](https://classpulse-dev.netlify.app/)

---

## 🛠 Technology Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Deployment**: Netlify (Frontend), Render (Backend)
- **Extension**: Manifest V3 Chrome Extension

---

## ✨ Features

### 👨‍🏫 Teacher Terminal
- **Secure Access**: Dedicated teacher authentication protocol (`teacher@gmail.com` / `1234`).
- **Session Control**: Generate unique access ports for classrooms.
- **Live Polling**: Create and deploy polls instantly.
- **Data Matrix**: View real-time affirmative/negative voting percentages.
- **Kill Switch**: Terminate poll streams with a single click.

### 🎓 Student Terminal
- **Frictionless Entry**: Join sessions using only an access code.
- **Responsive UI**: Optimized for both mobile and desktop views.
- **Live Voting**: Instant YES/NO transmission.
- **ID Persistence**: Browser-based voter ID to prevent duplicate voting.

### 🧩 Chrome Extension
- Access teacher and student features directly from your browser toolbar.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Ammar-Meman/classpulse.git
cd class-pulse
```

### 2. Backend Setup
Navigate to the `classpulse-backend` folder and run the server.
```bash
cd classpulse-backend
npm install
node server.js
```
The backend will run on `http://localhost:3000` (Production: `class-pulse-y0io.onrender.com`)

### 3. Frontend Setup
Navigate to the `classpulse-frontend` folder.
```bash
cd classpulse-frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`

---

## 📁 Project Structure

```
class-pulse
│
├── classpulse-backend
│   └── server.js
│
├── classpulse-frontend
│   └── src
│       ├── components
│       │   ├── JoinSession.jsx
│       │   ├── VotePage.jsx
│       │   ├── TeacherLogin.jsx
│       │   └── TeacherDashboard.jsx
│
└── classpulse-extension (Chrome Extension)
```

---

## 🔑 API Reference

### Authentication
- `POST /login` – Teacher login authentication.

### Session Management
- `POST /generate-code` – Generate a new session code.
- `POST /join-session` – Validate student session entry.

### Poll Operations
- `POST /create-poll` – Deploy a new question.
- `GET /current-poll` – Synchronize active poll state.
- `POST /vote` – Submit a YES/NO vote.
- `GET /results` – Retrieve real-time metrics.
- `POST /close-poll` – Terminate current polling session.

---

## 👤 Author

**Ammar Meman**
[GitHub Profile](https://github.com/Ammar-Meman)


---

# Key Concepts Used

* REST APIs
* React state management
* LocalStorage for voter identification
* Session-based classroom access
* Duplicate vote prevention
* Poll lifecycle management

---

# Future Improvements

* Real-time poll result updates
* Multiple poll types (MCQ, rating)
* Poll history
* Database integration
* Authentication with tokens

---

# Author

**Ammar Meman**
ClassPulse Project
