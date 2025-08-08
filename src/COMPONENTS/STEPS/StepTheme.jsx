// StepTheme.jsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdArrowBack } from "react-icons/md";
import star from "../../IMAGE/star2.svg";
import starfilled from "../../IMAGE/starfilled.svg";
import LandImg from "../../IMAGE/land.svg";
import OceanImg from "../../IMAGE/ocean.svg";
import "../../CSS/STEPS/StepInterest.css";
import Header from "../COMMON/Header";

const interestList = [
  { key: "내륙", label: "내륙", img: LandImg },
  { key: "바다", label: "바다", img: OceanImg },
];

const StepTheme = ({ answers, setAnswers, nextStep, prevStep, step }) => {
  const selected = answers.theme;

  const toggleInterest = (key) => {
    console.log("🎯 선택된 테마 (theme):", key);
    setAnswers((prev) => ({ ...prev, theme: key }));
  };

  const handleNext = () => {
    const updated = { ...answers, theme: selected };
    console.log("📦 StepTheme → nextStep으로 전달할 answers:", updated);
    nextStep(updated);
  };

  return (
    <>
      <Header />
      <div className="step-container step-interest-center">
        <button className="step-interest-prev-btn" onClick={prevStep}>
          <MdArrowBack style={{ fontSize: "2.1rem", marginRight: "0.5rem" }} /> 이전
        </button>
        <div className="step-star-row">
          <img src={starfilled} alt="별" className="step-star-img" />
          <img src={star} alt="별" className="step-star-img" />
          <img src={star} alt="별" className="step-star-img" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="step-interest-content"
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="step-title step-interest-title">테마를 선택해주세요</h2>
            <div className="step-desc step-interest-desc">
              당신의 취향을 담아 코스를 추천할게요. <span style={{ color: "#ffd700" }}>🍋</span>
            </div>
            <div className="step-interest-list">
              {interestList.map((i) => (
                <button
                  key={i.key}
                  className={`step-interest-btn${selected === i.key ? " selected" : ""}`}
                  onClick={() => toggleInterest(i.key)}
                >
                  <img src={i.img} alt={i.label} className="step-interest-img" />
                  <span className="step-interest-label">{i.label}</span>
                </button>
              ))}
            </div>
            <div className="step-btn-group step-interest-btn-group">
              <button
                className="step-btn step-interest-btn-next"
                onClick={handleNext}
                disabled={!selected}
              >
                다음
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default StepTheme;