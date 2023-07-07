import React, { useEffect, useState } from "react";
import "./question.css";
import { EditOutlined } from "@ant-design/icons";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { QuizQuestion, Student } from "../../../interface";


const SoftwareReport = (props: any) => {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState<QuizQuestion[]>(props.quizData);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newOptions, setNewOptions] = useState<{ option: string; weight: number }[]>([]);
  const [newWeight, setNewWeight] = useState(0);
  const [students, setStudents] = useState<Student[]>([]);
  const [storeStudentsName, setStoreStudentsName] = useState<String[]>([]);
  const location = useLocation();
  console.log(quizData);


  useEffect(() => {
    fetchQuizData();
    fetchStudents();
    fetchGroups();
  }, []);

  useEffect(() => {
    storeStudent();
  }, [students]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const element = searchParams.get("student");
    const studentArray = element ? element.split(',') : [];
    console.log("student", studentArray);
    setStoreStudentsName(studentArray);
  }, [location.search]);

  const fetchQuizData = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const groupType = searchParams.get('type');
      const response = await fetch('http://localhost:3002/questions');
      const data = await response.json();
      const filteredData = data.filter((question: { Class: string | null; }) => question.Class === groupType);
      setQuizData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };


  const fetchStudents = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const groupType = searchParams.get("group");
      const studentGroup = searchParams.get("student");
      const response = await fetch(
        `http://localhost:3002/students?group=${groupType}&&student=${studentGroup}`
      );
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const storeStudent = async () => {
    try {
      const response = await fetch("http://localhost:3002/studentsName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Myname: storeStudentsName }),
      });
      if (response.ok) {
        console.log("Student stored successfully!");
      } else {
        console.error("Failed to store student");
      }
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

  const updateQuestion = async (
    questionIndex: number,
    newQuestionText: string,
    newOptions: { option: string; weight: number }[],
    newWeight: number
  ) => {
    const questionId = quizData[questionIndex]._id;

    try {
      const response = await fetch(`http://localhost:3002/questions/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: newQuestionText,
          options: newOptions,
          weight: newWeight,
        }),
      });

      if (response.ok) {
        setQuizData((prevQuizData) => {
          const updatedData = [...prevQuizData];
          updatedData[questionIndex] = {
            ...updatedData[questionIndex],
            question: newQuestionText,
            options: newOptions,
            weight: newWeight,
          };

          return updatedData;
        });
      } else {
        console.error('Failed to update question');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const submitQuiz = () => {
    console.log("Quiz submitted!");
    navigate("/report");
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


  const fetchGroups = async () => {
    try {
      const response = await fetch('http://localhost:3002/createGroup');
      if (response.ok) {
        const data = await response.json();
      } else {
        console.error('Failed to fetch groups');
      }
    } catch (error) {
      console.error('Failed to fetch groups:', error);
    }
  };


  return (
    <>
      <p className="path">{props.path}</p>
      <h2 className="project-name">Project Name</h2>
      <div className="link">
        <div className="btnn">
          <Link to={'/add-questions'} className="quiz-btn " >
            Add more
          </Link>
        </div>
      </div>
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
                        value={option.option}
                        onChange={(e) => {
                          const updatedOptions = [...newOptions];
                          updatedOptions[index].option = e.target.value;
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
                    {currentQuizQuestion.type === 'Personal Question' ? <div className="small">"Personal"</div> : null}
                  </div>
                  <span className="question-text">{currentQuizQuestion.weight} %</span>
                </h3>

                <ul>
                  {currentQuizQuestion.type === 'Personal Question' ? (
                    <div className="small-text">
                      <div className="groups">
                        {currentQuizQuestion.type === 'Personal Question' ? (
                          <h1>
                            {storeStudentsName.map((s, ind) => (
                              <div key={ind}>
                                {s}
                                <input className="student-input" />
                              </div>
                            ))}
                          </h1>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    currentQuizQuestion.options.map((op, index) => (
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
                          Option: {op.option}
                        </label>
                      </li>
                    ))
                  )}
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