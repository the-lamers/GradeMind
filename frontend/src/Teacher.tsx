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

  const handleAnswerSubmit = async (answer: string | null, audio: Blob | null) => {
    if (!answer?.trim() && !audio) return;

    setLoading(true);
    setResponse(null); // Reset previous response

    try {
      const formData = new FormData();
      if (answer) {
        formData.append("answer", answer);
      }
      if (audio) {
        formData.append("audio", audio, "recording.webm");
      }

      const res = await fetch("http://localhost:5000/api/teacher", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data: ApiResponse = await res.json();
      setResponse(data.reply); // Assume API returns { reply: "Processed answer" }
    } catch (error) {
      setResponse("Error receiving response.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

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
      const res = await fetch("http://localhost:5000/upload-grading", {
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
        <h3>Grading Criteria</h3>
        <textarea
          value={gradingCriteria}
          onChange={(e) => setGradingCriteria(e.target.value)}
          placeholder="Write grading criteria here..."
          rows={5}
        />
        
        <div className="file-upload">
          <label htmlFor="file">Attach File</label>
          <input
            type="file"
            id="file"
            accept=".pdf,.docx,.txt" // specify allowed file types
            onChange={handleFileChange}
          />
        </div>

        <button onClick={handleGradingSubmit} disabled={loading} className="submit-btn">
          {loading ? "Uploading..." : "Submit Grading Criteria"}
        </button>
      </div>
    </div>
  );
};

export default App;
