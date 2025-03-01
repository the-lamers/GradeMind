import React from 'react';

const AnswerField: React.FC = () => {
  return (
    <div className="answer-field">
      <textarea placeholder="Type your answer here..." />
      <div className="attachments">
        <button className="attachment-btn">Attach File</button>
        <button className="record-btn">Record Audio/Video</button>
      </div>
    </div>
  );
};

export default AnswerField;
