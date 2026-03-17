const API_URL = "http://localhost:3000"; // Replace this with your production backend URL after deployment

// --- Tab Switching Logic ---
const studentTab = document.getElementById('tab-student');
const teacherTab = document.getElementById('tab-teacher');
const studentView = document.getElementById('student-view');
const teacherLoginView = document.getElementById('teacher-login-view');
const teacherDashView = document.getElementById('teacher-dash-view');

let isLoggedIn = false;
let userHasVoted = false;

studentTab.onclick = () => {
    studentTab.classList.add('active');
    teacherTab.classList.remove('active');
    studentView.classList.add('active');
    teacherLoginView.classList.remove('active');
    teacherDashView.classList.remove('active');
};

teacherTab.onclick = () => {
    teacherTab.classList.add('active');
    studentTab.classList.remove('active');
    studentView.classList.remove('active');
    if (isLoggedIn) {
        teacherDashView.classList.add('active');
    } else {
        teacherLoginView.classList.add('active');
    }
};

// --- Student Logic ---
document.getElementById('join-btn').onclick = async () => {
    const code = document.getElementById('session-code').value;
    try {
        const res = await fetch(`${API_URL}/join-session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: Number(code) })
        });
        if (res.ok) {
            document.getElementById('join-view').classList.add('hidden');
            document.getElementById('vote-view').classList.remove('hidden');
            fetchPoll();
            setInterval(fetchPoll, 3000); // Faster refresh for live feedback
        } else {
            alert("Invalid Code");
        }
    } catch (e) { alert("Server Offline"); }
};

async function fetchPoll() {
    try {
        const res = await fetch(`${API_URL}/current-poll`);
        const data = await res.json();
        const questionText = document.getElementById('question');
        const resultsBox = document.getElementById('student-results');
        const pollControls = document.getElementById('poll-controls');

        if (data.poll) {
            questionText.innerText = data.poll.question;
            
            // If user has voted or we want to show live results
            if (userHasVoted) {
                pollControls.classList.add('hidden');
                resultsBox.classList.remove('hidden');
                
                // Fetch latest results for student view
                const resResults = await fetch(`${API_URL}/results`);
                const dataResults = await resResults.json();
                if (dataResults.poll) {
                    document.getElementById('s-res-yes').innerText = dataResults.poll.yes;
                    document.getElementById('s-res-no').innerText = dataResults.poll.no;
                }
            } else {
                pollControls.classList.remove('hidden');
                resultsBox.classList.add('hidden');
            }
        } else {
            questionText.innerText = "No active poll at the moment.";
            pollControls.classList.add('hidden');
            resultsBox.classList.add('hidden');
            userHasVoted = false; // Reset for next poll
        }
    } catch (e) {}
}

document.getElementById('vote-yes').onclick = () => castVote("yes");
document.getElementById('vote-no').onclick = () => castVote("no");

// Student manual refresh
document.getElementById('s-refresh-btn').onclick = () => fetchPoll();

async function castVote(vote) {
    const voterId = "ext-" + Math.random().toString(36).substring(2, 8);
    try {
        const res = await fetch(`${API_URL}/vote`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ vote, voterId })
        });
        if (res.ok) {
            userHasVoted = true;
            fetchPoll(); // Refresh to show results immediately
        }
    } catch (e) {}
}

// --- Teacher Logic ---

document.getElementById('login-btn').onclick = async () => {
    const email = document.getElementById('teacher-email').value;
    const password = document.getElementById('teacher-password').value;
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        if (res.ok) {
            isLoggedIn = true;
            teacherLoginView.classList.remove('active');
            teacherDashView.classList.add('active');
        } else { alert("Login Failed"); }
    } catch (e) { alert("Server Error"); }
};

document.getElementById('gen-code-btn').onclick = async () => {
    const res = await fetch(`${API_URL}/generate-code`, { method: "POST" });
    const data = await res.json();
    document.getElementById('session-code-display').innerText = data.code;
};

document.getElementById('deploy-poll-btn').onclick = async () => {
    const question = document.getElementById('poll-question').value;
    if(!question) return;
    const res = await fetch(`${API_URL}/create-poll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
    });
    if (res.ok) {
        alert("Poll Deployed!");
        document.getElementById('poll-question').value = "";
    }
};

document.getElementById('refresh-res-btn').onclick = async () => {
    const res = await fetch(`${API_URL}/results`);
    const data = await res.json();
    if (data.poll) {
        document.getElementById('res-yes').innerText = data.poll.yes;
        document.getElementById('res-no').innerText = data.poll.no;
    }
};

document.getElementById('terminate-poll-btn').onclick = async () => {
    if(!confirm("Are you sure you want to terminate the current poll?")) return;
    try {
        const res = await fetch(`${API_URL}/close-poll`, { method: "POST" });
        if (res.ok) {
            alert("Poll Terminated.");
            document.getElementById('res-yes').innerText = "0";
            document.getElementById('res-no').innerText = "0";
        }
    } catch (e) { alert("Error terminating poll"); }
};
