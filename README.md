# ClassPulse

A real-time classroom polling system that allows teachers to quickly check whether students understand a topic during lectures.

ClassPulse enables teachers to create polls and share a session code with students. Students join the session using the code and vote instantly, allowing teachers to view the results and adjust their teaching accordingly.

---

# Features

## Teacher

* Teacher login
* Generate classroom session code
* Create poll questions
* View poll results (YES / NO counts)
* Close poll to stop further voting

## Students

* Join classroom using session code
* View active poll question
* Vote **YES** or **NO**
* Duplicate vote prevention using voterId
* Voting disabled after submission

---

# How to Run the Project

### 1. Clone the repository

```bash
git clone <repository-url>
cd classpulse
```

---

### 2. Start the Backend

Navigate to the backend folder and run the server.

```bash
cd backend
npm install
node server.js
```

The backend will run on:

```
http://localhost:3000
```

---

### 3. Start the Frontend

Open a new terminal and navigate to the frontend folder.

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

---

# How to Use ClassPulse

## Teacher Flow

1. Open:

```
http://localhost:5173/teacher-login
```

2. Login using:

```
Email: teacher@gmail.com
Password: 1234
```

3. Generate a **Session Code**

4. Share the session code with students

5. Create a poll question

Example:

```
Did you understand React?
```

6. Students vote

7. Click **Refresh Results** to view votes

8. Click **Close Poll** when finished

---

## Student Flow

1. Open:

```
http://localhost:5173
```

2. Enter the **session code** provided by the teacher

3. Join the classroom

4. View the poll question

5. Vote **YES** or **NO**

---

# API Endpoints

## Authentication

`POST /login` – Teacher login

## Session

`POST /generate-code` – Generate session code
`POST /join-session` – Student joins session

## Poll Management

`POST /create-poll` – Create a new poll
`GET /current-poll` – Fetch active poll
`POST /vote` – Submit a vote
`POST /close-poll` – Close poll
`GET /results` – Get poll results

---

# Project Structure

```
classpulse
│
├── backend
│   └── server.js
│
└── frontend
    └── src
        ├── components
        │   ├── JoinSession.jsx
        │   ├── VotePage.jsx
        │   ├── TeacherLogin.jsx
        │   └── TeacherDashboard.jsx
```

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
