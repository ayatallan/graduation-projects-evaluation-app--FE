import React, { useEffect, useState } from 'react';
import './group.css';
import { Link } from 'react-router-dom';
import Buttons from '../../components/common/buttons/buttons';
import { Group } from '../../interface';

const GroupsPage = () => {
  const [groupData, setGroupData] = useState<Group[]>([]);

  useEffect(() => {
    fetchGroups();
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

  return (
    <>
      <p className="path">Groups Page</p>
      <div className="groups">
        {groupData?.map((group: Group, index: number) => (
          <Link to={`/Questions?type=${group.type}`} key={index}>
            <Buttons text={group.groupName} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default GroupsPage;