import React, { useState } from "react";
import "./question.css";
import { IoIosCreate } from 'react-icons/io';

interface QuizQuestion {
    question: string;
    options: string[];
    answer: number;
}

const Quiz = (props: any) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [quizData, setQuizData] = useState<QuizQuestion[]>([
        {
            question: "Abstract:",
            options: ["Contains clear motivation, scope,methodology, and conclusion", "Contains most of them in a clear way",
                "Contains some of them or not clear enough", "Totally not clear or does not contain any of them"],
            answer: 0,
        },
        {
            question: "Introduction:",
            options: ["A", "B", "C", "D"],
            answer: 1,
        },
        {
            question: "Functional Requirements:",
            options: ["A", "B", "C", "D"],
            answer: 2,
        },
        // Add more quiz questions here
    ]);
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
            // If it's the last question, submit the quiz or show a message
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
            return updatedData;
        });
    };

    const submitQuiz = () => {
        // Logic to handle quiz submission, e.g., show results or submit to server
        console.log("Quiz submitted!");
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
                                <li key={index}>
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
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
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
                                    key={index}
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
                        <button onClick={handlePrevious} disabled={currentQuestion === 0}>
                         Previous
                        </button>
                    )}

                    {currentQuestion === quizData.length - 1 ? (
                        <button onClick={handleNext}>Submit</button>
                    ) : (
                        <button onClick={handleNext} disabled={selectedOption === null}>
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

export default Quiz;
