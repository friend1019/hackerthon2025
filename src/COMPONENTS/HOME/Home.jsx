import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdAutoAwesome } from "react-icons/md";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../../CSS/HOME/Home.css";

import Header from "../COMMON/Header";
import Footer from "../COMMON/Footer";

import main1 from "../../IMAGE/main1.svg";
import main2 from "../../IMAGE/main2.svg";
import main3 from "../../IMAGE/main3.svg";

import nineKyung from "../../IMAGE/9경.svg";
import nineMi from "../../IMAGE/9미.svg";
import ninePoom from "../../IMAGE/9품.svg";
import festival from "../../IMAGE/festival.svg";
import aramegil from "../../IMAGE/aramegil.svg";

const categoryList = [
  { img: nineKyung, label: "서산 9경", link: "9kyung" },
  { img: nineMi, label: "서산 9미", link: "9mi" },
  { img: ninePoom, label: "서산 9품", link: "9pum" },
  { img: festival, label: "서산 페스티벌", link: "festival" },
  { img: aramegil, label: "서산 아래매길", link: "aramegil" },
];

const visibleCount = 3;

const CategorySlider = () => {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [dragX, setDragX] = useState(0); // 드래그 실시간 이동값
  const [isDragging, setIsDragging] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const maxIdx = categoryList.length - visibleCount;
  const touchStartX = useRef(null);
  const lastDragX = useRef(0);
  const cardRef = useRef(null);

  useEffect(() => {
    // 카드 wrapper의 실제 width(px) 측정
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth + 17 * 16); // 카드+gap
    }
  }, []);

  const handlePrev = () => setIdx((i) => Math.max(0, i - 1));
  const handleNext = () => setIdx((i) => Math.min(maxIdx, i + 1));

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    lastDragX.current = 0;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || touchStartX.current === null) return;
    const moveX = e.touches[0].clientX - touchStartX.current;
    setDragX(moveX);
    lastDragX.current = moveX;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // 카드 실제 width 기준으로 idx 계산
    const threshold = cardWidth / 3;
    let nextIdx = idx;
    if (lastDragX.current > threshold && idx > 0) {
      nextIdx = idx - 1;
    } else if (lastDragX.current < -threshold && idx < maxIdx) {
      nextIdx = idx + 1;
    }
    setIdx(nextIdx);
    setDragX(0);
    touchStartX.current = null;
    lastDragX.current = 0;
  };

  // 트랜지션 적용: 드래그 중엔 즉시, 드래그 끝나면 부드럽게
  const trackStyle = {
    transform: `translateX(calc(-${idx * cardWidth}px + 2rem + ${dragX}px))`,
    transition: isDragging ? "none" : "transform 0.4s cubic-bezier(.7,.2,.3,1)",
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div
      className="category-slider-wrap"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="category-slider-header">
        <div className="category-slider-title"></div>
        <div className="category-slider-arrows">
          <button
            className="category-arrow"
            onClick={handlePrev}
            disabled={idx === 0}
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            className="category-arrow"
            onClick={handleNext}
            disabled={idx === maxIdx}
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="category-slider-window">
        <div className="category-slider-track" style={trackStyle}>
          {categoryList.map((cat, i) => (
            <div
              className="category-card-wrapper"
              key={cat.label}
              ref={i === 0 ? cardRef : undefined}
              onClick={() => navigate(`/${cat.link}`)}
            >
              <div className="category-card">
                <div className="category-card-imgbox">
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="category-card-img"
                  />
                </div>
              </div>
              <div className="category-card-label">{cat.label}</div>
            </div>
          ))}
        </div>
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
  const [barProgress, setBarProgress] = useState(0); // 0~1
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const SLIDE_INTERVAL = 4000;
  const TOTAL_DURATION = SLIDE_INTERVAL * images.length;

  // Progress bar 애니메이션 (한 바퀴 전체)
  useEffect(() => {
    let start = Date.now();
    function update() {
      const elapsed = Date.now() - start;
      let progress = elapsed / TOTAL_DURATION;
      if (progress > 1) progress = 1;
      setBarProgress(progress);
      if (progress < 1) {
        intervalRef.current = requestAnimationFrame(update);
      } else {
        setBarProgress(0);
        setCurrent(0);
        start = Date.now();
        intervalRef.current = requestAnimationFrame(update);
      }
    }
    intervalRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(intervalRef.current);
  }, [TOTAL_DURATION]); // ✅ 의존성 추가

  // 슬라이드 자동 전환
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

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

  return (
    <div className="home-bg">
      <Header />
      <div
        className="carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`main${idx + 1}`}
            className={`carousel-img${current === idx ? " active" : ""}`}
            draggable={false}
          />
        ))}
        <div className="carousel-header-overlay" />
        <div className="carousel-content-overlay" />
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
        <div className="carousel-progress">
          <div
            className="carousel-bar"
            style={{ transform: `scaleX(${barProgress})` }}
          />
        </div>
      </div>

      <div className="home-phrase-container">
        <AnimatedPhrase />
      </div>

      <div className="category-section">
        <div className="category-title">카테고리</div>{" "}
        {/* 반드시 여기에 있어야 함 */}
        <CategorySlider />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
