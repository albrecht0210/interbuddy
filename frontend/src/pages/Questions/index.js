import { Box, Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { checkAnswer, generateFeedback } from "../../services/interviewServices";

function QuestionPage(props) {
    const sample_questions = [
        "What is a Data Structure?", 
        "What is an Array?", 
        "What is a Linked List?",
        "What is LIFO?",
        "What is a Stack?",
    ];

    const { setterCorrect, setterFeedback } = props;
    const [answers, setAnswers] = useState(Array(sample_questions.length).fill(''));

    const handleTextFieldChange = (index, value) => {
        const newData = [...answers];
        newData[index] = value;
        setAnswers(newData);
    }

    const handleSubmit = () => {
        sample_questions.forEach((question, index) => {
            setterCorrect(checkAnswer(question, answers[index]));
        });
        setterFeedback(generateFeedback(sample_questions, answers));
    }

    return (
        <Box sx={{ padding: 5, backgroundColor: blue[700], display: "flex", justifyContent: "center" }}>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Paper sx={{ padding: 3 }}>
                        <Stack spacing={2}>
                            {sample_questions.map((item, index) => (
                                <div key={index}>
                                    <Typography gutterBottom>Question #{index + 1}: {item}</Typography>
                                    <TextField 
                                        id={"answer-" + item}
                                        label="Answer"
                                        multiline
                                        rows={5}
                                        value={answers[index]}
                                        onChange={(event) => handleTextFieldChange(index, event.target.value)}
                                        fullWidth
                                    />
                                </div>
                            ))}
                            <Button variant="contained" color="success" onClick={handleSubmit}>result</Button>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </Box>
    );
}

export default QuestionPage;