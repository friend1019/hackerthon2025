import React from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/HOME/HomeHero.css";
import HomeHeroSearchDropdown from "./HomeHeroSearchDropdown";
import twostars from "../../IMAGE/twostars.svg";

export default function HomeHero() {
  const navigate = useNavigate();
  const handleAICourseClick = () => {
    navigate("/ai-course");
  };

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

          {/* 오비트 + 중앙 구 */}
          <div className="orbit-wrap" aria-hidden="true">
            <div className="orbit orbit-1" />
            <div className="orbit orbit-2" />
            <div className="orbit orbit-3" />
            <div className="orbit orbit-4" />

            {/* 중앙 구(글로우) */}
            <div className="core" />

            {/* 플로팅 아이콘(정확 공전) */}
            <div className="badge badge-a on-orbit-1" title="산">🏔️</div>
            <div className="badge badge-b on-orbit-2" title="바다">🌊</div>
            <div className="badge badge-c on-orbit-3" title="커플">🧑‍🤝‍🧑</div>
            <div className="badge badge-d on-orbit-4" title="가족" />
            <div className="badge badge-e on-orbit-3" title="장식" />
            <div className="badge badge-f on-orbit-2" title="장식" />
            <div className="badge badge-g on-orbit-4" title="장식" />
            <div className="badge badge-h on-orbit-3" title="장식" />
          </div>

          {/* CTA */}
          <button className="cta" type="button" onClick={handleAICourseClick}>
            <img src={twostars} alt="AI 추천" className="cta-twostars" style={{ width: "2.1rem", height: "2.1rem", verticalAlign: "middle", marginRight: "0.5rem" }} />
            내 코스 보기
          </button>
        </div>
      </div>
    </section>
  );
}
