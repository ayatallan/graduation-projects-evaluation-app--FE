import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MyNavbar from './components/common/nav-bar/nav';
import SignInPage from './pages/sign-in/sign-in.page';
import GroupsPage from './pages/Groups/Groups.pages';
import EvaluationPage from './pages/Evaluation/Evaluation.page';
import StudentEvaluationPage from './pages/Student-Evaluation/student-evaluation.page';

import './App.css';
import CreateInstructorPage from './pages/add-instructor/instructor.page';
import CreateStudentPage from './pages/add-student/student.page';
import CreateGroup from './pages/create-group/createGroup';
import MainDashboard from './pages/AdminDashboard/main-admin-dashbored/mainDashboard.page';
import StudentsPage from './pages/AdminDashboard/students/student.AdminPage';

import InstructorsPage from './pages/AdminDashboard/instructors/instructors.AdminPage';
import GroupsAdminPage from './pages/AdminDashboard/groups/groups.AdminPage';
import MajorsAdminPage from './pages/AdminDashboard/Majors/Majors.AdminPage';
import RubricsAdminPage from './pages/AdminDashboard/rubrics/Rubrics.AdminPage';

function App() {
  const [initialLocation, setInitialLocation] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  useEffect(() => {
    setInitialLocation(window.location.pathname);
  }, []);
  const Path: String = `${initialLocation}`;

  return (
    <div className="App">
   
      <BrowserRouter>
         <MyNavbar handleToggleSidebar={handleToggleSidebar}/>
        <Routes>
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/Groups" element={<GroupsPage path={Path} />} />
          <Route path="/Evaluation" element={<EvaluationPage />} />
          <Route path="/StudentEvaluation" element={<StudentEvaluationPage />} />
          <Route path="/add-instructor" element={<CreateInstructorPage />} />
          <Route path="/add-student" element={<CreateStudentPage />} />
          <Route path="/createGroup" element={<CreateGroup />} />
          <Route path="/AdminDashboard" element={<MainDashboard  showSidebar={showSidebar} setShowSidebar={setShowSidebar} handleToggleSidebar={handleToggleSidebar}/>}>
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
