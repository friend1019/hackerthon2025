import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdAutoAwesome } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import "../../CSS/HOME/Home.css"; 
import Header from "../COMMON/Header"; 
import Footer from "../COMMON/Footer"; 
import main1 from "../../IMAGE/main1.svg";
import main2 from "../../IMAGE/main2.svg";
import main3 from "../../IMAGE/main3.svg";
import nineKyung from "../../IMAGE/9경.svg";
import nineMi from "../../IMAGE/9미.svg";
import ninePoom from "../../IMAGE/9품.svg";

const phrases = [
  { text: "🏁 출발지를 입력하고,", style: { fontWeight: 700, color: "#fff" } },
  {
    text: "🚗 이동할 수단을 정해요,",
    style: { fontWeight: 500, color: "#fff" },
  },
  {
    text: "🏷️ 그리고 관심 있는 태그를 골라주세요",
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
    let timeouts = [];
    // 한 줄씩 사라지게
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
    // 모든 줄이 사라진 후 다시 전체 등장
    timeouts.push(
      setTimeout(() => {
        setHideArr(Array(phrases.length).fill(false));
        setCycle((prev) => prev + 1);
      }, 1500 + phrases.length * 1700 + 1000)
    );
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [cycle]);

  // 아래에 있는 문구일수록 더 진하게 보이도록
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
            }}
          >
            {p.text}
          </div>
        );
      })}
    </div>
  );
};

const images = [main1, main2, main3];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const SLIDE_INTERVAL = 4000;
  const navigate = useNavigate();

  // 자동 슬라이드
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  // 터치 슬라이드
  const startX = useRef(null);
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (startX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    if (endX - startX.current > 50) {
      setCurrent((prev) => (prev - 1 + images.length) % images.length);
    } else if (startX.current - endX > 50) {
      setCurrent((prev) => (prev + 1) % images.length);
    }
    startX.current = null;
  };

  // 진행 막대 너비 계산
  const progress = ((current + 1) / images.length) * 100;

  return (
    <div className="home-bg">
      <Header />
      <div
        className="carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* 이미지 슬라이드 */}
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`main${idx + 1}`}
            className={`carousel-img${current === idx ? " active" : ""}`}
            draggable={false}
          />
        ))}
        {/* 헤더 영역 오버레이 */}
        <div className="carousel-header-overlay" />
        {/* 글귀/버튼 영역 오버레이 */}
        <div className="carousel-content-overlay" />
        {/* 글귀랑 버튼 */}
        <div className="carousel-content">
          <div className="carousel-text">
            <span>
              특별한 <b>AI 서산 여행</b>,<br />
              지금 시작하세요
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <button
              className="carousel-btn"
              onClick={() => navigate("/recommend")}
            >
              <MdAutoAwesome
                style={{ marginRight: "0.5rem", fontSize: "1.3rem" }}
              />
              <span>AI 추천코스 생성</span>
            </button>
            <div className="ai-image-info">
              *AI로 생성한 서산시의 이미지입니다
            </div>
          </div>
        </div>
        {/* 진행 바 */}
        <div className="carousel-progress">
          <div className="carousel-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
      {/* 아래쪽 애니메이션 글귀 */}
      <div className="home-phrase-container">
        <AnimatedPhrase />
      </div>
      {/* 카테고리 버튼 영역 */}
      <div className="category-section">
        <div className="category-title">
          카테고리{" "}
          <span style={{ fontSize: "2.5rem", marginLeft: "0.3rem", marginTop: "0.75rem" }}>
            <FiChevronDown />
          </span>
        </div>
        <div className="category-buttons">
          <button className="category-btn">
            <img src={nineKyung} alt="서산 9경" />
          </button>
          <button className="category-btn">
            <img src={nineMi} alt="서산 9미" />
          </button>
          <button className="category-btn">
            <img src={ninePoom} alt="서산 9품" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
