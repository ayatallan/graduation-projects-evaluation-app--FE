import React, { useState, useEffect } from 'react';
import { Instructor } from '../../interface';
import InstructorForm from '../../components/common/instructors/instructors';
import '../../pages/add-instructor/instructor.css';

const CreateInstructorPage: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showBG, setShowBG] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/instructors');
        const retrievedInstructors = await response.json();
        setInstructors(retrievedInstructors);
      } catch (error) {
        console.error('Error retrieving instructors:', error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (instructorData: { name: string; email: string }) => {
    const instructor: Instructor = {
      _id : '',
      id: Date.now(),
      name: instructorData.name,
      email: instructorData.email,
    };

    try {
      const response = await fetch('http://localhost:3002/instructors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(instructor),
      });

      if (response.ok) {
        const createdInstructor = await response.json();
        const updatedInstructors = [...instructors, createdInstructor];
        setInstructors(updatedInstructors);
        setShowForm(false);
        setShowBG(!showBG);

      } else {
        console.error('Error creating instructor:', response.status);
      }
    } catch (error) {
      console.error('Error creating instructor:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setShowBG(!showBG);

  };

  return (
    <>
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
            {instructors.map((instructor, index) => (
              <tr key={index}>
                <td>{instructor.id}</td>
                <td>{instructor.name}</td>
                <td>{instructor.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CreateInstructorPage;