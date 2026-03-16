import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherLogin({ theme }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Login successful");
    navigate("/teacher-dashboard");
  };

  const isNature = theme === "nature";

  return (
    <div className="glass-panel p-16 rounded-[3rem] w-full max-w-xl mx-auto space-y-12 transition-all duration-500 hover:scale-[1.01]">
      <div className="text-center sm:text-left space-y-3">
        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none italic">
          Teacher<br /><span className={isNature ? "text-success" : "text-brutal-red"}>Terminal</span>
        </h1>
        <p className="text-xs font-mono font-black uppercase tracking-widest opacity-60">Authentication Protocol Required</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-mono font-black uppercase tracking-[0.4em] ml-2">Email Identity</label>
          <input
            type="text"
            placeholder="USER@DOMAIN.EDU"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-6 py-4 bg-transparent border-4 border-black font-mono font-bold focus:outline-none transition-all
              ${isNature ? "bg-white/40 placeholder-black/20" : "bg-black/40 text-white border-white placeholder-white/20"}`}
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-mono font-black uppercase tracking-[0.4em] ml-2">Secure Key</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-6 py-4 bg-transparent border-4 border-black font-mono font-bold focus:outline-none transition-all
              ${isNature ? "bg-white/40 placeholder-black/20" : "bg-black/40 text-white border-white placeholder-white/20"}`}
          />
        </div>

        <button 
          onClick={handleLogin}
          className={`w-full py-6 btn-brutal text-2xl mt-4
            ${isNature ? "bg-brutal-green text-black" : "bg-brutal-red text-white border-white shadow-[4px_4px_0px_0px_white]"}`}
        >
          Sign In
        </button>
      </div>

      <div className="text-center pt-6 opacity-40 border-t border-current/10">
        <p className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">
          Restricted Access Area / Admin Only
        </p>
      </div>
    </div>
  );
}

export default TeacherLogin;