import React from 'react';
import { Card } from 'react-bootstrap';

interface GroupCardProps {
  instructor: string;
  students: string[];
}

const GroupCard: React.FC<GroupCardProps> = ({ instructor, students }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Selected Instructor:</Card.Title>
        <Card.Text>{instructor}</Card.Text>
        <Card.Title>Selected Students:</Card.Title>
        <ul>
          {students.map((student, index) => (
            <li key={index}>{student}</li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default GroupCard;
