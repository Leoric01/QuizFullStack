import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GetAllQuizz from "../components/quizz/GetAllQuizz";
import AddQuestion from "../components/question/AddQuestion";
import Navbar from "../components/layouts/NavBar";

function App() {
  return (
    <main className="container mt-5 mb-5">
      <Router>
        <Navbar />
        <AddQuestion />
        <Routes>
          <Route path="/create-quizz" element={<AddQuestion />} />
          <Route path="/all-quizzes" element={<GetAllQuizz />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
