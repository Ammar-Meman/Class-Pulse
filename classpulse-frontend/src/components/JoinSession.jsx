import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinSession() {

  const [code, setCode] = useState("");
  const navigate = useNavigate();

  let voterId = localStorage.getItem("voterId");

  if (!voterId) {
    voterId = Math.random().toString(36).substring(2);
    localStorage.setItem("voterId", voterId);
  }

  const handleJoin = async () => {

    const response = await fetch("http://localhost:3000/join-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code: Number(code) })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    navigate("/vote"); 

    alert(data.message);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Join Classroom</h1>

      <input
        type="number"
        placeholder="Enter Session Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <br /><br />

      <button onClick={handleJoin}>
        Join Session
      </button>
    </div>
  );
}

export default JoinSession;