import { ChangeEvent, useState } from 'react';

import './createGroup'
import Select from '../../components/select/select.component';
interface Food {
    foodName: string;
  }

  interface SelectProps {
    name: string;
    label: string;
    value: number;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  }

const CreateGroup = () => {
    const [index, setIndex] = useState(0);
    const dataJson : any = localStorage.getItem('instructors');
    const data :Food[] = JSON.parse(dataJson);
    console.log(...data)
  return (
    <div>
       <Select
                  name="instructor"
                  label="Instructor"
                  value={index}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setIndex(Number(e.target.value))}>
                {data.map((data : any, index : any) =>
                   <option
                    key={index}
                    value={index} >{data.name}
                  </option>)}
              </Select>
    </div>
  )
}

export default CreateGroup;
