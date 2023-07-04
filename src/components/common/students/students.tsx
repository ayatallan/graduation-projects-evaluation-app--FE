import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Student, StudentFormProps } from '../../../interface';
import '../questions/form.css'
import '../questions/question.css'

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit }) => {
    const [student, setStudent] = useState<Student>({
        id: Date.now(),
        _id : '',
        name: '',
        email: '',
        major: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setStudent(prevStudent => ({
            ...prevStudent,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(student);
        clearForm(); // Clear the form inputs
    };

    const clearForm = () => {
        setStudent({
            id: Date.now(),
            _id : '',
            name: '',
            email: '',
            major: ''
        });
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="name">
                    Name:
                </label>
                <input
                    className="form-input"
                    type="text"
                    id="name"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                />
                <label className="form-label" htmlFor="email">
                    Email:
                </label>
                <input
                    className="form-input"
                    type="text"
                    id="email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                />
                <label className="form-label" htmlFor="major">
                    Major:
                </label>
                <select
                    className="form-input"
                    id="major"
                    name="major"
                    value={student.major}
                    onChange={handleChange}
                >
                    <option value="" disabled>
                        Select major
                    </option>
                    <option value="IT">IT</option>
                    <option value="CS">CS</option>
                    <option value="CSE">CSE</option>
                </select>
            <button className="form-button" type="submit">
                Create Student
            </button>
        </form>
    );
};

export default StudentForm;
