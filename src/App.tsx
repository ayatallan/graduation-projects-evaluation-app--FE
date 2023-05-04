import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MyNavbar from './components/common/nav';
import HomePage from './pages/Home/Home.pages';
import GroupsPage from './pages/Groups/Groups.pages';
import FormsPage from './pages/Forms/Forms.page';
import EvaluationPage from './pages/Evaluation/Evaluation.page';
import StudentEvaluationPage from './pages/Student-Evaluation/StudentEvaluation.page';

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
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
