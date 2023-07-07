import React, { useState } from 'react';
import './form.css';
import { FormProps } from '../../../interface';

const QuestionsForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<{ option: string; weight: number }[]>([
    { option: '', weight: 0 },
    { option: '', weight: 0 },
    { option: '', weight: 0 },
    { option: '', weight: 0 },
  ]);
  const [type, setType] = useState('');
  const [weight, setWeight] = useState(0);
  const [Class, setClass] = useState('');

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedOptions = [...options];
    updatedOptions[index].option = e.target.value;
    setOptions(updatedOptions);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value));
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClass(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(question, options, type, Class, weight);

    // Clear the input fields
    setType('');
    setWeight(0);
    setClass('');
    setQuestion('');
    setOptions([
      { option: '', weight: 0 },
      { option: '', weight: 0 },
      { option: '', weight: 0 },
      { option: '', weight: 0 },
    ]);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="box">
          <div className="sub-box">
            <label className="form-label">
              Question:
              <input
                required
                className="form-input"
                type="text"
                value={question}
                onChange={handleQuestionChange}
              />
            </label>
            <br />
            {options.map((option, index) => (
              <label key={index} className="form-label">
                Option {index + 1}:
                <input
                  required
                  className="form-input"
                  type="text"
                  value={option.option}
                  onChange={(e) => handleOptionChange(e, index)}
                />
              </label>
            ))}
          </div>
          <br />

          <div className="sub-box">
            <label className="form-label">
              Weight:
              <input
                className="form-input"
                required
                type="number"
                value={weight}
                onChange={handleWeightChange}
              />
            </label>
            <label className="form-label">
              Class:
              <input
                className="form-input"
                required
                type="text"
                value={Class}
                onChange={handleClassChange}
              />
            </label>
            <label className="form-label">
              Type:
              <select className="form-input" required value={type} onChange={handleTypeChange}>
                <option value="" disabled>
                  Select type
                </option>
                <option value="Personal Question">Personal Question</option>
                <option value="Public">Public</option>
              </select>
            </label>
          </div>
        </div>
        <button className="form-button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default QuestionsForm;
