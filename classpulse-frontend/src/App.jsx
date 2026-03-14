import { Routes, Route } from "react-router-dom";
import JoinSession from "./components/JoinSession";
// import VotePage from "./components/VotePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<JoinSession />} />
      {/* <Route path="/vote" element={<VotePage />} /> */}
    </Routes>
  );
}

export default App;