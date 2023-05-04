
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentEvaluationPage from './pages/student-evaluation/student-evaluation.page';
import EvaluationPage from './pages/evaluation/evaluation.page';
import MyNavbar from './components/common/nav-bar/nav';
import GroupsPage from './pages/groups/groups.pages';
import SignInPage from './pages/sign-in/sign-in.page';
import FormsPage from './pages/forms/forms.page';
import HomePage from './pages/home/home.pages';

import './App.css';


function App() {
  return (
    <div className="App">
      <MyNavbar/>
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
