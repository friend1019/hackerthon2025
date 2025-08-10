// StepInterest.jsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft } from "react-icons/fi";
import star from "../../IMAGE/star2.svg";
import starfilled from "../../IMAGE/starfilled.svg";
import natureImg from "../../IMAGE/nature.svg";
import TrackingImg from "../../IMAGE/tracking.svg";
import ArtImg from "../../IMAGE/art.svg";
import historyImg from "../../IMAGE/history.svg";
import "../../CSS/STEPS/StepInterest.css";
import Header from "../COMMON/Header";

const interestList = [
  { key: "생태·자연·체험", label: "#생태 #자연 #체험", img: natureImg },
  { key: "예술·전시·과학", label: "#예술 #전시 #과학", img: ArtImg },
  { key: "산·등산·트레킹", label: "#산 #등산 #트레킹", img: TrackingImg },
  { key: "역사·문화유산", label: "#역사 #문화유산", img: historyImg },
];

const StepInterest = ({ answers, setAnswers, nextStep, prevStep, step }) => {
  const selected = answers.interests || [];

  const toggleInterest = (key) => {
    const arr = selected[0] === key ? [] : [key];
    console.log("🎯 선택된 관심사 (interest):", arr);
    setAnswers((prev) => ({ ...prev, interests: arr }));
  };

  const handleNext = () => {
    const updatedAnswers = {
      ...answers,
      interests: selected,
    };
    console.log(
      "📦 StepInterest → nextStep으로 전달할 answers:",
      updatedAnswers
    );
    nextStep(updatedAnswers);
  };

  return (
    <>
      <Header />
      <div
        className="step-container step-interest-center"
        style={{ position: "relative" }}
      >
        <button className="step-interest-prev-btn" onClick={prevStep}>
          <FiChevronLeft style={{ fontSize: "2.1rem" }} />
        </button>
        {/* ...existing code... */}
        <div className="step-star-row">
          <img src={starfilled} alt="별" className="step-star-img" />
          <img src={starfilled} alt="별" className="step-star-img" />
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
            {/* ...existing code... */}
            <h2 className="step-title step-interest-title">
              관심사를 선택해주세요
            </h2>
            <div className="step-desc step-interest-desc">
              당신의 취향을 담아 코스를 추천할게요.{" "}
              <span style={{ color: "#ffd700" }}>🍋</span>
            </div>
            <div className="step-interest-list">
              {interestList.map((i) => (
                <button
                  key={i.key}
                  className={`step-interest-btn${
                    selected.includes(i.key) ? " selected" : ""
                  }`}
                  onClick={() => toggleInterest(i.key)}
                  style={{ position: "relative" }}
                >
                  <img
                    src={i.img}
                    alt={i.label}
                    className="step-interest-img"
                  />
                  {selected.includes(i.key) && (
                    <div className="step-interest-check-overlay">
                      <svg
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        style={{ display: "block", margin: "0 auto" }}
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="rgba(255,255,255,0.5)"
                        />
                        <polyline
                          points="35,55 48,68 70,40"
                          stroke="white"
                          strokeWidth="10"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <span className="step-interest-label">{i.label}</span>
                </button>
              ))}
            </div>
            <div className="step-btn-group step-interest-btn-group">
              <button
                className="step-btn step-interest-btn-next"
                onClick={handleNext}
                disabled={selected.length === 0}
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

export default StepInterest;
