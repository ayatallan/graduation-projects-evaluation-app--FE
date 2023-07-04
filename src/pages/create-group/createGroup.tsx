import React, { ChangeEvent, useState, useEffect } from 'react';
import './createGroup.css';
import Select from '../../components/select/select.component';
import CheckBox from '../../components/common/toggle-bullets/check-box.component';
import { Card } from 'react-bootstrap';
import { Group, Instructor, Student } from '../../interface';

const CreateGroup = () => {
  const [showForm, setShowForm] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [index, setIndex] = useState(-1);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState('');

  console.log("group", groups);
  
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
      // console.log('Retrieved Students:', retrievedStudents);

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudents.length >= 2 && selectedStudents.length <= 3 && groupName.trim() !== '') {
      const instructorName = instructors[index]?._id;
      console.log('Selected Students:', selectedStudents);

      const selectedStudentObjects = selectedStudents.map((selectedStudentId) =>
        students.find((student) => student._id === selectedStudentId)
      );
      console.log('Selected Student Objects:', selectedStudentObjects);

      const group = {
        id: Date.now(),
        groupName,
        students: selectedStudentObjects,
        instructor: instructorName,
      };

      console.log('JSON:', JSON.stringify(group));


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
          console.log("response",response);
          
          // console.log("prevGroups",groups);
          setGroups((prevGroups) => [...prevGroups, updatedGroupData]);
          // console.log("after",groups);
          clearForm();
          setSubmit(true);
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

  const clearForm = () => {
    setIndex(-1);
    setSelectedStudents([]);
    setGroupName('');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, studentId: string) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      if (selectedStudents.length < 3) {
        setSelectedStudents((prevStudents) => [...prevStudents, studentId]);
        console.log('Selected Students:', selectedStudents);

      } else {
        event.target.checked = false;
        alert('You can select at most three students');
      }
    } else {
      setSelectedStudents((prevStudents) => prevStudents.filter((student) => student !== studentId));
    }
  };



  return (
    <div className="create-group">
      <div className="form-group">
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
              name="instructor"
              label="Instructor"
              // required
              value={index}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setIndex(Number(e.target.value))}
            >
              {instructors?.map((instructor, index) => (
                <option key={index} value={index}>
                  {instructor.name}
                </option>
              ))}
            </Select>
            <div className="student-name">
              {students?.map((student, index) => (
                <CheckBox
                  key={index}
                  value={index}
                  label={student.name}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, student._id)}
                />
              ))}

            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
      {error && <div>Error: {error}</div>}
      {submit && (
        <div className="group-card">
          {groups?.map((group, index) => (
            <Card key={index}>
              <Card.Body>
                <Card.Title>{group.groupName}</Card.Title>
                <Card.Text>
                  <strong>Instructor: </strong> {group.instructor}
                </Card.Text>
                <Card.Text>
                  <strong>Students:</strong>
                </Card.Text>
                <ul className="my-ul">
                  {group.students.map((student : any, studentIndex : any) => (
                    <li className="my-li" key={studentIndex} value={studentIndex}>
                    {student}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};

export default CreateGroup;