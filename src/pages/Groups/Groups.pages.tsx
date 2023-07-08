import { useEffect, useState } from 'react';
import './group.css';
import { Link } from 'react-router-dom';
import { Group, Student } from '../../interface';

const GroupsPage = (props:any) => {
  const [groupData, setGroupData] = useState<Group[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetchGroups();
    fetchStudents();
  }, []);
  
  const fetchGroups = async () => {
    try {
      const response = await fetch('http://localhost:3002/createGroup');
      if (response.ok) {
        const data = await response.json();
        setGroupData(data);
      } else {
        console.error('Failed to fetch groups');
      }
    } catch (error) {
      console.error('Failed to fetch groups:', error);
    }
  };

  const click = (group : any) => {
    props.setSelectedGroup(group)
  }

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
  
  return (
    <>
      <div className="groups">
      <h1 className="g">All Groups </h1>
        {groupData?.map((group: Group, index: number) => (
          <Link to={`/Questions?type=${group.type}&group=${group.groupName}&student=${group.students.map((s: any,ind : any) => {
            return findStudent(s);
          })}`} key={index} >
            <div className="button-group">
              <button  onClick={() => click(group)}>
                {group.groupName} <span>({group.type})</span>
              </button>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default GroupsPage;