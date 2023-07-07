import { useEffect, useState } from 'react';
import { GroupInfo, Instructor, Student } from '../../interface';
import "./report.css";

const ReportPage = () => {
  const [groups, setGroups] = useState<GroupInfo[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGroups();
    fetchInstructors();
    fetchStudents();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch('http://localhost:3002/createGroup');
      const fetchedGroups = await response.json();
      setGroups(fetchedGroups);
    } catch (error) {
      console.error(error);
    }
  };

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

  const findStudent = (studentId: string) => {
    const student = students.find((student) => student._id === studentId);
    if (student) {
      return student.name;
    }
    return '';
  };

  const findInstructor = (instructorId: string) => {
    const instructor = instructors.find((instructor) => instructor._id === instructorId);
    if (instructor) {
      return instructor.name;
    }
    return '';
  };

  const saveTableAsCSV = (groupName: string, instructorName: string, studentData: string[][]) => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    // Create the CSV content
    csvContent += 'Group,Instructor,Student,Result\n';
    studentData.forEach((studentRow) => {
      const studentName = studentRow[0];
      const row = `"${groupName}","${instructorName}","${studentName}",\n`;
      csvContent += row;
    });

    // Create a temporary link element to download the CSV file
    const encodedURI = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedURI);
    link.setAttribute('download', `${groupName}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveAllTablesAsCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    csvContent += 'Group,Instructor,Student,Result\n';
    groups.forEach((group) => {
      const instructorName = findInstructor(group.instructor);
      group.students.forEach((studentId: any) => {
        const studentName = findStudent(studentId);
        const row = `"${group.groupName}","${instructorName}","${studentName}",\n`;
        csvContent += row;
      });
    });

    // Create a temporary link element to download the CSVfile
    const encodedURI = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedURI);
    link.setAttribute('download', 'all_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="wrapper">

      <div className="btnn">
        <button onClick={saveAllTablesAsCSV} className='quiz-btn'>Save All </button>

      </div>



      {groups.map((group, index) => (
        <div className="student-table-container" key={index}>
          <hr className='hr' />

          <p className='g-name'>Group :  {group.groupName}</p>
          <p className='i-name'><b className='g-name'>  Instructor :</b> {findInstructor(group.instructor)}</p>
          <table className="student-table">
            <thead className='thead'>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {group.students.map((student: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{findStudent(student)}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="btnn">
            <button
              className='quiz-btn'
              onClick={() => saveTableAsCSV(group.groupName, findInstructor(group.instructor),
                group.students.map((studentId: any) => [findStudent(studentId)]))} >
              Save
            </button>
          </div>


        </div>
      ))}
    </div>
  );
};

export default ReportPage;