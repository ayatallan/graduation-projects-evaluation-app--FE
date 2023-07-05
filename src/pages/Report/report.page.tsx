import { useEffect, useState } from 'react';
import "./report.css";
import { GroupInfo, Instructor, Student } from '../../interface';

type ReportPageProps = {
  weightSum: number;
};

const ReportPage: React.FC<ReportPageProps> = ({ weightSum }) => {
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

  return (
    <div>
      {groups.map((group , index) => (
        <div className="student-table-container" key={index}>
          <p>Group: {group.groupName}</p>
          <p>insructor Name : {findInstructor(group.instructor)}</p>
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {group.students.map((student : any , index : number) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                  <td>{findStudent(student)}</td>
                  <td>{weightSum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ReportPage;