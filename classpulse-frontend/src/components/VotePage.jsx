import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

function VotePage({ theme }) {
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);
  const [liveResults, setLiveResults] = useState(null);

  const fetchPoll = async () => {
    const response = await fetch(`${API_BASE_URL}/current-poll`);
    const data = await response.json();
    setPoll(data.poll);
    
    // If poll exists, also fetch results to show if user has already voted
    if (data.poll) {
      fetchResults();
    }
  };

  const fetchResults = async () => {
    const response = await fetch(`${API_BASE_URL}/results`);
    const data = await response.json();
    setLiveResults(data.poll);
  };

  useEffect(() => {
    fetchPoll();
    // Set up rapid polling for live results once user has voted
    const interval = setInterval(() => {
      fetchPoll();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleVote = async (vote) => {
    const voterId = localStorage.getItem("voterId");

    const response = await fetch(`${API_BASE_URL}/vote`, {
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
    if (response.ok) {
      setVoted(true);
      fetchResults();
    } else {
      alert(data.message);
    }
  };

  const isNature = theme === "nature";

  if (!poll) {
    return (
      <div className="glass-panel p-8 sm:p-20 rounded-[2rem] sm:rounded-[3rem] text-center space-y-8 sm:space-y-10 max-w-2xl mx-auto animate-fade-in border-4 border-black transition-all">
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-current opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse">
          <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter italic">Awaiting Relay</h2>
          <p className="text-[10px] sm:text-sm font-mono font-bold uppercase tracking-widest opacity-60">Synchronizing with teacher terminal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-8 sm:p-16 rounded-[2rem] sm:rounded-[4rem] text-center space-y-8 sm:space-y-16 max-w-3xl mx-auto relative overflow-hidden transition-all duration-500 hover:scale-[1.01] border-4 border-black">
      {/* Dynamic Glow */}
      <div className={`absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full blur-[100px] -z-10 opacity-30
        ${isNature ? "bg-success" : "bg-brutal-red"}`}></div>
      
      <div className="space-y-6">
        <div className={`inline-flex items-center gap-4 px-6 py-2 border-2 border-current rounded-full`}>
          <div className={`w-3 h-3 rounded-full animate-ping ${isNature ? "bg-success" : "bg-brutal-red"}`}></div>
          <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em]">Live Stream Active</span>
        </div>
        <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter leading-none italic drop-shadow-sm break-words">{poll.question}</h2>
      </div>

      {!voted ? (
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center pt-4 sm:pt-8">
          <button 
            onClick={() => handleVote("yes")} 
            className={`flex-1 w-full h-32 sm:h-40 btn-brutal text-3xl sm:text-4xl bg-brutal-green text-black ${!isNature && "border-white shadow-[4px_4px_0px_0px_white]"}`}
          >
            YES
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest mt-2 sm:mt-4 block">Transmit Affirmative</span>
          </button>

          <button 
            onClick={() => handleVote("no")} 
            className={`flex-1 w-full h-32 sm:h-40 btn-brutal text-3xl sm:text-4xl bg-black text-white ${!isNature && "border-white shadow-[4px_4px_0px_0px_white]"}`}
          >
            NO
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest mt-2 sm:mt-4 block">Transmit Negative</span>
          </button>
        </div>
      ) : (
        <div className="animate-fade-in space-y-8 sm:space-y-10">
          <div className={`p-4 sm:p-6 border-4 border-black flex flex-col sm:flex-row items-center justify-between gap-4
            ${isNature ? "bg-black text-white" : "bg-white text-black border-white"}`}>
            <span className="font-mono font-black uppercase tracking-widest text-[10px] sm:text-sm">Submission Received / Viewing Live Matrix</span>
            <button 
              onClick={fetchPoll}
              className={`px-4 py-1 border-2 border-current rounded-full font-mono font-black text-[10px] uppercase tracking-tighter hover:bg-current hover:text-bg-main transition-all`}
            >
              Manual Sync
            </button>
          </div>
          
          {liveResults && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
              <div className={`p-6 sm:p-10 border-4 border-black text-center shadow-brutal bg-brutal-green text-black ${!isNature && "border-white shadow-[4px_4px_0px_0px_white]"}`}>
                <p className="text-[8px] sm:text-[10px] font-mono font-black uppercase tracking-[0.4em] mb-2 sm:mb-4">YES</p>
                <p className="text-5xl sm:text-7xl font-black leading-none tracking-tighter">{liveResults.yes}</p>
              </div>
              <div className={`p-6 sm:p-10 border-4 border-black text-center shadow-brutal bg-black text-white ${!isNature && "border-white shadow-[4px_4px_0px_0px_white]"}`}>
                <p className="text-[8px] sm:text-[10px] font-mono font-black uppercase tracking-[0.4em] mb-2 sm:mb-4">NO</p>
                <p className="text-5xl sm:text-7xl font-black leading-none tracking-tighter">{liveResults.no}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VotePage;