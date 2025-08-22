// src/COMPONENTS/COMMON/Alert.jsx
import React from "react";
import "../../CSS/COMMON/Alert.css";

/**
 * Alert 컴포넌트
 * - 간단한 메시지를 표시하는 알림 팝업
 * - 배경 오버레이 + 알림 박스 구조
 *
 * Props:
 * @param {string} message - 표시할 알림 메시지
 * @param {function} onClose - 닫기(확인 버튼 클릭) 핸들러
 */
const Alert = ({ message, onClose }) => {
  return (
    <div className="alert-overlay">
      {/* 알림 박스 */}
      <div className="alert-box">
        {/* 알림 메시지 */}
        <p className="alert-message">{message}</p>

        {/* 확인 버튼 */}
        <button className="alert-btn" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Alert;
