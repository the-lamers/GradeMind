import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentPage from "./Student"; // Main page
import TeacherPage from "./Teacher"; // New /teacher page

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentPage />} /> {/* Default Page */}
        <Route path="/teacher" element={<TeacherPage />} /> {/* Teacher Page */}
      </Routes>
    </Router>
  );
};

export default App;
