import './students.css'
import { useState } from 'react';
import * as XLSX from 'xlsx'
import InputFile from '../../components/common/input/inputfile';

const Students = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (e: any) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData: any = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  }
  return (
    <div className='students-table'>
      
      <div className='excel-file'>
        <InputFile
          name="upload"
          label="upload Student name file"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
        />
      </div>

      {data.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value: any, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Students;