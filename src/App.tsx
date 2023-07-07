import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MyNavbar from './components/common/nav-bar/nav';
import SignInPage from './pages/sign-in/sign-in.page';
import GroupsPage from './pages/Groups/Groups.pages';
import ReportPage from './pages/Report/report.page';

import './App.css';
import CreateInstructorPage from './pages/add-instructor/instructor.page';
import CreateStudentPage from './pages/add-student/student.page';
import CreateGroup from './pages/create-group/createGroup';
import { Group, Question } from './interface';
import SoftwareReport from './components/common/questions/question';
import QuestionsForm from './components/common/questions/questions-form';

function App() {
  const [questions, setQuestions] = useState<Question[]>(() => {
    const savedQuestions = localStorage.getItem('questions');
    return savedQuestions ? JSON.parse(savedQuestions) : [];
  });

  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Object>({});
  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  // const navigate=useNavigate();

  const handleSubmit = async (
    question: string,
    options: { option: string; weight: number; }[],
    type: string,
    Class: string,
    weight: number
  ) => {
    const newOptions = options?.map((option, index) => ({
      option: option.option,
      weight: index + 1, // Set the weight equal to the index + 1
    }));
    const newQuestion: Question = {
      id: Date.now(),
      question: question,
      options: newOptions,
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
      // navigate('./Questions')
      console.error(error);
    }
  };



  return (
    <div className="App">
      <BrowserRouter>
        <MyNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} handleToggleSidebar={handleToggleSidebar} />
        <Routes>
          <Route path="/add-questions" element={<QuestionsForm onSubmit={handleSubmit} />} />
          <Route path="/" element={<SignInPage />} />
          <Route path="/Groups" element={<GroupsPage setSelectedGroup={setSelectedGroup} selectedGroup={selectedGroup}/>} />
          <Route path="/Questions" element={<SoftwareReport quizData={questions} path="/Questions"  selectedGroup={selectedGroup}/>} />
          <Route path="/Report" element={<ReportPage />} />
          <Route path="/add-instructor" element={<CreateInstructorPage />} />
          <Route path="/add-student" element={<CreateStudentPage />} />
          <Route path="/createGroup" element={<CreateGroup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
