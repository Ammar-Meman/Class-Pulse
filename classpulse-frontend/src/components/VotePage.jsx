import { useEffect, useState } from "react";

function VotePage({ theme }) {
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);

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
    setVoted(true);
  };

  const isNature = theme === "nature";

  if (!poll) {
    return (
      <div className="glass-panel p-20 rounded-[3rem] text-center space-y-10 max-w-2xl mx-auto animate-fade-in border-4 border-black transition-all">
        <div className="w-24 h-24 bg-current opacity-10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter italic">Awaiting Relay</h2>
          <p className="font-mono font-bold uppercase tracking-widest opacity-60">Synchronizing with teacher terminal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-16 rounded-[4rem] text-center space-y-16 max-w-3xl mx-auto relative overflow-hidden transition-all duration-500 hover:scale-[1.01] border-4 border-black">
      {/* Dynamic Glow */}
      <div className={`absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full blur-[100px] -z-10 opacity-30
        ${isNature ? "bg-success" : "bg-brutal-red"}`}></div>
      
      <div className="space-y-6">
        <div className={`inline-flex items-center gap-4 px-6 py-2 border-2 border-current rounded-full`}>
          <div className={`w-3 h-3 rounded-full animate-ping ${isNature ? "bg-success" : "bg-brutal-red"}`}></div>
          <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em]">Live Stream Active</span>
        </div>
        <h2 className="text-6xl font-black uppercase tracking-tighter leading-none italic drop-shadow-sm">{poll.question}</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-10 items-center justify-center pt-8">
        <button 
          onClick={() => handleVote("yes")} 
          disabled={voted}
          className={`flex-1 w-full h-40 btn-brutal text-4xl
            ${voted 
              ? 'opacity-20 cursor-not-allowed grayscale' 
              : `bg-brutal-green text-black ${!isNature && "border-white shadow-[4px_4px_0px_0px_white]"}`}`}
        >
          YES
          {!voted && <span className="text-[10px] font-black uppercase tracking-widest mt-4 block">Transmit Affirmative</span>}
        </button>

        <button 
          onClick={() => handleVote("no")} 
          disabled={voted}
          className={`flex-1 w-full h-40 btn-brutal text-4xl bg-black text-white
            ${voted 
              ? 'opacity-20 cursor-not-allowed grayscale' 
              : `${!isNature && "border-white shadow-[4px_4px_0px_0px_white]"}`}`}
        >
          NO
          {!voted && <span className="text-[10px] font-black uppercase tracking-widest mt-4 block">Transmit Negative</span>}
        </button>
      </div>

      {voted && (
        <div className={`p-8 border-4 border-black animate-fade-in
          ${isNature ? "bg-black text-white" : "bg-white text-black border-white"}`}>
          <div className="flex items-center justify-center gap-6">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-xl font-mono font-black uppercase tracking-widest leading-none">Transmission Confirmed / Anonymous</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default VotePage;