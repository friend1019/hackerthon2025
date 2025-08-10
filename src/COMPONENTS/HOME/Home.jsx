import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdAutoAwesome } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";
import "../../CSS/HOME/Home.css";

import Header from "../COMMON/Header";
// import Footer from "../COMMON/Footer";

import mainImage from "../../IMAGE/mainimg.svg";

import nineKyung1 from "../../IMAGE/9경1.svg";
import nineKyung2 from "../../IMAGE/9경2.svg";
import nineKyung3 from "../../IMAGE/9경3.svg";
import festival1 from "../../IMAGE/festival1.svg";
import festival2 from "../../IMAGE/festival2.svg";
import festival3 from "../../IMAGE/festival3.svg";
import aramegil1 from "../../IMAGE/aramegil1.svg";
import aramegil2 from "../../IMAGE/aramegil2.svg";
import aramegil3 from "../../IMAGE/aramegil3.svg";


// 각 카테고리별 예시 장소 데이터
const categoryTabs = [
  {
    key: "9kyung",
    label: "서산 9경",
    places: [
      { img: nineKyung1, name: "해미읍성", id: 88 },
      { img: nineKyung2, name: "삼길포항", id: 112 },
      { img: nineKyung3, name: "팔봉산", id: 121 },
    ],
    moreLink: "/9kyung",
  },
  {
    key: "festival",
    label: "페스티벌",
    places: [
      { img: festival1, name: "서산국화축제" },
      { img: festival2, name: "해미읍성축제" },
      { img: festival3, name: "삼길포항불꽃축제" },
    ],
    moreLink: "/festival",
  },
  {
    key: "aramegil",
    label: "아라메길",
    places: [
      { img: aramegil1, name: "보원사지" },
      { img: aramegil2, name: "용현이 마애여래삼존상" },
      { img: aramegil3, name: "부석사" },
    ],
    moreLink: "/aramegil",
  },
];

const CategorySection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("9kyung");
  const tabData = categoryTabs.find((tab) => tab.key === activeTab);

  return (
    <div className="category-section">
      <div className="category-tabs">
        {categoryTabs.map((tab) => (
          <button
            key={tab.key}
            className={`category-tab${activeTab === tab.key ? " active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <div className="category-title-row">
            <span className="category-title-main">{tabData.label}</span>
            <button
              className="category-more-btn"
              onClick={() => navigate(tabData.moreLink)}
            >
              더보기 <FiChevronRight size={18} />
            </button>
          </div>
          <motion.div
            className="category-place-cards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {tabData.places.map((place, idx) => (
              <motion.div
                className="category-place-card"
                key={place.name}
                onClick={() => place.id && navigate(`/place/${place.id}`)}
                style={{ cursor: place.id ? "pointer" : "default" }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.07 }}
              >
                <img src={place.img} alt={place.name} className="category-place-img" />
                <div className="category-place-label">{place.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="category-desc">
        함께 보면 좋아요 <span role="img" aria-label="hand">🙌</span>
      </div>
      <div className="category-bottom-btns">
        <button
          className="category-bottom-btn"
          onClick={() => navigate("/9mi")}
        >
          <span role="img" aria-label="crab">🦀</span> 서산 9미
        </button>
        <button
          className="category-bottom-btn"
          onClick={() => navigate("/9pum")}
          style={{ marginRight: "1.5rem" }}
        >
          <span role="img" aria-label="garlic">🧄</span> 서산 9품
        </button>
      </div>
    </div>
  );
};

const phrases = [
  {
    text: "⛰️🌊 원하는 테마를 선택하고",
    style: { fontWeight: 500, color: "#fff" },
  },
  {
    text: "🏷️ 관심 있는 태그를 골라주세요!",
    style: { fontWeight: 500, color: "#fff" },
  },
  {
    text: "🧑‍🤝‍🧑 누구와 함께하는 여행인가요?",
    style: { fontWeight: 500, color: "#fff" },
  },
  {
    text: "✨ 이제, 준비는 끝났어요 — 함께 떠나볼까요?",
    style: { fontWeight: 500, color: "#fff" },
  },
];

const AnimatedPhrase = () => {
  const [hideArr, setHideArr] = useState(Array(phrases.length).fill(false));
  const [cycle, setCycle] = useState(0);
  const lineHeight = 3.2;

  useEffect(() => {
    const timeouts = [];
    phrases.forEach((_, idx) => {
      timeouts.push(
        setTimeout(() => {
          setHideArr((prev) => {
            const next = [...prev];
            next[idx] = true;
            return next;
          });
        }, 1500 + idx * 1700)
      );
    });
    timeouts.push(
      setTimeout(() => {
        setHideArr(Array(phrases.length).fill(false));
        setCycle((prev) => prev + 1);
      }, 1500 + phrases.length * 1700 + 500)
    );
    return () => timeouts.forEach(clearTimeout);
  }, [cycle]);

  const opacityArr = [1, 0.7, 0.5, 0.3, 0.1];

  return (
    <div
      style={{
        position: "relative",
        height: `${phrases.length * lineHeight}rem`,
      }}
    >
      {phrases.map((p, idx) => {
        const visibleIdx =
          hideArr.slice(0, idx + 1).filter((h) => !h).length - 1;
        const y = hideArr[idx] ? -lineHeight : visibleIdx * lineHeight;
        const opacity = hideArr[idx] ? 0 : opacityArr[visibleIdx] || 0.5;
        return (
          <div
            key={idx}
            className={`animated-phrase${hideArr[idx] ? " hide" : " show"}`}
            style={{
              ...p.style,
              opacity,
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              transform: `translateY(${y}rem)`,
              transition: "opacity 0.7s, transform 0.7s",
              whiteSpace: "nowrap",
            }}
          >
            {p.text}
          </div>
        );
      })}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="home-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <div className="carousel">
        {/* 단일 이미지 */}
        <img
          src={mainImage}
          alt="main"
          className="carousel-img active"
          draggable={false}
        />
        <div className="carousel-header-overlay" />
        <div className="carousel-content-overlay" />
        {/* 중앙 텍스트 */}
        <div className="carousel-main-center">
          <span style={{ fontSize: "1.8rem", fontWeight: 500 }}>
            특별한 <b>AI 서산 여행</b>, 지금 시작하세요
          </span>
        </div>
        {/* 사진 왼쪽 아래 AnimatedPhrase 오버레이 */}
        <div className="carousel-animated-phrase">
          <AnimatedPhrase />
        </div>
      </div>

      <CategorySection />

      {/* StepInterest 스타일 하단 고정 버튼 */}
      <button
        className="carousel-bottom-btn"
        onClick={() => navigate("/recommend")}
      >
        <MdAutoAwesome style={{ marginRight: "0.5rem", fontSize: "1.3rem" }} />
        <span>AI 추천코스 생성</span>
      </button>

      {/* <Footer /> */}
    </motion.div>
  );
};

export default Home;
