import React, { useEffect, useState } from "react";
import "./question.css";
import { EditOutlined } from "@ant-design/icons";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { QuizQuestion, Student } from "../../../interface";


const SoftwareReport = (props: any) => {
  const navigate = useNavigate();
   
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedQ, setSelectedQ] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [quizData, setQuizData] = useState<QuizQuestion[]>(props.quizData);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [groupTilte, setGroupTilte] = useState<string | null>("");
  const [newOptions, setNewOptions] = useState<{ option: string; weight: number }[]>([]);
  const [newWeight, setNewWeight] = useState(0);
  const [students, setStudents] = useState<Student[]>([]);
  const [storeStudentsName, setStoreStudentsName] = useState<String[]>([]);
  
  const location = useLocation();


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
    const title = searchParams.get("group");
    const studentArray = element ? element.split(',') : [];
    console.log("student", studentArray);
    setGroupTilte(title);
    
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
    console.log(optionIndex);
    
    setSelectedOption(optionIndex);
    setSelectedQ(optionIndex);
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
      setSelectedQ(0);
      props.setInputValues([]);
    } else {
      submitQuiz();
    }
  };

  
  
  const handleInputChange = async (index: number, value: string) => {
    console.log("props.inputValues", props.inputValues);
    
    const updatedInputValues = [...props.inputValues];
    updatedInputValues[index] = value;
    console.log("updatedInputValues", updatedInputValues);
    props.setInputValues(updatedInputValues);
    
    const studentName = storeStudentsName[index];
    const groupId = props.selectedGroup._id; 
    console.log("inputValues" , props.inputValues);
  
    // Calculate the sum of all values
    const sum = updatedInputValues.reduce((acc, val) => acc + Number(val), 0);
    
    try {
      const response = await fetch("http://localhost:3002/studentData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          group: groupId,
          studentName: studentName,
          value: sum.toString(), // Store the sum of all values
        }),
      });
      
      if (response.ok) {
        console.log(`Stored student data for ${studentName}`);
      } else {
        console.error(`Failed to store student data for ${studentName}`);
      }
    } catch (error) {
      console.error(error);
    }
    
    handleOptionSelect(selectedQ+1)
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
      <h2 className="project-name">{groupTilte}</h2>
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
                                <input
                                 className="student-input" 
                                 value={props.inputValues[ind] || ''}
                                 onChange={(e) =>
                                   handleInputChange(ind, e.target.value)
                                }
                                 />
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
                          
                           {op.option}
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