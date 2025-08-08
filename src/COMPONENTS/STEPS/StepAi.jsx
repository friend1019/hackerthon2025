// StepAi.jsx
import React, { useState } from "react";
import "../../CSS/STEPS/StepAi.css";
import Header from "../COMMON/Header";
import { MdArrowBack } from "react-icons/md";
import starfilled from "../../IMAGE/starfilled.svg";

const StepAi = ({ answers, setAnswers, nextStep, prevStep }) => {
  const [input, setInput] = useState(answers.aiText || "");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleNext = () => {
    if (!input.trim()) return;

    const updatedAnswers = {
      ...answers,
      aiText: input.trim(),
    };

    console.log("✅ StepAi → nextStep으로 넘기는 answers:", updatedAnswers);
    nextStep(updatedAnswers);
  };

  return (
    <>
      <Header />
      <div className="step-ai-container">
        <button className="step-ai-prev-btn" onClick={prevStep}>
          <MdArrowBack style={{ fontSize: "2.1rem", marginRight: "0.5rem" }} /> 이전
        </button>

        <div className="step-ai-star-row">
          <img src={starfilled} alt="별" className="step-ai-star-img" />
          <img src={starfilled} alt="별" className="step-ai-star-img" />
          <img src={starfilled} alt="별" className="step-ai-star-img" />
        </div>

        <h2 className="step-ai-title">AI에게 요청할 내용을 입력해주세요</h2>
        <div className="step-ai-desc">
          당신만의 여행 요청을 입력하면, AI가 코스를 만들어드릴게요 ✨
        </div>

        <div className="step-ai-input-wrap">
          <input
            className="step-ai-input"
            type="text"
            placeholder="예) 1박2일 서산 여행 코스 추천해줘"
            value={input}
            onChange={handleInputChange}
          />
        </div>

        <div className="step-ai-btn-group">
          <button
            className={`step-ai-btn-submit ${!input.trim() ? "disabled" : ""}`}
            onClick={handleNext}
            disabled={!input.trim()}
          >
            AI 추천코스 생성
          </button>
        </div>
      </div>
    </>
  );
};

export default StepAi;