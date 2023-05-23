const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const openai = require('./openai');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/check-answer', async (req, res) => {
    try {
        const question = req.body.question;
        const answer = req.body.answer;
        console.log(question);
        console.log(answer);
        const prompt = `Q: ${question}\nA: ${answer}\nQ: Is the user's answer correct?`;
        console.log(prompt);

        const response = await openai.createCompletion({
            engine: 'davinci-codex',
            prompt: prompt,
            maxTokens: 512,
            temperature: 0,
        });

        const generatedResponse = response.choices[0].text.trim();
        const isCorrect = generatedResponse.toLowerCase() === 'yes';

        res.json({ isCorrect: isCorrect });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
});

app.post('/generate-feedback', async (req, res) => {
    try {
        const questions = req.body.questions;
        const answers = req.body.answers;

        const chatHistory = [
            { role: 'system', content: 'You are conducting an interview.' },
            { role: 'interviewer', content: `Q: ${question}` },
            { role: 'applicant', content: `A: ${answer}` },
        ];
      
        for (let i = 0; i < questions.length; i++) {
            chatHistory.push({ role: 'interviewer', content: `Q: ${questions[i]}` });
            chatHistory.push({ role: 'applicant', content: `A: ${answers[i]}` });
        }

        const response = await openai.chatCompletion.create({
            messages: chatHistory,
        });

        const generatedResponses = response.choices
            .map((choice) => choice.message.content.trim())
            .slice(1);

        res.json({ feedback: generatedResponses });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})