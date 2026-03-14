import { useEffect, useState } from "react";

function VotePage() {

  const [poll, setPoll] = useState(null);

  useEffect(() => {

    const fetchPoll = async () => {

      const response = await fetch("http://localhost:3000/current-poll");
      const data = await response.json();

      setPoll(data.poll);

    };

    fetchPoll();

  }, []);

  const handleVote = async (vote) => {

  const voterId = localStorage.getItem("voterId");

  const response = await fetch("http://localhost:3000/vote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      vote: vote,
      voterId: voterId
    })
  });

  const data = await response.json();

  console.log("Response:", data);

  alert(data.message);
};

  if (!poll) {
    return <h2>No active poll</h2>;
  }

  return (
    <div className="m-10">
      <h2>{poll.question}</h2>

      <div className="flex gap-3 items-center justify-center">
        <button onClick={()=>{handleVote("yes")}}>YES</button>
        <button onClick={()=>{handleVote("no")}}>No</button>
      </div>
    </div>
  );
}

export default VotePage;