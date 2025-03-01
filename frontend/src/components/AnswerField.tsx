import React, { useState } from 'react';
import { MdAttachFile } from 'react-icons/md';
import { MdMic } from 'react-icons/md';

interface AnswerFieldProps {
  onSubmit: (answer: string) => void;
}

const AnswerField: React.FC<AnswerFieldProps> = ({ onSubmit }) => {
  const [answer, setAnswer] = useState('');
  
  const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(answer); // Submit answer to the parent component (App.tsx)
    setAnswer(''); // Reset the answer field after submitting
  };

  return (
    <div className="answer-field">
      <textarea
        placeholder="Type your answer here..."
        value={answer}
        onChange={handleAnswerChange}
      />
      <div className="attachments">
        <button className="attachment-btn">
          <MdAttachFile />
        </button>
        <button className="record-btn">
          <MdMic />
        </button>
      </div>
      <button className="submit-btn" onClick={handleSubmit}>
        Submit Answer
      </button>
    </div>
  );
};

export default AnswerField;
