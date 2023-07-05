import React, { useEffect, useState } from 'react';
import './group.css';
import { Link } from 'react-router-dom';
import Buttons from '../../components/common/buttons/buttons';
import { Group } from '../../interface';

const GroupsPage = (props:any) => {
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

  const click = (group : any) => {
    props.setSelectedGroup(group)
    console.log(group);
    
  }

  return (
    <>
      <p className="path">Groups Page</p>
      <div className="groups">
        {groupData?.map((group: Group, index: number) => (
          <Link to={`/Questions?type=${group.type}&group=${group.groupName}`} key={index} >
            <button onClick={() => click(group)}>{group.groupName}</button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default GroupsPage;