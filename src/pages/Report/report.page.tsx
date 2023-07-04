import React from 'react';
import "./report.css";
import { StudentReportInfo } from '../../interface';
const ReportPage = () => {

  const students:StudentReportInfo [] = [
    {
      id: 1,
      name: "John Doe",
      groupName: "Group A",
      result: 85,
      instructorName: "Jane Smith",
    },
    {
      id: 2,
      name: "Alice Johnson",
      groupName: "Group B",
      result: 92,
      instructorName: "Bob Anderson",
    },
    // Add more student objects here...
  ];
  return (
    <div className="student-table-container">
    <table className="student-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Group Name</th>
          <th>Result</th>
          <th>Instructor Name</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.groupName}</td>
            <td>{student.result}</td>
            <td>{student.instructorName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
  
}

export default ReportPage;
