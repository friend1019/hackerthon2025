import React from "react";
import "../../CSS/COMMON/Alert.css";

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <p className="alert-message">{message}</p>
        <button className="alert-btn" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Alert;
