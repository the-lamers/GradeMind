import React from 'react';

interface QuestionProps {
  questionText: string;
}

const Question: React.FC<QuestionProps> = ({ questionText }) => {
  return (
    <div className="question-container">
      <p>{questionText}</p>
    </div>
  );
};

export default Question;
