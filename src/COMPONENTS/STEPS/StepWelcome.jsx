import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import star1 from "../../IMAGE/star1.svg";
import "../../CSS/STEPS/StepWelcome.css"; // 스타일 파일 임포트
import Header from "../COMMON/Header";

const StepWelcome = ({ answers, setAnswers, nextStep, prevStep }) => {
  const [input] = useState(answers.welcome || "");
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          className="step-welcome-animate-wrap"
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="step-container step-welcome-center">
            <div className="step-star-wrap">
              <img src={star1} alt="별" className="step-star-img-one" />
            </div>
            <h2 className="step-title step-welcome-title">
              서산책에 오신 걸 환영합니다
            </h2>
            <div className="step-desc step-welcome-desc">
              당신에게 꼭 맞는 여행을 위해
              <br />몇 가지 질문에만 답해주세요!
            </div>
            <div className="step-btn-group step-welcome-btn-group">
              <button
                className="step-btn step-welcome-btn"
                onClick={() => {
                  setAnswers((a) => ({ ...a, welcome: input }));
                  nextStep();
                }}
              >
                시작 →
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default StepWelcome;
