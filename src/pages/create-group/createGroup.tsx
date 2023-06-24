import { ChangeEvent, useState } from 'react';

import './createGroup.css'
import Select from '../../components/select/select.component';
import CheckBox from '../../components/common/toggle-bullets/check-box.component';
interface Name {
    name: string;
}
interface StudentName {
    name: string;
}

const CreateGroup = () => {
    const [index, setIndex] = useState(0);
    const dataJson: any = localStorage.getItem('instructors');
    const data: Name[] = JSON.parse(dataJson);

    const studentsJson: any = localStorage.getItem('students');
    const students: StudentName[] = JSON.parse(studentsJson);

    return (
        <div className="create-group">
            <Select
                name="instructor"
                label="Instructor"
                value={index}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setIndex(Number(e.target.value))}>
                {data.map((data: any, index: any) =>
                    <option
                        key={index}
                        value={index} >{data.name}
                    </option>)}
            </Select>
            <div className="student-name">

                {students.map((data: any, index: any) =>
                    <CheckBox
                        key={index}
                        value={index}
                        label={data.name}
                    />
                )}
            </div>

        </div>
    )
}

export default CreateGroup;
