import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import JoinSession from "./components/JoinSession";
import VotePage from "./components/VotePage";
import TeacherLogin from "./components/TeacherLogin";
import TeacherDashboard from "./components/TeacherDashboard";

// Import local wallpapers
import nature1 from "./assets/wallpapers/nature-1.jpg";
import nature2 from "./assets/wallpapers/nature-2.jpg";
import nature3 from "./assets/wallpapers/nature-3.jpg";
import midnight1 from "./assets/wallpapers/midnight-1.jpg";
import midnight2 from "./assets/wallpapers/midnight-2.jpg";
import midnight3 from "./assets/wallpapers/midnight-3.jpg";

const WALLPAPERS = {
  nature: [nature1, nature2, nature3],
  midnight: [midnight1, midnight2, midnight3]
};

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "nature");
  const [wallpaperIndex, setWallpaperIndex] = useState(
    parseInt(localStorage.getItem("wallpaperIndex") || "1")
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("wallpaperIndex", wallpaperIndex);
    
    document.body.className = `theme-${theme}`;
    document.body.style.setProperty("--bg-image", `url(${WALLPAPERS[theme][wallpaperIndex]})`);
  }, [theme, wallpaperIndex]);

  const toggleTheme = () => {
    setTheme(prev => prev === "nature" ? "midnight" : "nature");
    setWallpaperIndex(1); // Default to Wall #2 when changing theme
  };

  const nextWallpaper = () => {
    setWallpaperIndex(prev => (prev + 1) % WALLPAPERS[theme].length);
  };

  const isNature = theme === "nature";

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6`}>
      {/* Top Theme & Wallpaper Switcher & Nav */}
      <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 glass-panel px-8 py-4 rounded-[2rem] flex gap-8 items-center border-2 border-current border-opacity-20 shadow-brutal`}>
        <div className="flex gap-6 items-center pr-4 border-r-2 border-current border-opacity-10">
          <Link to="/" className="text-sm font-black uppercase tracking-tighter hover:scale-110 transition-transform flex items-center gap-2">
            Student
          </Link>
          <Link to="/teacher-login" className="text-sm font-black uppercase tracking-tighter hover:scale-110 transition-transform flex items-center gap-2">
            Teacher
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className={`relative w-20 h-9 rounded-full border-2 border-current transition-all overflow-hidden group shadow-sm active:scale-95
              ${isNature ? "bg-brutal-green text-black" : "bg-brutal-red text-white"}`}
          >
            <div className={`absolute inset-0 flex items-center justify-center font-mono font-black text-[8px] uppercase tracking-tighter transition-all duration-300
              ${isNature ? "translate-x-0" : "translate-x-full opacity-0"}`}>
              Nature
            </div>
            <div className={`absolute inset-0 flex items-center justify-center font-mono font-black text-[8px] uppercase tracking-tighter transition-all duration-500
              ${isNature ? "-translate-x-full opacity-0" : "translate-x-0"}`}>
              Midnight
            </div>
          </button>

          {/* Wallpaper Switcher */}
          <button 
            onClick={nextWallpaper}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 border-current font-mono font-black text-[9px] uppercase tracking-tighter transition-all active:scale-90
              ${isNature 
                ? "bg-white/50 text-black hover:bg-black hover:text-white" 
                : "bg-black/50 text-white hover:bg-white hover:text-black"}`}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Wall #{wallpaperIndex + 1}
          </button>
        </div>
      </nav>

      <div className="w-full max-w-5xl mt-28 animate-fade-in relative z-10">
        <Routes>
          <Route path="/" element={<JoinSession theme={theme} />} />
          <Route path="/vote" element={<VotePage theme={theme} />} />
          <Route path="/teacher-login" element={<TeacherLogin theme={theme} />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard theme={theme} />} />
        </Routes>
      </div>

      <footer className={`mt-20 text-[9px] font-mono font-black uppercase tracking-[0.4em] px-8 py-3 rounded-full border-2 border-current shadow-brutal
        ${isNature ? "bg-white/80 text-black" : "bg-black/80 text-white"}`}>
        Class-Pulse / Offline Assets Enabled / Build 2403
      </footer>
    </div>
  );
}

export default App;