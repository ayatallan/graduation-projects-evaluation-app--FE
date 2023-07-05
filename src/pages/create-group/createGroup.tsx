import React, { ChangeEvent, useState, useEffect } from 'react';
import './createGroup.css';
import { Group, Instructor, Name, Student, StudentName } from '../../interface';
import { Card } from 'react-bootstrap';
import Select from '../../components/select/select.component';
import CheckBox from '../../components/common/toggle-bullets/check-box.component';

const CreateGroup = () => {
  const [showForm, setShowForm] = useState(false);
  const [showBG, setShowBG] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const [indexType, setIndexType] = useState(-1);
  const [groups, setGroups] = useState<Group[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState('');
  const [Class, setClass] = useState<String[]>([
    "Introduction",
    "Graduation Project"
  ]);


  useEffect(() => {
    fetchInstructors();
    fetchStudents();
    fetchGroupData();
  }, []);


  const fetchInstructors = async () => {
    try {
      const response = await fetch('http://localhost:3002/instructors');
      if (response.ok) {
        const data = await response.json();
        setInstructors(data);
      } else {
        setError('Failed to fetch instructors');
      }
    } catch (error) {
      setError('Failed to fetch instructors');
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3002/students');
      const retrievedStudents = await response.json();
      setStudents(retrievedStudents);
    } catch (error) {
      console.error('Error retrieving students:', error);
    }

  };

  const fetchGroupData = async () => {
    try {
      const response = await fetch('http://localhost:3002/createGroup');
      const data = await response.json();
      setGroups(data);
      setSubmit(true);
    } catch (error) {
      setError('Failed to fetch group data');
    }
  };


  const toggleForm = () => {
    setShowForm(!showForm);
    setShowBG(!showBG);
  };

  const findStudent = (studentId: string) => {
    const student = students.find((student) => student._id === studentId);
    if (student) {
      return student.name;
    }
    return '';
  };
  const findInstructor = (instructorId: any) => {
    const instructor = instructors.find((instructors) => instructors._id === instructorId);
    if (instructor) {
      return instructor.name;
    }
    return '';
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudents.length >= 2 && selectedStudents.length <= 3 && groupName.trim() !== '') {
      const instructorName = instructors[index]?._id;
      const typeName = Class[indexType];
      const selectedStudentObjects = selectedStudents.map((selectedStudentId) =>
        students.find((student) => student._id === selectedStudentId)
      );

      const group = {
        id: Date.now(),
        groupName,
        students: selectedStudentObjects,
        instructor: instructorName,
        type: typeName
      };

      try {
        const response = await fetch('http://localhost:3002/createGroup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(group),
        });
        if (response.ok) {
          const updatedGroupData = await response.json();
          setGroups((prevGroups) => [...prevGroups, updatedGroupData]);
          clearForm();
          setSubmit(true);
          setShowForm(false);
          setShowBG(false)
          
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to create group');
        }
      } catch (error) {
        setError('Failed to create group');
      }
    } else if (selectedStudents.length < 2) {
      alert('Please select at least two students');
    } else if (selectedStudents.length > 3) {
      alert('Please select at most three students');
    } else {
      alert('Please enter a group name');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, studentId: string) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      if (selectedStudents.length < 3) {
        setSelectedStudents((prevStudents) => [...prevStudents, studentId]);
      } else {
        event.target.checked = false;
        alert('You can select at most three students');
      }
    } else {
      setSelectedStudents((prevStudents) => prevStudents.filter((student) => student !== studentId));
    }
  };

  const clearForm = () => {
    setIndex(0);
    setSelectedStudents([]);
    setGroupName('');
  };

  return (
    <>
      {showBG && <div className="create-group" onClick={toggleForm}></div>}

      <div className={`form-group ${showForm ? 'active' : ''}`} onAuxClick={toggleForm}>
        <div className="btnn1">
          <button className="quiz-btn1" onClick={toggleForm}>
            Create Group
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} className="my-form">
            <div className="group-name">
              <label htmlFor="group-name" className="my-label">
                Project Name:
              </label>
              <input
                type="text"
                required
                id="group-name"
                value={groupName}
                className="my-input"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setGroupName(e.target.value)}
              />
            </div>
            <Select
              name="Type"
              label="Type"
              value={indexType}
              className="my-input"

              onChange={(e: ChangeEvent<HTMLSelectElement>) => setIndexType(Number(e.target.value))}
            >
              {Class.map((ele, index) =>
                <option key={index} value={index}>
                  {ele}
                </option>
              )}
            </Select>
            <Select
              name="instructor"
              label="Instructor"
              required
              value={index}
              className="my-input"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setIndex(Number(e.target.value))}
            >
            {instructors?.map((instructor, index) => (
                <option key={index} value={index}>
                  {instructor.name}
                </option>
              ))}
            </Select>
            <label htmlFor="" className="my-label">
              Students :
            </label>
            <div className="student-name">
              {students?.map((student, index) => (
                <CheckBox
                  key={index}
                  value={index}
                  label={student.name}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleChange(event,student._id);

                  }}
                />
              ))}
            </div>
            <div className="stl">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        )}
        {error && <div>Error: {error}</div>}
        {submit && (
          <div className="group-card">
            {groups?.map((group, index) => (
              <Card key={index}>
                <Card.Body>
                  <Card.Title>{group.groupName}</Card.Title>
                  <Card.Text>
                    <strong>Instructor: </strong>
                    <div className='name'>"  {findInstructor(group.instructor)}"</div>
                  </Card.Text>
                  <Card.Text>
                    <strong>Students:</strong>
                  </Card.Text>
                  <ul className="my-ul">
                    {group.students.map((student: any, studentIndex: number) => (
                      <li className="my-li" key={studentIndex} value={studentIndex}>
                        {findStudent(student)}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CreateGroup;
