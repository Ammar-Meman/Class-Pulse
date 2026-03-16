import { useState } from "react";

function TeacherDashboard({ theme }) {
  const [sessionCode, setSessionCode] = useState(null);
  const [question, setQuestion] = useState("");
  const [results, setResults] = useState(null);

  const generateCode = async () => {
    const response = await fetch("http://localhost:3000/generate-code", {
      method: "POST"
    });
    const data = await response.json();
    setSessionCode(data.code);
  };

  const createPoll = async () => {
    const response = await fetch("http://localhost:3000/create-poll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: question
      })
    });
    const data = await response.json();
    alert(data.message);
  };

  const fetchResults = async () => {
    const response = await fetch("http://localhost:3000/results");
    const data = await response.json();
    setResults(data.poll);
  };

  const closePoll = async () => {
    const response = await fetch("http://localhost:3000/close-poll", {
      method: "POST"
    });
    const data = await response.json();
    alert(data.message);
  };

  const isNature = theme === "nature";

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-20">
      {/* Dynamic Header */}
      <div className={`glass-panel p-10 rounded-[2.5rem] flex flex-col sm:flex-row sm:items-center justify-between gap-8 border-4 border-black transition-all ${!isNature && "border-white"}`}>
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">Command <span className={isNature ? "text-success" : "text-brutal-red"}>Center</span></h1>
          <p className="text-xs font-mono font-black uppercase tracking-widest opacity-60">System Operational / Node Active</p>
        </div>
        <div className={`flex items-center gap-4 px-6 py-3 border-2 border-current rounded-full`}>
          <div className={`w-4 h-4 rounded-full animate-ping ${isNature ? "bg-success" : "bg-brutal-red"}`}></div>
          <span className="text-xs font-mono font-black uppercase tracking-widest">Live Link Established</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Session Panel */}
        <div className={`glass-panel p-12 rounded-[3rem] space-y-8 border-4 border-black hover:scale-[1.02] transition-all ${!isNature && "border-white"}`}>
          <div className="space-y-4">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4 leading-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              Access Port
            </h3>
            
            {sessionCode && (
              <div className={`p-10 border-4 animate-bounce-in shadow-brutal
                ${isNature 
                  ? "bg-white border-black text-black" 
                  : "bg-black border-white text-white shadow-[6px_6px_0px_0px_white]"}`}>
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] mb-4 block opacity-60">Session Access Port</span>
                <h2 className="text-7xl font-black tracking-[0.2em] leading-none italic">{sessionCode}</h2>
              </div>
            )}
          </div>
          
          <button onClick={generateCode} className={`w-full py-6 btn-brutal text-2xl font-black ${isNature ? "bg-white" : "bg-black text-white border-white shadow-[6px_6px_0px_0px_white]"}`}>
            {sessionCode ? "Reset Connection" : "Initiate Link"}
          </button>
        </div>

        {/* Poll Creation */}
        <div className={`glass-panel p-12 rounded-[3rem] space-y-8 border-4 border-black hover:scale-[1.02] transition-all ${!isNature && "border-white"}`}>
          <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4 leading-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Polling Relay
          </h3>
          
          <div className="space-y-8">
            <textarea
              placeholder="BROADCAST MESSAGE..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className={`w-full px-8 py-6 bg-transparent border-4 border-black font-mono font-bold focus:outline-none transition-all min-h-[160px] resize-none text-2xl
                ${isNature ? "bg-white/40 placeholder-black/20" : "bg-black/40 text-white border-white placeholder-white/20"}`}
            />
            <button onClick={createPoll} className={`w-full py-6 btn-brutal text-2xl ${isNature ? "bg-brutal-green" : "bg-brutal-red text-white border-white shadow-[4px_4px_0px_0px_white]"}`}>
              Deploy Poll
            </button>
          </div>
        </div>
      </div>

      {/* Results Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className={`md:col-span-2 glass-panel p-12 rounded-[3rem] space-y-10 border-4 border-black transition-all ${!isNature && "border-white"}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4 leading-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Live Data Matrix
            </h3>
            <button onClick={fetchResults} className={`px-6 py-2 border-2 border-current rounded-full font-mono font-black text-[10px] uppercase tracking-widest hover:bg-current hover:text-bg-main transition-all`}>
              Pull Updates
            </button>
          </div>

          {results ? (
            <div className="animate-fade-in space-y-12">
              <div className={`p-8 border-4 border-black font-mono font-bold text-3xl italic leading-none
                ${isNature ? "bg-white" : "bg-black text-white border-white"}`}>
                {results.question}
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className={`p-10 border-4 border-black text-center shadow-brutal transition-transform hover:scale-105
                  ${isNature ? "bg-brutal-green" : "bg-brutal-red text-white border-white shadow-[4px_4px_0px_0px_white]"}`}>
                  <p className="text-[10px] font-mono font-black uppercase tracking-[0.4em] mb-4">AFFIRMATIVE</p>
                  <p className="text-8xl font-black leading-none tracking-tighter">{results.yes}</p>
                </div>
                <div className={`p-10 border-4 border-black text-center shadow-brutal transition-transform hover:scale-105 bg-black text-white
                  ${!isNature && "bg-white text-black border-white shadow-[4px_4px_0px_0px_white]"}`}>
                  <p className="text-[10px] font-mono font-black uppercase tracking-[0.4em] mb-4">NEGATIVE</p>
                  <p className="text-8xl font-black leading-none tracking-tighter">{results.no}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center border-4 border-dashed border-current opacity-20 rounded-[2rem] space-y-4">
              <p className="text-2xl font-black uppercase italic tracking-widest">Awaiting Transmission...</p>
            </div>
          )}
        </div>

        {/* Kill Switch */}
        <div className={`glass-panel p-12 rounded-[3rem] flex flex-col justify-between space-y-10 border-4 border-current border-opacity-10 hover:border-brutal-red hover:border-opacity-100 transition-all`}>
          <div className="space-y-4">
            <h3 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-4 leading-none text-brutal-red">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Kill Switch
            </h3>
            <p className="font-mono font-bold text-xs uppercase tracking-widest opacity-60">Immediate termination of current relay stream.</p>
          </div>
          <button onClick={closePoll} className={`w-full py-6 btn-brutal bg-brutal-red text-white text-2xl ${!isNature && "border-white shadow-[4px_4px_0px_0px_white]"}`}>
            Terminate
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;