import React, { useEffect, useState } from 'react';
import './group.css';
import Buttons from '../../components/common/buttons/buttons';

export interface Group {
  groupName: string;
}

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
    <div className='groups'>
      {groupData.map((group: Group, index: number) => (
        <Buttons text={group.groupName} />
      ))}
    </div>
  );
};

export default GroupsPage;
