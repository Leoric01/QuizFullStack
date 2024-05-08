import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GetAllQuiz from "../components/quiz/GetAllQuiz";
import AddQuestion from "../components/question/AddQuestion";
import Navbar from "../components/layouts/NavBar";
import Home from "../components/quiz/Home";
import QuizStepper from "../components/quiz/QuizStepper";
import Quiz from "../components/quiz/Quiz";
import UpdateQuestion from "../components/question/UpdateQuestion";
import QuizResult from "../components/quiz/QuizResult";
import Admin from "../components/layouts/Admin";

function App() {
  return (
    <main className="container mt-5 mb-5">
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/quiz-stepper" element={<QuizStepper />} />
          <Route path="/take-quiz" element={<Quiz />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/create-quiz" element={<AddQuestion />} />
          <Route path="/update-quiz/:id" element={<UpdateQuestion />} />
          <Route path="/all-quizzes" element={<GetAllQuiz />} />
          <Route path="/quiz-result" element={<QuizResult />} /> */}
        </Routes>
      </Router>
    </main>
  );
}

export default App;

