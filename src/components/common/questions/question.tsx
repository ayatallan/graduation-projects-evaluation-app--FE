import React, { useEffect, useState } from "react";
import "./question.css";
import { EditOutlined } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import { QuizQuestion } from "../../../interface";


const SoftwareReport = (props: any) => {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState<QuizQuestion[]>(props.quizData);

  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newOptions, setNewOptions] = useState<string[]>([]);
  const [newWeight, setNewWeight] = useState(0);


  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await fetch('http://localhost:3002/questions');
      const data = await response.json();
      setQuizData(data);
    } catch (error) {
      console.error(error);
    }
  };




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

  const updateQuestion = (
    questionIndex: number,
    newQuestionText: string,
    newOptions: string[],
    newWeight: number
  ) => {
    setQuizData((prevQuizData) => {
      const updatedData = prevQuizData.map((question, index) => {
        if (index === questionIndex) {
          return {
            ...question,
            question: newQuestionText,
            options: newOptions,
            weight: newWeight,
          };
        }
        return question;
      });

      // Update local storage
      localStorage.setItem("questions", JSON.stringify(updatedData));

      return updatedData;
    });
  };

  const submitQuiz = () => {
    console.log("Quiz submitted!");
    navigate("/Forms");

    // Update local storage with final quiz data
    localStorage.setItem("quizData", JSON.stringify(quizData));
  };

  const handleEditClick = (questionIndex: number) => {
    setEditingQuestionIndex(questionIndex);
    setNewQuestionText(quizData[questionIndex].question);
    setNewOptions([...quizData[questionIndex].options]);
    setNewWeight(quizData[questionIndex].weight);

  };

  const handleCancelEdit = () => {
    setEditingQuestionIndex(null);
    setNewQuestionText("");
    setNewOptions([]);
    setNewWeight(0);
  };

  const handleSaveEdit = () => {
    if (editingQuestionIndex !== null) {
      updateQuestion(editingQuestionIndex, newQuestionText, newOptions, newWeight);
      setEditingQuestionIndex(null);
      setNewQuestionText("");
      setNewOptions([]);
      setNewWeight(0);
    }
  };

  const currentQuizQuestion = quizData[currentQuestion];

  return (
    <>
      <p className="path">{props.path}</p>
      <h2 className="project-name">Project Name</h2>
      {/* <div className="link">
        <div className="btnn">
          <Link to={'/add-questions'} className="quiz-btn " >
            Add more
          </Link>
        </div>
      </div> */}
      <div className="quiz-container">
        {quizData && quizData.length > 0 ? (
          <>
            {editingQuestionIndex !== null ? (
              <div className="form-container">
                <label htmlFor="questionText">Question Text:</label>
                <input
                  type="text"
                  id="questionText"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                />

                <label htmlFor="weight">Weight:</label>
                <input
                  type="number"
                  id="weight"
                  value={newWeight}
                  onChange={(e) => setNewWeight(Number(e.target.value))}
                />

                <label htmlFor="options">Options:</label>
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

                <button className="quiz-btn" onClick={handleSaveEdit}>
                  Save
                </button>
                <button className="quiz-btn" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>


            ) : (
              <div>
                <h3 className="quiz-question">
                  <div>
                    <EditOutlined size={30} onClick={() => handleEditClick(currentQuestion)} />
                    <span className="question-text">{currentQuizQuestion.question}</span>
                  </div>
                  <span className="question-text">{currentQuizQuestion.weight} %</span>

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
                <button className="quiz-btn" onClick={handleNext}>
                  Submit
                </button>
              ) : (
                <button className="quiz-btn" onClick={handleNext} disabled={selectedOption === null}>
                  Next
                </button>
              )}
            </div>
          </>
        ) : (
          <div className=" clc" >
            <div className="note clc"> No questions have been added yet  ,</div>
            <button className="quiz-btn clc" onClick={() => navigate('/add-questions')}>Click To Add</button>
          </div>
        )}
      </div>
    </>
  );
};

export default SoftwareReport;
