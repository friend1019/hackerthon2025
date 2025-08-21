// CourseSpinner.jsx
import React from "react";
import "../../CSS/STEPS/CourseSpinner.css";
import Header from "../COMMON/Header";

const CourseSpinner = () => {
  return (
    <div className="course-spinner-bg">
      <Header />
      <div className="course-spinner-center">
        {/* 별 → 숨쉬는 원형 구체 */}
        <div className="spinner-core" aria-hidden="true">
          <div className="spinner-ripple"></div>
        </div>

        <h2 className="course-spinner-title">코스 추천 중</h2>
        <div className="course-spinner-desc">
          당신의 여행 스타일을 분석 중이에요...
          <br />
          곧, 딱 맞는 여행 코스를 추천해드릴게요
        </div>
      </div>
    </div>
  );
};

export default CourseSpinner;
