import React, { useState } from 'react';
import Header from './components/Header';
import Question from './components/Question';
import AnswerField from './components/AnswerField';

interface ApiResponse {
  reply: string;
}

const App: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnswerSubmit = async (answer: string) => {
    if (!answer.trim()) return;

    setLoading(true);
    setResponse(null); // Reset previous response

    try {
      const res = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
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
      <Question questionText="Назовите признаки отношений, составляющих предмет гражданского права." />
      <AnswerField onSubmit={handleAnswerSubmit} loading={loading} />
      {response && <p className="response">{response}</p>}
    </div>
  );
};

export default App;