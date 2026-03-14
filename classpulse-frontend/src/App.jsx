import { Routes, Route } from "react-router-dom";
import JoinSession from "./components/JoinSession";
import VotePage from "./components/VotePage";

function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<JoinSession />} />
        <Route path="/vote" element={<VotePage />} />
      </Routes>
        <div className="text-8xl font-bold">Hello</div>

    </div>
    
  );
}

export default App;