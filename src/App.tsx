import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import MyNavbar from './components/common/nav-bar/nav';
import SignInPage from './pages/sign-in/sign-in.page';
import GroupsPage from './pages/Groups/Groups.pages';
import EvaluationPage from './pages/Evaluation/Evaluation.page';
import StudentEvaluationPage from './pages/Student-Evaluation/student-evaluation.page';
import SoftwareReport from './components/common/questions/question';
import QuestionsForm from './components/common/questions/questions-form';

import { Question } from './interface';

import './App.css';
import CreateInstructorPage from './pages/add-instructor/instructor.page';
import CreateStudentPage from './pages/add-student/student.page';

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:3002/questions');


      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (
    question: string,
    options: string[],
    type: string,
    Class: string,
    weight: number
  ) => {
    const newQuestion: Question = {
      id: Date.now(),
      question: question,
      options: options,
      type: type,
      Class: Class,
      weight: weight,
    };

    try {
      const response = await fetch('http://localhost:3002/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });

      if (!response.ok) {
        throw new Error('Failed to add question');
      }

      const data = await response.json();
      setQuestions((prevQuestions) => [...prevQuestions, data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <MyNavbar />
      <BrowserRouter>
        <Routes>
          <Route path="/add-questions" element={<QuestionsForm onSubmit={handleSubmit} />} />
          <Route path="/" element={<SignInPage />} />
          <Route path="/Groups" element={<GroupsPage />} />
          <Route path="/Questions" element={<SoftwareReport quizData={questions} />} />
          <Route path="/Evaluation" element={<EvaluationPage />} />
          <Route path="/StudentEvaluation" element={<StudentEvaluationPage />} />
          <Route path="/add-instructor" element={<CreateInstructorPage />} />
          <Route path="/add-student" element={<CreateStudentPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
