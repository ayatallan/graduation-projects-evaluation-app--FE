import { BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import MyNavbar from './components/common/nav-bar/nav';
import SignInPage from './pages/sign-in/sign-in.page';
import FormsPage from './pages/forms/forms.page';

import './App.css';
import { useEffect, useState } from 'react';
import HomePage from './pages/Home/Home.pages';
import GroupsPage from './pages/Groups/Groups.pages';
import EvaluationPage from './pages/Evaluation/Evaluation.page';
import StudentEvaluationPage from './pages/Student-Evaluation/student-evaluation.page';
import SoftwareReport from './components/common/questions/question';
import QuestionsForm from './components/common/questions/questions-form';
interface Question {
  question: string;
  options: string[];
}


function App() {

  // const navigate = useNavigate();
  const [initialLocation, setInitialLocation] = useState('');

  useEffect(() => {
    setInitialLocation(window.location.pathname);
  }, []);
  const Path: String = `${initialLocation}`;

  const [questions, setQuestions] = useState<Question[]>(() => {
    const savedQuestions = localStorage.getItem('questions');
    return savedQuestions ? JSON.parse(savedQuestions) : [];
  });

  const handleSubmit = (question: string, options: string[]) => {
    const newQuestion: Question = {
      question: question,
      options: options
    };

    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);

    // Save the updated questions to local storage
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));

    console.log('Updated Questions:', updatedQuestions);
    // navigate('/Questions');


  };

  return (
    <div className="App">
      <MyNavbar />
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/add-questions" element={<QuestionsForm onSubmit={handleSubmit} />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/Groups" element={<GroupsPage path={Path} />} />
          <Route path="/Forms" element={<FormsPage path={Path} />} />
          <Route path="/Questions" element={<SoftwareReport quizData={questions} path="/Questions" />} />
          <Route path="/Evaluation" element={<EvaluationPage />} />
          <Route path="/StudentEvaluation" element={<StudentEvaluationPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;