import React, { useState } from "react";
import StepWelcome from "./StepWelcome";
import StepInterest from "./StepInterest";
import StepResult from "./StepResult";
import StepTheme from "./StepTheme";

const steps = [
  StepWelcome,
  StepTheme,
  StepInterest,
  StepResult,
];

const RecommendCourse = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    departure: "",
    transport: "",
    interests: [],
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const StepComponent = steps[step];
  return (
    <div
      className="recommend-course-bg"
      style={{
        background: "#141414",
        minHeight: "100vh",
        width: "100vw",
        position: "relative"
      }}
    >
      <StepComponent
        answers={answers}
        setAnswers={setAnswers}
        nextStep={nextStep}
        prevStep={prevStep}
        step={step}
      />
    </div>
  );
};

export default RecommendCourse;
