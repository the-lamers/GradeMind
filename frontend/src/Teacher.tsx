import React, { useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Header from './components/Header';
import Question from './components/Question';
import AnswerField from './components/AnswerField';

interface ApiResponse {
  reply: string;
}

const App: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // New state for grading criteria and file attachment
  const [gradingCriteria, setGradingCriteria] = useState<string>('');
  const [fileAttachment, setFileAttachment] = useState<File | null>(null);

  // Handler to manage file attachment
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileAttachment(file);
    }
  };

  // Handler to submit grading criteria and file (if any)
  const handleGradingSubmit = async () => {
    if (!gradingCriteria.trim() && !fileAttachment) {
      alert('Please provide grading criteria or attach a file.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    if (gradingCriteria.trim()) {
      formData.append('gradingCriteria', gradingCriteria);
    }
    if (fileAttachment) {
      formData.append('file', fileAttachment, fileAttachment.name);
    }

    try {
      const res = await fetch("http://localhost:5000/api/teacher", {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      alert('Grading criteria and file uploaded successfully!');
    } catch (error) {
      console.error("Error submitting grading criteria:", error);
      alert("Failed to submit grading criteria or file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header taskName="Гражданское право/ Введение/ Занятие 1" />

      {/* Teacher Section - Grading Criteria & File Upload */}
      <div className="teacher-section">
        <h3>Критерии оценки</h3>
        <textarea
          value={gradingCriteria}
          onChange={(e) => setGradingCriteria(e.target.value)}
          placeholder="Опишите критерии оценки для данной задачи..."
          rows={5}
        />
        
        <div className="file-upload">
          <label htmlFor="file">Прикрепить файл</label>
          <input
            type="file"
            id="file"
            accept=".pdf,.docx,.txt" // specify allowed file types
            onChange={handleFileChange}
          />
        </div>

        <button onClick={handleGradingSubmit} disabled={loading} className="submit-btn">
          {loading ? "Загрузка..." : "Отправить"}
        </button>
      </div>
    </div>
  );
};

export default App;
