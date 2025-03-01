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
  const [step, setStep] = useState(1);
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('/data/questions.json');
      const data: QuestionData[] = await response.json();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  // For now, just simulating the local storage
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleSubmit = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [step]: answer,
    }));
    setStep(step + 1);  // Move to next question (simplified for mock)
  };

  const currentQuestion = questions[step - 1]?.question || 'Loading question...';

  return (
    <div className="app">
      <Header taskName="Гражданское право/ Введение/ Занятие 1" />
      <Question questionText={currentQuestion} />
      <AnswerField onSubmit={handleSubmit} />
      <StepLine currentStep={step} totalSteps={5} />
    </div>
  );
};

export default App;
