import axios from 'axios';

const BASE_URL = "http://localhost:8080";

const checkAnswer = async (question, answer) => {
    try {
        const response = await axios.post(`${BASE_URL}/check-answer`, {
            question: question,
            answer: answer,
        });

        const isCorrect = response.data.isCorrect;
        console.log(isCorrect);

        return isCorrect;
    } catch (error) {
        console.error('Error:', error);
    }
};

const generateFeedback = async (questions, answers) => {
    try {
        const response = await axios.post(`${BASE_URL}/generate-feedback`, {
            questions: questions,
            answers: answers,
        });

        const feedback = response.data.feedback;
        console.log(feedback);
        return feedback;
    } catch (error) {
        console.error('Error:', error);
    }
};

export { checkAnswer, generateFeedback };