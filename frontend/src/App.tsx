import React, { useState } from 'react';
import Header from './components/Header';
import Question from './components/Question';
import AnswerField from './components/AnswerField';
import StepLine from './components/StepLine';

const App: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="app">
      <Header taskName="Task 1" />
      <Question questionText="What is the capital of France?" />
      <AnswerField />
      <StepLine currentStep={step} totalSteps={5} />
    </div>
  );
};

export default App;
