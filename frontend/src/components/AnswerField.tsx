import React, { useState } from "react";

interface AnswerFieldProps {
  onSubmit: (answer: string) => void;
  loading: boolean;
}

const AnswerField: React.FC<AnswerFieldProps> = ({ onSubmit, loading }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmit(answer);
      setAnswer(""); // Clear input after sending
    }
  };

  return (
    <div className="answer-field">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer..."
        disabled={loading}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Waiting..." : "Submit"}
      </button>
    </div>
  );
};

export default AnswerField;
