import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinSession({ theme }) {
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

  const isNature = theme === "nature";

  return (
    <div className="glass-panel p-16 rounded-[1rem] text-center space-y-12 max-w-xl mx-auto transition-all duration-500">
      <div className="space-y-4">
        <h1 className="text-7xl font-black tracking-tighter uppercase leading-none italic">
          Class<span className={isNature ? "text-primary" : "text-brutal-red"}>Pulse</span>
        </h1>
        <p className="text-sm font-mono font-bold uppercase tracking-widest opacity-60">High-Contrast Polling Terminal</p>
      </div>

      <div className="space-y-8">
        <input
          type="number"
          placeholder="ENTER CODE"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={`w-full px-8 py-6 bg-transparent border-4 border-black text-center text-4xl font-black font-mono placeholder-black/20 focus:outline-none transition-all
            ${isNature ? "bg-white" : "bg-black/60 text-white border-white placeholder-white/20"}`}
        />
        
        <button 
          onClick={handleJoin}
          className={`w-full py-6 btn-brutal text-2xl
            ${isNature ? "bg-primary text-white" : "bg-brutal-red text-white border-white shadow-[6px_6px_0px_0px_white]"}`}
        >
          Access Session
        </button>
      </div>

      <div className="pt-12 border-t border-black/10">
        <p className="text-[10px] uppercase font-mono font-black tracking-[0.3em] mb-4 opacity-40">Identity Signature</p>
        <code className={`px-6 py-2 rounded-full font-mono font-bold border-2
          ${isNature ? "bg-black text-white border-black" : "bg-white text-black border-white"}`}>
          {voterId}
        </code>
      </div>
    </div>
  );
}

export default JoinSession;