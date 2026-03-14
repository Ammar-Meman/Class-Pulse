const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let sessionCode = null;
let polls = [];
let activePoll = null;

app.get("/", (req, res) => {
  res.send("ClassPulse server running");
});

app.post("/login", (req, res) => {

  const { email, password } = req.body;

  if (email === "teacher@gmail.com" && password === "1234") {
    return res.json({
      message: "Login successful"
    });
  }

  res.status(401).json({
    message: "Invalid email or password"
  });

});

app.post("/generate-code", (req, res) => {

  sessionCode = Math.floor(1000 + Math.random() * 9000);

  res.json({
    message: "Session code generated",
    code: sessionCode
  });

});

app.post("/join-session", (req, res) => {

  const { code } = req.body;

  if (code == sessionCode) {
    return res.json({
      message: "Joined session successfully"
    });
  }

  res.status(400).json({
    message: "Invalid session code"
  });

});

app.post("/create-poll", (req, res) => {

  const { question } = req.body;

    if (!question) {
    return res.status(400).json({
      message: "Question is required"
    });
  }

  const poll = {
    id: polls.length + 1,
    question: question,
    yes: 0,
    no: 0,
    active: true,
    voters: []
  };

  
  polls.push(poll);
  
  activePoll = poll;   // this becomes the current poll

  res.json({
    message: "Poll created",
    poll: poll
  });

});

app.post("/vote", (req, res) => {

  console.log("Body received:", req.body);

  const { vote , voterId} = req.body;

  
  if (!activePoll) {
    return res.status(400).json({
      message: "No active poll"
    });
  }
  
  if (!activePoll.active) {
    return res.status(400).json({
      message: "Poll is closed"
    });
  }
  
  if (!voterId) {
    return res.status(400).json({
      message: "Voter ID required"
    });
  }
  
    if (activePoll.voters.includes(voterId)) {
      return res.status(400).json({
          message: "You already voted"
        });
      }
      
      // if (activePoll.voters.includes(voterId))
      //   activePoll.voters.push(voterId)
      
      if (vote !== "yes" && vote !== "no") {
        return res.status(400).json({
          message: "Vote must be yes or no"
        });
      }
      
      if (vote === "yes") {
        activePoll.yes++;
      } else if (vote === "no") {
        activePoll.no++;
      } else {
        return res.status(400).json({
          message: "Invalid vote"
        });
      }
      
      activePoll.voters.push(voterId);
      
      console.log("Vote received:", vote, "from", voterId)
      
  res.json({
    message: "Vote recorded",
    poll: activePoll
  });

});

app.post("/close-poll", (req, res) => {

  if (!activePoll) {
    return res.status(400).json({
      message: "No active poll"
    });
  }

  activePoll.active = false;

  res.json({
    message: "Poll closed",
    poll: activePoll
  });

});

app.get("/results", (req, res) => {

  if (!activePoll) {
    return res.status(400).json({
      message: "No active poll"
    });
  }

  res.json({
    poll: activePoll
  });

});

app.get("/current-poll", (req, res) => {

  if (!activePoll) {
    return res.status(400).json({
      message: "No active poll"
    });
  }

  res.json({
    poll: activePoll
  });

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});