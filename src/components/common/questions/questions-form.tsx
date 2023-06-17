import React, { useState } from 'react';
import './form.css';

interface FormProps {
    onSubmit: (question: string, options: string[]) => void;
}

const QuestionsForm: React.FC<FormProps> = ({ onSubmit }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState<string[]>(['', '', '', '']);

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
    };

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedOptions = [...options];
        updatedOptions[index] = e.target.value;
        setOptions(updatedOptions);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(question, options);

        // Clear the input fields
        setQuestion('');
        setOptions(['', '', '', '']);
    };

    return (
        <>
        <form className="form" onSubmit={handleSubmit}>
            <label className="form-label">
                Question:
                <input className="form-input" type="text" value={question} onChange={handleQuestionChange} />
            </label>
            <br />
            {options.map((option, index) => (
                <label key={index} className="form-label">
                    Option {index + 1}:
                    <input className="form-input" type="text" value={option} onChange={(e) => handleOptionChange(e, index)} />
                </label>
            ))}
            <br />
            <button className="form-button" type="submit">Submit</button>
        </form>
            </>
    );
};

export default QuestionsForm;
