import React, { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions } from "../../utils/QuizzService";

export const GetAllQuizz = () => {
  const [question, setQuestion] = useState([
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
      setQuestion(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);
    } catch (error) {}
  };

  return <div>GetAllQuizz</div>;
};
