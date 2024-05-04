import React, { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions } from "../../utils/QuizzService";

const GetAllQuizz = () => {
  const [questions, setQuestions] = useState([
    { id: "", question: "", correctAnswers: "", choices: [] },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    try {
      const data = await getAllQuestions();
      setQuestions(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((questions) => questions.id !== id));
      setIsQuestionDeleted(true);
      setDeleteSuccessMessage("Question has been deleted successfully!");
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setDeleteSuccessMessage("");
    }, 5000);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container">
      <div className="row mt-5">
        <div className="col-md-6 mb-2 md-mb-0" style={{ color: "GrayText" }}>
          <h4>All Quizz Questions</h4>
        </div>
        <div className="col-md-4 d-flex justify-content-end">
          {/* TODO : add a link to navigate to Add new question form */}
        </div>
      </div>
      <hr />
      {isQuestionDeleted && (
        <div className="alert alert-success">{deleteSuccessMessage}</div>
      )}
      {questions.map((question, index) => (
        <div>
          <h4 style={{ color: "GrayText" }}>{`${index + 1}. ${
            question.question
          }`}</h4>
          <ul>
            {question.choices.map((choice, index) => (
              <li key={index}>{choice}</li>
            ))}
          </ul>
          <p className="text-success">
            Correct Answer: {question.correctAnswers}
          </p>
          <div className="btn-group mb-4">
            {/* TODO : add a link to navigate to Update question form */}
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleDelete(question.id)}
            >
              Delete Question
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
export default GetAllQuizz;
