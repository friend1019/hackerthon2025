//일단 필요할까봐 만들어놓았어용
import React from "react";
import "../../CSS/COMMON/LoadingSpinner.css";
import Logo from "../../IMAGE/starfilled.svg"; // 로딩 스피너 이미지

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <img src={Logo} alt="로딩 중" className="loading-spinner" />
    </div>
  );
};

export default LoadingSpinner;
