import axios from "axios"
export const api = axios.create({
    baseURL: "http://localhost:8080/api/quizzes"
})

export const createQuestion = async(quizzQuestion) =>{
    try {
        const response = await api.post("/create-new-question", quizzQuestion)
        return response.data

    } catch (error) {
       console.error(error) 
    }
}

export const getAllQuestions = async() =>{
    try {
        const response = await api.get("/all-questions")
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}

export const fetchQuizzForUser = async(number, subject) =>{
    try {
        const response = await api.get(`/quizz/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`)
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getSubjects = async() =>{
    try {
        const response = await api.get("/subjects")
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}

export const updateQuestion = async(id, question) =>{
    try {
        const response = await api.put(`/quizz/${id}/update`, question)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getQuestionById = async(id) =>{
    try {
        const response = await api.get(`/question/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const deleteQuestion = async(id) =>{
    try {
        const response = await api.delete(`/question/${id}/delete`)
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}