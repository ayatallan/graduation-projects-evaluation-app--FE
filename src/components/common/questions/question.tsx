import React, { useState } from "react";
import "./question.css";
import { IoIosCreate } from 'react-icons/io';
import { QuizData } from './dataQ';
import { useNavigate } from "react-router-dom";

interface QuizQuestion {
    question: string;
    options: string[];
    answer: number;
}
const SoftwareReport = (props: any) => {
    const navigate = useNavigate();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [quizData, setQuizData] = useState<QuizQuestion[]>(props.quizData);

    const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
    const [newQuestionText, setNewQuestionText] = useState("");
    const [newOptions, setNewOptions] = useState<string[]>([]);

    const handleOptionSelect = (optionIndex: number) => {
        setSelectedOption(optionIndex);
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prevQuestion) => prevQuestion - 1);
            setSelectedOption(null);
        }
    };

    const handleNext = () => {
        if (currentQuestion < quizData.length - 1) {
            if (selectedOption !== null) {
                checkAnswer();
            }
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
            setSelectedOption(null);
        } else {
            submitQuiz();
        }
    };

    const checkAnswer = () => {
        if (selectedOption === quizData[currentQuestion].answer) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const updateQuestion = (questionIndex: number, newQuestionText: string, newOptions: string[]) => {
        setQuizData((prevQuizData) => {
            const updatedData = [...prevQuizData];
            updatedData[questionIndex].question = newQuestionText;
            updatedData[questionIndex].options = newOptions;

            // Update local storage
            localStorage.setItem('quizData', JSON.stringify(updatedData));

            return updatedData;
        });
    };

    const submitQuiz = () => {
        console.log("Quiz submitted!");
        navigate("/Forms");

        // Update local storage with final quiz data
        localStorage.setItem('quizData', JSON.stringify(quizData));
    };

    const handleEditClick = (questionIndex: number) => {
        setEditingQuestionIndex(questionIndex);
        setNewQuestionText(quizData[questionIndex].question);
        setNewOptions([...quizData[questionIndex].options]);
    };

    const handleCancelEdit = () => {
        setEditingQuestionIndex(null);
        setNewQuestionText("");
        setNewOptions([]);
    };

    const handleSaveEdit = () => {
        if (editingQuestionIndex !== null) {
            updateQuestion(editingQuestionIndex, newQuestionText, newOptions);
            setEditingQuestionIndex(null);
            setNewQuestionText("");
            setNewOptions([]);
        }
    };

    const currentQuizQuestion = quizData[currentQuestion];

    return (
        <>
            <p className='path'>{props.path}</p>
            <div className="quiz-container">

                <h2 className="project-name">Project Name</h2>
                {editingQuestionIndex !== null ? (
                    <div>
                        <input
                            type="text"
                            value={newQuestionText}
                            onChange={(e) => setNewQuestionText(e.target.value)}
                        />
                        <ul>
                            {newOptions.map((option, index) => (
                                <li key={index + 1}>
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => {
                                            const updatedOptions = [...newOptions];
                                            updatedOptions[index] = e.target.value;
                                            setNewOptions(updatedOptions);
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                        <button className="quiz-btn" onClick={handleSaveEdit}>Save</button>
                        <button className="quiz-btn" onClick={handleCancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <div>
                        <h3 className="quiz-question">
                            <IoIosCreate size={30} onClick={() => handleEditClick(currentQuestion)} />
                            <span className="question-text">{currentQuizQuestion.question}</span>

                        </h3>


                        <ul>
                            {currentQuizQuestion.options.map((option, index) => (
                                <li
                                    key={index + 1}
                                    className={selectedOption === index ? "selected-option" : ""}
                                    onClick={() => handleOptionSelect(index)}
                                >
                                    <label>
                                        <input
                                            type="radio"
                                            name="option"
                                            checked={selectedOption === index}
                                            onChange={() => handleOptionSelect(index)}
                                        />
                                        {option}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="pre-next">
                    {currentQuestion !== 0 && (
                        <button className="quiz-btn" onClick={handlePrevious} disabled={currentQuestion === 0}>
                            Previous
                        </button>
                    )}

                    {currentQuestion === quizData.length - 1 ? (
                        <button className="quiz-btn" onClick={handleNext}>Submit</button>
                    ) : (
                        <button className="quiz-btn" onClick={handleNext} disabled={selectedOption === null}>
                            Next
                        </button>
                    )}
                </div>
                {/* <div>
                    Score: {score} / {quizData.length}
                </div> */}
                <div >


                    {/* ****************************** */}
                </div>
            </div>
        </>
    );
};

export default SoftwareReport;
