
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/common/nav-bar/nav';
import SignInPage from './pages/sign-in/sign-in.page';
import FormsPage from './pages/forms/forms.page';
import HomePage from './pages/Home/Home.pages';
import GroupsPage from './pages/Groups/Groups.pages';
import EvaluationPage from './pages/Evaluation/Evaluation.page';
import StudentEvaluationPage from './pages/Student-Evaluation/student-evaluation.page';

import './App.css';
import { useEffect, useState } from 'react';
function App() {
  const [initialLocation, setInitialLocation] = useState('');
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData") 
    ? JSON.parse(localStorage.getItem("loginData")!)
    : null
  );

  useEffect(() => {
    if(!loginData) {
      
    }
  }, []);

  useEffect(() => {
    setInitialLocation(window.location.pathname);
  }, []);
  const Path: String = `${initialLocation}`;
  console.log(Path);
  
  const options = {
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // required
    auto_select: false, // optional
    cancel_on_tap_outside: false, // optional
    context: 'signin', // optional
  };

  return (
    <div className="App">
      <BrowserRouter>
      <MyNavbar />
        <Routes>
          <Route path="/Home" element={<HomePage path={Path} />} />
          <Route path="/" element={<SignInPage />} />
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/Groups" element={<GroupsPage path={Path} />} />
          <Route path="/Forms" element={<FormsPage path={Path} />} />
          <Route path="/Evaluation" element={<EvaluationPage />} />
          <Route path="/StudentEvaluation" element={<StudentEvaluationPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
