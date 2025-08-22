import React, { useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/HOME/HomeHero.css";
import HomeHeroSearchDropdown from "./HomeHeroSearchDropdown";
import twostars from "../../IMAGE/icons/twostars.svg";

function HomeHero() {
  const navigate = useNavigate();

  const handleAICourseClick = useCallback(() => {
    navigate("/ai-course");
  }, [navigate]);

  return (
    <section className="home-hero" aria-label="서산책 홈 히어로">
      {/* 상단 검색창 - 드롭다운 자동완성 */}
      <HomeHeroSearchDropdown />

      {/* 글래스 카드 */}
      <div className="hero-card">
        <div className="hero-card-inner">
          <div className="hero-titlebox">
            <h1 className="hero-title">반가워요!</h1>
            <p className="hero-sub">서산책이 당신만의 서산 여행을 준비해드릴게요.</p>
          </div>

          {/* 오비트 + 중앙 구 (순수 장식) */}
          <div className="orbit-wrap" aria-hidden="true">
            <div className="orbit orbit-1" />
            <div className="orbit orbit-2" />
            <div className="orbit orbit-3" />
            <div className="orbit orbit-4" />

            {/* 중앙 구(글로우) */}
            <div className="core" />

            {/* 플로팅 배지 */}
            <div className="badge badge-a on-orbit-1" role="img" aria-label="산">🏔️</div>
            <div className="badge badge-b on-orbit-2" role="img" aria-label="바다">🌊</div>
            <div className="badge badge-c on-orbit-3" role="img" aria-label="커플 여행">🧑‍🤝‍🧑</div>

            {/* 이하 장식 배지 - 스크린리더 숨김 */}
            <div className="badge badge-d on-orbit-4" aria-hidden="true" />
            <div className="badge badge-e on-orbit-3" aria-hidden="true" />
            <div className="badge badge-f on-orbit-2" aria-hidden="true" />
            <div className="badge badge-g on-orbit-4" aria-hidden="true" />
            <div className="badge badge-h on-orbit-3" aria-hidden="true" />
          </div>

          {/* CTA */}
          <button
            className="cta"
            type="button"
            onClick={handleAICourseClick}
            aria-label="AI 코스 추천으로 이동"
          >
            <img
              src={twostars}
              alt=""
              className="cta-twostars"
              style={{ width: "2.1rem", height: "2.1rem", verticalAlign: "middle", marginRight: "0.5rem" }}
              aria-hidden="true"
              loading="lazy"
            />
            내 코스 보기
          </button>
        </div>
      </div>
    </section>
  );
}

export default memo(HomeHero);
