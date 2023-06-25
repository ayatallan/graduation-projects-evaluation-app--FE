import React, { ChangeEvent, useState, useEffect } from 'react';
import './createGroup.css';
import Select from '../../components/select/select.component';
import CheckBox from '../../components/common/toggle-bullets/check-box.component';
import { Name, StudentName } from '../../interface';
import { Card } from 'react-bootstrap';

const CreateGroup = () => {
  const [showForm, setShowForm] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');
  const [groupData, setGroupData] = useState<{ groupName: string; instructor: string; students: string[] }[]>([]);
  const dataJson: any = localStorage.getItem('instructors');
  const data: Name[] = JSON.parse(dataJson);

  const studentsJson: any = localStorage.getItem('students');
  const students: StudentName[] = JSON.parse(studentsJson);

  useEffect(() => {
    const groupDataJson: any = localStorage.getItem('groupData');
    if (groupDataJson) {
      const storedGroupData: { groupName: string; instructor: string; students: string[] }[] = JSON.parse(groupDataJson);
      setGroupData(storedGroupData);
      setSubmit(true);
    }
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudents.length >= 2 && groupName.trim() !== '') {
      const instructorName = data[index]?.name;
      const group = { groupName, instructor: instructorName, students: selectedStudents };
      setGroupData((prevGroupData) => [...prevGroupData, group]);
      saveGroupDataToLocalStorage([...groupData, group]);
      clearForm();
      setSubmit(true);
    } else {
      alert('Please enter a group name and select at least two students');
    }
  };

  const saveGroupDataToLocalStorage = (data: { groupName: string; instructor: string; students: string[] }[]) => {
    localStorage.setItem('groupData', JSON.stringify(data));
  };

  const clearForm = () => {
    setIndex(0);
    setSelectedStudents([]);
    setGroupName('');
  };

  return (
    <div className="create-group">
      <div className="form-group">
      <div className="btnn">
        <button className="quiz-btn" onClick={toggleForm}>
          Create Group
        </button>
      </div>
      {showForm && (
          <form onSubmit={handleSubmit}>
            <div className="group-name">
              <label htmlFor="group-name">Project Name:</label>
              <input
                type="text"
                id="group-name"
                value={groupName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setGroupName(e.target.value)}
              />
            </div>
            <Select
              name="instructor"
              label="Instructor"
              value={index}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setIndex(Number(e.target.value))}
            >
              {data.map((data: Name, index: number) => (
                <option key={index} value={index}>
                  {data.name}
                </option>
              ))}
            </Select>
            <div className="student-name">
              {students.map((data: StudentName, index: number) => (
                                <CheckBox
                                key={index}
                                value={index}
                                label={data.name}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                  if (event.target.checked) {
                                    setSelectedStudents((prevStudents) => [...prevStudents, data.name]);
                                  } else {
                                    setSelectedStudents((prevStudents) =>
                                      prevStudents.filter((student) => student !== data.name)
                                    );
                                  }
                                }}
                              />
                            ))}
                          </div>
                          <button type="submit">Submit</button>
                        </form>
                    )}
                    </div>
                    {submit && (
                      <div className='group-card'>
                        {groupData.map((group, index) => (
                          <Card key={index}>
                            <Card.Body>
                              <Card.Title>{group.groupName}</Card.Title>
                              <Card.Text>
                                <strong>Instructor: </strong> {group.instructor}
                              </Card.Text>
                              <Card.Text>
                                <strong>Students:</strong>
                              </Card.Text>
                              <ul>
                                {group.students.map((student, studentIndex) => (
                                  <li key={studentIndex}>{student}</li>
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
            