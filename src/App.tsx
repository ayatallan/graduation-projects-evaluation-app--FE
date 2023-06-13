
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/common/nav-bar/nav';
import SignInPage from './pages/sign-in/sign-in.page';
import FormsPage from './pages/forms/forms.page';
import HomePage from './pages/Home/Home.pages';
import GroupsPage from './pages/Groups/Groups.pages';
import EvaluationPage from './pages/Evaluation/Evaluation.page';


import './App.css';
import { useEffect, useState } from 'react';
import Students from './pages/students/studentspage';
import StudentEvaluationPage from './pages/Student-Evaluation/student-evaluation.page';
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
          <Route path="/students" element={<Students />} />
          <Route path="/Evaluation" element={<EvaluationPage />} />
          <Route path="/StudentEvaluation" element={<StudentEvaluationPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
