import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Question from './components/Question';
import AnswerField from './components/AnswerField';
import StepLine from './components/StepLine';

interface QuestionData {
  id: number;
  question: string;
}

const App: React.FC = () => {
  // const [step, setStep] = useState(1);
  // const [questions, setQuestions] = useState<QuestionData[]>([]);

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     const response = await fetch('/data/questions.json');
  //     const data: QuestionData[] = await response.json();
  //     setQuestions(data);
  //   };
  //   fetchQuestions();
  // }, []);

  // For now, just simulating the local storage
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnswerSubmit = async (answer: string) => {
    if (!answer.trim()) return;

    setLoading(true);
    setResponse(null); // Reset previous response

    try {
      const res = await fetch("/api/v1.0/post_answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();
      setResponse(data.reply); // Assume API returns { reply: "Processed answer" }
    } catch (error) {
      setResponse("Error receiving response.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // const currentQuestion = questions[step - 1]?.question || 'Loading question...';

  return (
    <div className="app">
      <Header taskName="Гражданское право/ Введение/ Занятие 1" />
      {/* <Question questionText={currentQuestion} /> */}
      <Question questionText="Назовите признаки отношений, составляющих предмет гражданского права." />
      <AnswerField onSubmit={handleAnswerSubmit} loading={loading}/>
      {response && <p className="response">{response}</p>}
      {/* <StepLine currentStep={step} totalSteps={5} /> */}
    </div>
  );
};

export default App;
