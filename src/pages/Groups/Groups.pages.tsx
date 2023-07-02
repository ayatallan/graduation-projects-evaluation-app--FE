import React, { useEffect, useState } from 'react'
import './group.css'
import { Link } from 'react-router-dom'
import Buttons from '../../components/common/buttons/buttons'
import { Group } from '../../interface'

const GroupsPage = (props: any) => {
  const [groupData, setGroupData] = useState<Group[]>([]);

  useEffect(() => {
    const storedGroupData = localStorage.getItem('groupData');
    if (storedGroupData) {
      const parsedGroupData: Group[] = JSON.parse(storedGroupData);
      setGroupData(parsedGroupData);
    }
  }, []);
  return (
    <>
      <p className='path'>{props.path}</p>
      <div className='groups'>
        {groupData.map((group: Group, index: number) => (
          <Buttons text={group.groupName} key={index} />
        ))}
      </div>



    </>

  )
}

export default GroupsPage;
