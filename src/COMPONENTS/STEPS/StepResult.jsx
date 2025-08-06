import React from "react";

const StepResult = ({ answers, prevStep }) => {
  return (
    <div className="step-container">
      <div className="step-icon">🌟</div>
      <h2 className="step-title">AI 추천코스 결과</h2>
      <div className="step-result-content">
        <p>내륙, 바다 여부: {answers.transport}</p>
        <p>관심사: {answers.interests && answers.interests.join(", ")}</p>
        {/* 실제 추천 결과/지도/상세정보 등은 추후 구현 */}
      </div>
      <button className="step-btn" onClick={prevStep}>이전</button>
    </div>
  );
};

export default StepResult;
