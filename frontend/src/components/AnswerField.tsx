import React, { useState } from "react";
import VoiceRecorder from "./VoiceRecorder";

interface AnswerFieldProps {
  onSubmit: (answer: string | null, audio: Blob | null) => void;
  loading: boolean;
}

const AnswerField: React.FC<AnswerFieldProps> = ({ onSubmit, loading }) => {
  const [answer, setAnswer] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const handleSubmit = () => {

    if (answer.trim() || audioBlob) {
      onSubmit(answer, audioBlob);
      setAudioBlob(null);
      setAnswer(""); // Clear input after sending
    }
  };

  return (
    <div className="answer-field">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Напишите развернутый ответ..."
        disabled={loading}
      />
      <VoiceRecorder onAudioReady={setAudioBlob} />
      <button className="npm submit-btn" onClick={handleSubmit} disabled={loading}>
        Ответить
      </button>
    </div>
  );
};

export default AnswerField;
