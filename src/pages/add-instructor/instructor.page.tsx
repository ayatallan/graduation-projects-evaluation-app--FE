import React, { useState, useEffect } from 'react';
import { Instructor } from '../../interface';
import InstructorForm from '../../components/common/instructors/instructors';
import '../../pages/add-instructor/instructor.css';

const CreateInstructorPage: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Load data from local storage when component mounts
    const existingData = localStorage.getItem('instructors');
    if (existingData) {
      const parsedData = JSON.parse(existingData);
      setInstructors(parsedData);
    }
  }, []);

  const handleFormSubmit = (instructor: Instructor) => {
    setInstructors(prevInstructors => [...prevInstructors, instructor]);
    setShowForm(false); // Hide the form after submitting
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const saveToLocalStorage = (data: Instructor[]) => {
    localStorage.setItem('instructors', JSON.stringify(data));
  };

  return (
    <div className="wrapper">
      <div className="btnn">
        <button className="quiz-btn" onClick={toggleForm}>
          Add Instructor
        </button>
      </div>

      {showForm && <InstructorForm onSubmit={handleFormSubmit} />}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map(instructor => (
            <tr key={instructor.id}>
              <td>{instructor.id}</td>
              <td>{instructor.name}</td>
              <td>{instructor.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateInstructorPage;
