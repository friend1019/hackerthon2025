//이동수단 선택 부분인데 일단 만들어놔서 냅뒀습니당

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdArrowBack } from "react-icons/md";
import starfilled from "../../IMAGE/starfilled.svg";
import star from "../../IMAGE/star2.svg";
import walkImg from "../../IMAGE/walk.svg";
import carImg from "../../IMAGE/car.svg";
import busImg from "../../IMAGE/bus.svg";
import "../../CSS/STEPS/StepTransport.css";
import Header from "../COMMON/Header";

const transportList = [
  { key: "walk", label: "도보", img: walkImg },
  { key: "car", label: "자가용", img: carImg },
  { key: "bus", label: "버스", img: busImg },
];

const StepTransport = ({ answers, setAnswers, nextStep, prevStep, step }) => {
  const selected = answers.transport;
  return (
    <>
      <Header />
      <div className="step-container step-transport-center">
        <button
          className="step-transport-prev-btn"
          onClick={prevStep}
        >
          <MdArrowBack style={{ fontSize: "2.1rem", marginRight: "0.5rem" }} /> 이전
        </button>
        <div className="step-star-row">
          <img src={starfilled} alt="별" className="step-star-img" />
          <img src={starfilled} alt="별" className="step-star-img" />
          <img src={star} alt="별" className="step-star-img" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="step-transport-content"
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="step-title step-transport-title">이동수단을 선택해주세요</h2>
            <div className="step-desc step-transport-desc">
              도보, 자가용, 버스든 그건 당신의 선택이에요. <span style={{color:'#ffd700'}}>✨</span>
            </div>
            <div className="step-transport-list">
              {transportList.map(t => (
                <button
                  key={t.key}
                  className={`step-transport-btn${selected === t.key ? " selected" : ""}`}
                  onClick={() => setAnswers(a => ({ ...a, transport: t.key }))}
                >
                  <img src={t.img} alt={t.label} className="step-transport-img" />
                  <span className={`step-transport-label${selected === t.key ? " selected" : ""}`}>{t.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="step-btn-group step-transport-btn-group">
          <button
            className="step-btn step-transport-btn-next"
            onClick={nextStep}
            disabled={!selected}
          >다음 →</button>
        </div>
      </div>
    </>
  );
};

export default StepTransport;
