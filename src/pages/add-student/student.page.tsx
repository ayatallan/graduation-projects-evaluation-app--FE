import React, { useState, useEffect } from 'react';
import { Student } from '../../interface';
import '../../pages/add-student/student.css';
import StudentForm from '../../components/common/students/students';

const CreateStudentPage: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const existingData = localStorage.getItem('students');
        if (existingData) {
            const parsedData = JSON.parse(existingData);
            setStudents(parsedData);
        }
    }, []);

    const handleFormSubmit = (student: Student) => {
        const updatedStudents = [...students, student];
        setStudents(updatedStudents);
        setShowForm(false);
        saveToLocalStorage(updatedStudents);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const saveToLocalStorage = (data: Student[]) => {
        localStorage.setItem('students', JSON.stringify(data));
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
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Major</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.id}</td>
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
