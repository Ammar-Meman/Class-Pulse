import { Routes, Route } from "react-router-dom";
import JoinSession from "./components/JoinSession";
import VotePage from "./components/VotePage";
import TeacherLogin from "./components/TeacherLogin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<JoinSession />} />
        <Route path="/vote" element={<VotePage />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
      </Routes>
      <div className="text-8xl font-bold text-center mt-10">Hello</div>
    </div>
  );
}

export default App;