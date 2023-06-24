
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/common/nav-bar/nav';
import SignInPage from './pages/sign-in/sign-in.page';
import FormsPage from './pages/forms/forms.page';
import HomePage from './pages/Home/Home.pages';
import GroupsPage from './pages/Groups/Groups.pages';
import EvaluationPage from './pages/Evaluation/Evaluation.page';
import StudentEvaluationPage from './pages/Student-Evaluation/student-evaluation.page';
import MainDashboard from './pages/AdminDashboard/main-admin-dashbored/mainDashboard.page';
import StudentsPage from './pages/AdminDashboard/students/student.AdminPage';

import './App.css';
import { useEffect, useState } from 'react';
import InstructorsPage from './pages/AdminDashboard/instructors/instructors.AdminPage';
import GroupsAdminPage from './pages/AdminDashboard/groups/groups.AdminPage';
import MajorsAdminPage from './pages/AdminDashboard/Majors/Majors.AdminPage';
import RubricsAdminPage from './pages/AdminDashboard/rubrics/Rubrics.AdminPage';

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
          <Route path="/Evaluation" element={<EvaluationPage />} />
          <Route path="/StudentEvaluation" element={<StudentEvaluationPage />} />
          <Route path="/AdminDashboard" element={<MainDashboard/>}>
            <Route path="StudentsPage" element={<StudentsPage />} />
            <Route path="InstructorsPage" element={<InstructorsPage/>} />
            <Route path="GroupsAdminPage" element={<GroupsAdminPage/>} />
            <Route path="MajorsAdminPage" element={<MajorsAdminPage/>} />
            <Route path="RubricsAdminPage" element={<RubricsAdminPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
