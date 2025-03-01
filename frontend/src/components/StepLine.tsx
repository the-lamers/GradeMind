import React from 'react';

interface StepLineProps {
  currentStep: number;
  totalSteps: number;
}

const StepLine: React.FC<StepLineProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="step-line">
      <div className="step-progress" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
      <div className="step-text">{`${currentStep} of ${totalSteps}`}</div>
    </div>
  );
};

export default StepLine;
