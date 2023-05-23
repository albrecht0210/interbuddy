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
            engine: 'davinci-codex',
            prompt: prompt,
            maxTokens: 1,
            temperature: 0,
        });

        const generatedResponse = response.choices[0].text.trim();
        const isCorrect = generatedResponse.toLowerCase() === 'yes';

        res.json({ isCorrect: isCorrect });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})