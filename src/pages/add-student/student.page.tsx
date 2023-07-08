import React, { useState, useEffect } from 'react';
import '../../pages/add-student/student.css';
import { Student } from '../../interface';
import '../../components/common/questions/form.css'
import '../../components/common/questions/question.css'
import StudentForm from '../../components/common/students/students';

const CreateStudentPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/students');
        const retrievedStudents = await response.json();
        setStudents(retrievedStudents);
      } catch (error) {
        console.error('Error retrieving students:', error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (student: Student) => {
    try {
      const response = await fetch('http://localhost:3002/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      const createdStudent = await response.json();
      const updatedStudents = [...students, createdStudent];
      setStudents(updatedStudents);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="wrapper">
      <div className="btnn">
        <button className="quiz-btn" onClick={toggleForm}>
          Add Student
        </button>
      </div>

      {showForm && <StudentForm onSubmit={handleFormSubmit} />}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Major</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.major}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateStudentPage;