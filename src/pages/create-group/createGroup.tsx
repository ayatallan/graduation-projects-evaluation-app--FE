import React, { ChangeEvent, useState, useEffect } from 'react';
import './createGroup.css';
import Select from '../../components/select/select.component';
import CheckBox from '../../components/common/toggle-bullets/check-box.component';
import { Name, StudentName } from '../../interface';
import { Card } from 'react-bootstrap';

const CreateGroup = () => {
  const [showForm, setShowForm] = useState(false);
  const [showBG, setShowBG] = useState(false);
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
    setShowBG(!showBG);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudents.length >= 2 && selectedStudents.length <= 3 && groupName.trim() !== '') {
      const instructorName = data[index]?.name;
      const group = { groupName, instructor: instructorName, students: selectedStudents };
      setGroupData((prevGroupData) => [...prevGroupData, group]);
      saveGroupDataToLocalStorage([...groupData, group]);
      clearForm();
      setSubmit(true);
      setShowForm(false);
      setShowBG(false);
    } else if (selectedStudents.length < 2) {
      alert('Please select at least two students');
    } else if (selectedStudents.length > 3) {
      alert('Please select at most three students');
    } else {
      alert('Please enter a group name');
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
              name="instructor"
              label="Instructor"
              required
              value={index}
              className="my-input"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setIndex(Number(e.target.value))}
            >
              {data?.map((data: Name, index: number) => (

                <option key={index} value={index} >
                  {data.name}
                </option>
              ))}
            </Select>
            <label htmlFor="" className="my-label">
              Students :
            </label>
            <div className="student-name">
              {students?.map((data: StudentName, index: number) => (
                <CheckBox
                  key={index}
                  value={index}
                  label={data.name}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.checked) {
                      if (selectedStudents.length < 3) {
                        setSelectedStudents((prevStudents) => [...prevStudents, data.name]);
                      } else {
                        event.target.checked = false; // Uncheck the checkbox if the limit is exceeded
                        alert('You can select at most three students');
                      }
                    } else {
                      setSelectedStudents((prevStudents) =>
                        prevStudents.filter((student) => student !== data.name)
                      );
                    }
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
        {submit && (
          <div className="group-card">
            {groupData?.map((group, index) => (
              <Card key={index}>
                <Card.Body>
                  <Card.Title>{group.groupName}</Card.Title>
                  <Card.Text>
                    <strong>Instructor: </strong> 
                    <div className='name'>" {group.instructor}"</div>
                  </Card.Text>
                  <Card.Text>
                    <strong>Students:</strong>
                  </Card.Text>
                  <ul className="my-ul">
                    {group.students.map((student, studentIndex) => (
                      <li className="my-li" key={studentIndex}>
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
    </>
  );
};

export default CreateGroup;
