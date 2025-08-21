import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HomeHero from "./HomeHero";
import Weather from "./HomeWeather";
import "../../CSS/HOME/Home.css";

import Header from "../COMMON/Header";
import twostars from "../../IMAGE/twostars.svg";
// import Footer from "../COMMON/Footer";

import nineKyung1 from "../../IMAGE/9경1.svg";
import nineKyung2 from "../../IMAGE/9경2.svg";
import nineKyung3 from "../../IMAGE/9경3.svg";
import festival1 from "../../IMAGE/festival1.svg";
import festival2 from "../../IMAGE/festival2.svg";
import festival3 from "../../IMAGE/festival3.svg";
import aramegil1 from "../../IMAGE/aramegil1.svg";
import aramegil2 from "../../IMAGE/aramegil2.svg";
import aramegil3 from "../../IMAGE/aramegil3.svg";

/* ===================== 상수: 카테고리 탭 ===================== */
const categoryTabs = [
  {
    key: "recommended",
    label: "추천",
    places: [
      { img: nineKyung1, name: "팔봉산", id: 121 },
      { img: nineKyung2, name: "황금산", id: 117 },
      { img: nineKyung3, name: "간월암", id: 136 },
    ],
    moreLink: "/9kyung",
  },
  {
    key: "festival",
    label: "페스티벌",
    places: [
      { img: festival1, name: "서산해미읍성축제" },
      { img: festival2, name: "서산국화축제" },
      { img: festival3, name: "해미벚꽃축제" },
    ],
    moreLink: "/festival",
  },
  {
    key: "aramegil",
    label: "아라메길",
    places: [
      { img: aramegil1, name: "용현리 마애여래삼존상" },
      { img: aramegil2, name: "개심사" },
      { img: aramegil3, name: "해넘이전망대" },
    ],
    moreLink: "/aramegil",
  },
];

/* ===================== AnimatedPhrase ===================== */
const phrases = [
  { text: "⛰️🌊 원하는 테마를 선택하고", style: { fontWeight: 500, color: "#fff" } },
  { text: "🧑‍🤝‍🧑 누구와 함께하는 여행인가요?", style: { fontWeight: 500, color: "#fff" } },
  { text: "✨ 이제, 준비는 끝났어요 — 함께 떠나볼까요?", style: { fontWeight: 500, color: "#fff" } },
];

const AnimatedPhrase = () => {
  const [hideArr, setHideArr] = useState(Array(phrases.length).fill(false));
  const [cycle, setCycle] = useState(0);
  const lineHeight = 3.2;
  const opacityArr = [1, 0.7, 0.5, 0.3, 0.1];

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

  return (
    <div style={{ position: "relative", height: `${phrases.length * lineHeight}rem` }}>
      {phrases.map((p, idx) => {
        const visibleIdx = hideArr.slice(0, idx + 1).filter((h) => !h).length - 1;
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

/* ===================== CategorySection ===================== */
const CategorySection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("recommended");
  const tabData = categoryTabs.find((tab) => tab.key === activeTab) ?? categoryTabs[0];

  return (
    <div className="category-section">
      <div className="category-desc">
        함께 보면 좋아요{" "}
        <span role="img" aria-label="hand">🙌</span>
      </div>

      {/* 라운드 카테고리 리스트 */}
      <div className="category-round-list">
        {[
          { key: "9kyung", label: "서산9경", emoji: "⛰️", link: "/9kyung" },
          { key: "festival", label: "페스티벌", emoji: "🎇", link: "/festival" },
          { key: "aramegil", label: "아라메길", emoji: "🚶", link: "/aramegil" },
          { key: "9mi", label: "서산9미", emoji: "🦀", link: "/9mi" },
          { key: "9pum", label: "서산9품", emoji: "🧄", link: "/9pum" },
        ].map((item) => (
          <button
            className="category-round-item"
            key={item.key}
            onClick={() => navigate(item.link)}
            type="button"
          >
            <span className="category-round-icon" aria-label={item.label} role="img">
              {item.emoji}
            </span>
            <span className="category-round-label">{item.label}</span>
          </button>
        ))}
      </div>

      {/* 탭 */}
      <div className="category-tabs">
        {categoryTabs.map((tab) => (
          <button
            key={tab.key}
            className={`category-tab${activeTab === tab.key ? " active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
            aria-pressed={activeTab === tab.key}
          >
            {tab.label === "추천" ? (
              <span className="category-tab-label-with-dot">
                {tab.label}
                <span className="category-tab-dot" />
              </span>
            ) : (
              tab.label
            )}
          </button>
        ))}
      </div>

      {/* 카드 리스트 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
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

      {/* 카드 리스트 아래: Tip Bar */}
      <div className="tip-bar-2025">
        <div className="tip-bar-2025-label">서산책 Tip!</div>
        <div className="tip-bar-2025-line" />
        <button className="tip-bar-2025-btn" onClick={() => navigate("/recommend")}>
          <span className="tip-bar-2025-btn-icon">
            <img
              src={twostars}
              alt="AI 추천"
              style={{ width: "3.2rem", height: "3.2rem", display: "block" }}
            />
          </span>
          <span className="tip-bar-2025-btn-text">AI 코스 추천받기</span>
        </button>
      </div>

      {/* Tip Bar 아래: Animated Phrase */}
      <div className="carousel-animated-phrase">
        <AnimatedPhrase />
      </div>
    </div>
  );
};

/* ===================== Home ===================== */
const Home = () => {
  return (
    <motion.div
      className="home-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <HomeHero />
      <Weather />
      <CategorySection />
      {/* <Footer /> */}
    </motion.div>
  );
};

export default Home;
