import { Route, Routes } from "react-router-dom";
import QuestionPage from "./Questions";
import { useState } from "react";

const { default: HomePage } = require("./Home");

function Pages(props) {
    const [isCorrect, setIsCorrect] = useState(null);
    const [feedback, setFeedback] = useState(null);

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/mock-interview" element={<QuestionPage setterCorrect={setIsCorrect} setterFeedback={setFeedback} />} />
            </Routes>
        </>
    )
}

export default Pages;