
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import StudentEvaluationPage from './pages/Student-Evaluation/StudentEvaluation.page';
import EvaluationPage from './pages/Evaluation/Evaluation.page';
import GroupsPage from './pages/Groups/Groups.pages';
import SignInPage from './pages/SignIn/SignIn.page';
import FormsPage from './pages/Forms/Forms.page';
import MyNavbar from './components/common/nav';
import HomePage from './pages/Home/Home.pages';

import './App.css';

import Buttons from './components/common/buttons/buttons';
import MyNavbar from './components/common/nav-bar/nav';

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/Groups" element={<GroupsPage />} />
          <Route path="/Forms" element={<FormsPage />} />
          <Route path="/Evaluation" element={<EvaluationPage />} />
          <Route path="/StudentEvaluation" element={<StudentEvaluationPage />} />
        </Routes>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
