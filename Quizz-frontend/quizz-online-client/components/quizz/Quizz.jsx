import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchQuizzForUser } from "../../utils/QuizzService";

const Quizz = () => {
  const [quizzQuestions, setQuizzQuestions] = useState([
    { id: "", correctAnswers: "", question: "", questionType: "" },
  ]);
  const [selectedAnswers, setSelectedAnswers] = useState([
    { id: "", answer: [""] },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScores, setTotalScores] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSubject, selectedNumOfQuestions } = location.state;

  useEffect(() => {
    fetchQuizzData();
  }, []);

  const fetchQuizzData = async () => {
    if (selectedNumOfQuestions && selectedSubject) {
      const questions = await fetchQuizzForUser(
        selectedNumOfQuestions,
        selectedSubject
      );
      setQuizzQuestions(questions);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answerObj) => answerObj.id === questionId
      );
      const selectedAnswer = Array.isArray(answer)
        ? answer.map((a) => a.charAt(0))
        : answer.charAt(0);
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          id: questionId,
          answer: [selectedAnswer],
        };
        return updatedAnswers;
      } else {
        const newAnswer = { id: questionId, answer: [selectedAnswer] };
        return [...prevAnswers, newAnswer];
      }
    });
  };

  const isChecked = (questionId, choice) => {
    const selectedAnswer = selectedAnswers.find(
      (answer) => answer.id === questionId
    );
    if (!selectedAnswer) {
      return false;
    }
    if (Array.isArray(selectedAnswer.answer)) {
      return selectedAnswer.answer.includes(choice.charAt(0));
    }
    return selectedAnswer.answer === choice.charAt(0);
  };

  const handleCheckboxChange = (questionId, choice) => {
    setSelectedAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answerObj) => answerObj.id === questionId
      );
      const selectedAnswer = Array.isArray(choice)
        ? choice.map((c) => c.charAt(0))
        : choice.charAt(0);
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        const existingAnswers = updatedAnswers[existingAnswerIndex].answer;
        let newAnswer;
        if (Array.isArray(existingAnswers)) {
          newAnswer = existingAnswers.includes(selectedAnswer)
            ? existingAnswers.filter((a) => a !== selectedAnswer)
            : [...existingAnswers, selectedAnswer];
        } else {
          newAnswer = [existingAnswers, selectedAnswer];
        }
        updatedAnswers[existingAnswerIndex] = {
          id: questionId,
          answer: newAnswer,
        };
        return updatedAnswers;
      } else {
        const newAnswer = { id: questionId, answer: [selectedAnswer] };
        return [...prevAnswers, newAnswer];
      }
    });
  };

  const handleSubmit = () => {
    let scores = 0;
    quizzQuestions.forEach((question) => {
      const selectedAnswer = selectedAnswers.find(
        (answer) => answer.id === question.id
      );
      if (selectedAnswer) {
        const selectedOptions = Array.isArray(selectedAnswer.answer)
          ? selectedAnswer.answer
          : [selectedAnswer.answer];
        const correctOptions = Array.isArray(question.correctAnswers)
          ? question.correctAnswers
          : [question.correctAnswers];
        const isCorrect = selectedOptions.every((option) =>
          correctOptions.includes(option)
        );
        if (isCorrect) {
          scores++;
        }
      }
    });
    setTotalScores(scores);
    setSelectedAnswers([{ id: "", answer: [""] }]);
    setCurrentQuestionIndex(0);
    navigate("/quizz-result", {
      state: { quizzQuestions, totalScores: scores },
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizzQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="p-5">
      <h3 className="text-info">
        Question {quizzQuestions.length > 0 ? currentQuestionIndex + 1 : 0} of{" "}
        {quizzQuestions.length}
      </h3>
      <h4 className="mb-4">
        {quizzQuestions[currentQuestionIndex]?.question}
        <AnswerOptions
          question={quizzQuestions[currentQuestionIndex]}
          isChecked={isChecked}
          handleAnswerChange={handleAnswerChange}
          handleCheckboxChange={handleCheckboxChange}
        />
        <div className="mt-4">
          <button
            className="btn btn-sm btn-primary me-2"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous Question
          </button>
          <button
            className={`btn btn-info btn-sm ${
              currentQuestionIndex === quizzQuestions.length - 1
            } && "btn btn-warning btn-sm`}
            disabled={
              !selectedAnswers.find(
                (answer) =>
                  answer.id === quizzQuestions[currentQuestionIndex]?.id ||
                  answer.answer !== ""
              )
            }
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex === quizzQuestions.length - 1
              ? "Submit Quizz"
              : "Next question"}
          </button>
        </div>
      </h4>
    </div>
  );
};

export default Quizz;
