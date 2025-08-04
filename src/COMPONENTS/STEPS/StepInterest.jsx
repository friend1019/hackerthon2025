import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdArrowBack } from "react-icons/md";
import starfilled from "../../IMAGE/starfilled.svg";
import natureImg from "../../IMAGE/nature.svg";
import eatingImg from "../../IMAGE/eating.svg";
import healingImg from "../../IMAGE/healing.svg";
import historyImg from "../../IMAGE/history.svg";
import "../../CSS/STEPS/StepInterest.css";
import Header from "../COMMON/Header";

const interestList = [
  { key: "nature", label: "", img: natureImg },
  { key: "food", label: "", img: eatingImg },
  { key: "healing", label: "", img: healingImg },
  { key: "history", label: "", img: historyImg },
];

const StepInterest = ({ answers, setAnswers, nextStep, prevStep, step }) => {
  const selected = answers.interests || [];
  const toggleInterest = key => {
    setAnswers(a => {
      const arr = a.interests.includes(key)
        ? a.interests.filter(i => i !== key)
        : [...a.interests, key];
      return { ...a, interests: arr };
    });
  };
  return (
    <>
      <Header />
      <div className="step-container step-interest-center">
        <button
          className="step-interest-prev-btn"
          onClick={prevStep}
        >
          <MdArrowBack style={{ fontSize: "2.1rem", marginRight: "0.5rem" }} /> 이전
        </button>
        <div className="step-star-row">
          <img src={starfilled} alt="별" className="step-star-img" />
          <img src={starfilled} alt="별" className="step-star-img" />
          <img src={starfilled} alt="별" className="step-star-img" />
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
            <h2 className="step-title step-interest-title">관심사를 선택해주세요</h2>
            <div className="step-desc step-interest-desc">
              당신의 취향을 담아 코스를 추천할게요. <span style={{color:'#ffd700'}}>🍋</span>
            </div>
            <div className="step-interest-list">
              {interestList.map(i => (
                <button
                  key={i.key}
                  className={`step-interest-btn${selected.includes(i.key) ? " selected" : ""}`}
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
                onClick={nextStep}
                disabled={selected.length === 0}
              >
                ✨ AI 추천코스 생성
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default StepInterest;
