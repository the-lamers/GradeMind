import React from 'react';

interface StepLineProps {
  currentStep: number;
  totalSteps: number;
}

const StepLine: React.FC<StepLineProps> = ({ currentStep, totalSteps }) => {
  if (totalSteps === 0) return null; // Prevent division by zero

  return (
    <div className="step-line">
      <div 
        className="step-progress" 
        style={{ width: `${(currentStep / totalSteps) * 100}%` }} 
      />
    </div>
  );
};

export default StepLine;
