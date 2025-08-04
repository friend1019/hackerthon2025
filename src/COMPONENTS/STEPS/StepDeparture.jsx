//이것도 만들다가 뺄거같아서 일단 날리기 아까워서 냅둡니당

import React, { useState } from "react";
import star2 from "../../IMAGE/star2.svg";
import starfilled from "../../IMAGE/starfilled.svg";
import flag from "../../IMAGE/flag.svg";
import "../../CSS/STEPS/StepDeparture.css";
import Header from "../COMMON/Header";
import { AnimatePresence, motion } from "framer-motion";

import NaverMap from "../MAPS/NaverMap";
import TMap from "../MAPS/TMap";

const StepDeparture = ({ answers, setAnswers, nextStep, prevStep }) => {
  const [input, setInput] = useState(answers.departure || "");
  const [showMap, setShowMap] = useState(false);
  const [mapType, setMapType] = useState("naver"); // "naver" or "tmap"

  // 내 위치 설정하기
  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setInput(`${lat},${lng}`); // 실제 서비스에서는 역지오코딩으로 주소 변환 필요
      }, () => {
        alert("위치 정보를 가져올 수 없습니다.");
      });
    } else {
      alert("브라우저가 위치 정보를 지원하지 않습니다.");
    }
  };

  // 지도에서 선택 콜백 (실제 구현 시 지도에서 선택된 장소를 받아옴)
  const handleMapSelect = (place) => {
    setInput(place);
    setShowMap(false);
  };

  return (
    <>
      <Header />
      <div className="step-container step-departure-center">
        <div className="step-star-row">
          <img src={starfilled} alt="별" className="step-star-img" />
          <img src={star2} alt="별" className="step-star-img" />
          <img src={star2} alt="별" className="step-star-img" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="step-departure-content"
            key={answers.departure}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="step-title step-departure-title">출발지를 입력해주세요</h2>
            <div className="step-desc step-departure-desc">
              어디서부터 여정을 시작할까요? <span style={{ color: '#ffd700' }}>★</span>
            </div>
            <div className="step-flag-wrap">
              <img src={flag} alt="깃발" className="step-flag-img" />
            </div>
            <input
              className="step-input"
              type="text"
              placeholder="출발지를 입력해주세요"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <div className="step-departure-map-btns">
              <button type="button" className="step-map-btn" onClick={() => { setMapType("naver"); setShowMap(true); }}>지도에서 선택하기(Naver)</button>
              <button type="button" className="step-map-btn" onClick={() => { setMapType("tmap"); setShowMap(true); }}>지도에서 선택하기(TMap)</button>
              <button type="button" className="step-map-btn" onClick={handleMyLocation}>내 위치 설정하기</button>
            </div>
          </motion.div>
        </AnimatePresence>
        {showMap && (
          <div className="step-map-modal">
            <div className="step-map-modal-bg" onClick={() => setShowMap(false)} />
            <div className="step-map-modal-content">
              <button className="step-map-modal-close" onClick={() => setShowMap(false)}>닫기</button>
              {mapType === "naver" ? (
                <NaverMap onSelect={handleMapSelect} />
              ) : (
                <TMap onSelect={handleMapSelect} />
              )}
              <div style={{ marginTop: "1rem", color: "#fff" }}>
                ※ 지도에서 장소를 클릭하면 입력란에 자동으로 반영됩니다.
              </div>
            </div>
          </div>
        )}
        <div className="step-btn-group step-departure-btn-group">
          <button
            className="step-btn step-departure-btn"
            onClick={() => {
              setAnswers((a) => ({ ...a, departure: input }));
              nextStep();
            }}
            disabled={!input.trim()}
          >
            다음 →
          </button>
        </div>
      </div>
    </>
  );
};

export default StepDeparture;
