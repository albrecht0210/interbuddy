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

        const prompt = `Q: ${question}\nA: ${answer}\nQ: Is the user's answer correct?`;

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
        });

        const generatedResponse = response.data.choices[0].text.trim();
        const isCorrect = generatedResponse.toLowerCase().includes('yes');

        res.json({ isCorrect: isCorrect });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
});

app.post('/generate-feedback', async (req, res) => {
    try {
        const questions = req.body.questions;
        const answers = req.body.answers;

        var prompt = "";

        for (let i = 0; i < questions.length; i++) {
            prompt += `Q: ${questions[i]}\nA: ${answers[i]}\nQ: Is the user's answer correct? If not give an explanation`;
        }
        prompt += "Q: Provide a compiled explaination on the wrong answers.";

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 512,
            temperature: 0
        });

        const generatedResponse = response.data.choices[0].text.trim(); 

        res.json({ feedback: generatedResponse });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})