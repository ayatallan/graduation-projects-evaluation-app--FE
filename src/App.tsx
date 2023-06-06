
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/common/nav-bar/nav';
import SignInPage from './pages/sign-in/sign-in.page';
import FormsPage from './pages/forms/forms.page';

import './App.css';
import { useEffect, useState } from 'react';
import Quiz from './components/common/questions/question';
import HomePage from './pages/home/Home.pages';
import GroupsPage from './pages/groups/Groups.pages';
import EvaluationPage from './pages/evaluation/Evaluation.page';
import StudentEvaluationPage from './pages/student-evaluation/student-evaluation.page';
function App() {
  const [initialLocation, setInitialLocation] = useState('');

  useEffect(() => {
    setInitialLocation(window.location.pathname);
  }, []);
  const Path: String = `${initialLocation}`;

  return (
    <div className="App">
      <MyNavbar />
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/Groups" element={<GroupsPage path={Path} />} />
          <Route path="/Forms" element={<FormsPage path={Path} />} />
          <Route path="/Questions" element={<Quiz path={Path}  />} />
          <Route path="/Evaluation" element={<EvaluationPage />} />
          <Route path="/StudentEvaluation" element={<StudentEvaluationPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
