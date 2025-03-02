import React, { useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Header from './components/Header';
import Question from './components/Question';
import AnswerField from './components/AnswerField';

interface ApiResponse {
  reply: string;
}

const App: React.FC = () => {
  // const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnswerSubmit = async (answer: string | null, audio: Blob | null) => {
    console.log("Answer:", answer); // Логируем ответ
    console.log("Audio:", audio);  //
    if (!answer?.trim() && !audio) return;

    setLoading(true);
    setResponse(null); // Reset previous response

    try {
      const formData = new FormData();
      if (answer) {
        formData.append("answer", answer);
      }
      if (audio) {
        formData.append("audio", audio);
      }
      console.log("FormData:", formData);  //
      const res = await fetch("http://localhost:5000/api/data", {
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

  return (
    <div className="app">
      <Header taskName="Гражданское право/ Введение/ Занятие 1" />
      {loading && (
        <div className="loading-spinner">
          <AiOutlineLoading3Quarters className="spiner" />
        </div>
      )}
      {!loading && !response && (
        <>
          <Question questionText="Назовите признаки отношений, составляющих предмет гражданского права." />
          <AnswerField onSubmit={handleAnswerSubmit} loading={loading} />
        </>
      )}
      {response && <p className="response">{response}</p>}
    </div>
  );
};

export default App;