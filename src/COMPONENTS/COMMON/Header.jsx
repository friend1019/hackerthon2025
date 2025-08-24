// src/COMPONENTS/COMMON/Header.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiSearch } from "react-icons/fi";

/* 내부 유틸/컴포넌트 */
import api from "../../API/axios";
import SideDrawer from "./SideDrawer";

/* 에셋 */
import Logo from "../../IMAGE/icons/logo.svg";
import DefaultStoreImg from "../../IMAGE/place/defaultImage.svg";

/* 스타일 */
import "../../CSS/COMMON/Header.css";

/** 타자 애니메이션 placeholder 훅 (파일 내 정의) */
function useTypewriterPlaceholder(
  words,
  { typeSpeed = 80, deleteSpeed = 50, hold = 1400, startDelay = 600 } = {}
) {
  const [text, setText] = useState("");
  const idxRef = useRef(0);
  const charRef = useRef(0);
  const delRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const type = () => {
      const w = words[idxRef.current];
      const deleting = delRef.current;

      if (!deleting) {
        charRef.current += 1;
        setText(w.slice(0, charRef.current));
        if (charRef.current === w.length) {
          delRef.current = true;
          timerRef.current = setTimeout(type, hold);
          return;
        }
      } else {
        charRef.current -= 1;
        setText(w.slice(0, charRef.current));
        if (charRef.current === 0) {
          delRef.current = false;
          idxRef.current = (idxRef.current + 1) % words.length;
        }
      }
      timerRef.current = setTimeout(type, deleting ? deleteSpeed : typeSpeed);
    };

    timerRef.current = setTimeout(type, startDelay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [words, typeSpeed, deleteSpeed, hold, startDelay]);

  return text;
}

/**
 * Header
 * - 상단 로고/검색/햄버거 메뉴 제공
 * - 통합 검색 모달 + 사이드 드로어 포함
 */
function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ 현재 경로 확인 (홈에서 검색 아이콘 숨김)

  /* === 상태 === */
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);

  /* === placeholder 애니메이션 문구 === */
  const SUGGESTIONS = ["해미읍성", "간월암", "황금산", "삼길포항", "유기방가옥", "서산버드랜드"];
  const typed = useTypewriterPlaceholder(SUGGESTIONS, {
    typeSpeed: 80,
    deleteSpeed: 50,
    hold: 1400,
    startDelay: 400,
  });

  /* === 바디 스크롤 잠금: 검색/드로어 열릴 때 === */
  useEffect(() => {
    if (showSearch || showDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSearch, showDrawer]);

  /* ESC로 모달 닫기 */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setShowDrawer(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* === 통합 검색: 관광지 + 업소 (이름 기준 부분 일치) === */
  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }
    try {
      const [tourRes, storeRes] = await Promise.all([
        api.get("/tourist-places"),
        api.get("/store"),
      ]);

      const tourData = tourRes.data.map((item) => ({
        ...item,
        _type: "tourist",
        imageUrl: item.imageUrl || null,
        id: item.id,
        name: item.name,
        address: item.address,
      }));

      const storeData = storeRes.data.map((item) => ({
        ...item,
        _type: "store",
        imageUrl: null,
        id: item.id,
        name: item.name,
        address: item.address,
      }));

      const all = [...tourData, ...storeData];
      const filtered = all.filter(
        (place) => place.name && place.name.includes(keyword)
      );
      setResults(filtered);
    } catch (error) {
      console.error("검색 오류:", error);
      setResults([]);
    }
  };

  /* === 렌더 === */
  return (
    <div className="header">
      {/* 상단 바 */}
      <header className="header-top">
        <div className="header-top-container">
          {/* 로고 */}
          <div className="logo-area">
            <Link to="/" className="logo-link">
              <img src={Logo} alt="logo" />
            </Link>
          </div>

          {/* 우측 아이콘 내비게이션 */}
          <nav className="navbar-container">
            {/* ✅ 홈이 아닐 때만 검색 아이콘 노출 */}
            {location.pathname !== "/" && (
              <li className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => setShowSearch(true)}
                  aria-label="검색 열기"
                >
                  <FiSearch className="nav-icon nav-search" />
                </button>
              </li>
            )}

            <li className="nav-item">
              <button
                className="nav-link"
                onClick={() => setShowDrawer(true)}
                aria-label="사이드 메뉴 열기"
              >
                <FiMenu className="nav-icon nav-hamburger" />
              </button>
            </li>
          </nav>
        </div>
      </header>

      {/* === 검색 모달 === */}
      {showSearch && (
        <div className="header-search-modal">
          {/* 모달 배경 */}
          <div
            className="header-search-modal-bg"
            onClick={() => setShowSearch(false)}
          />

          {/* 모달 내용 */}
          <div className="header-search-modal-content">
            <button
              className="header-search-modal-close"
              onClick={() => setShowSearch(false)}
            >
              닫기
            </button>

            {/* 검색 입력 */}
            <input
              type="text"
              className="header-search-input header-search-input--typewriter"
              placeholder={typed || "서산 어디로 가볼까요?"}
              value={search}
              onChange={(e) => {
                const v = e.target.value;
                setSearch(v);
                handleSearch(v);
              }}
              autoFocus
              aria-label="여행지 검색"
              autoComplete="off"
            />

            {/* 검색 결과 드롭다운 */}
            {search && results.length > 0 && (
              <div className="header-search-dropdown">
                {results.map((item, idx) => (
                  <div
                    key={idx}
                    className="header-search-dropdown-item"
                    onClick={() => {
                      const path =
                        item._type === "store"
                          ? `/store/${item.id}`
                          : `/place/${item.id}`;
                      navigate(path);
                      setShowSearch(false);
                    }}
                    tabIndex={0}
                    role="button"
                  >
                    <img
                      src={
                        item.imageUrl ||
                        (item._type === "store" ? DefaultStoreImg : "")
                      }
                      alt={item.name}
                      className="header-search-dropdown-img"
                    />

                    <div className="header-search-dropdown-info">
                      <div className="header-search-dropdown-name">
                        {item.name}
                      </div>
                      <div className="header-search-dropdown-addr">
                        {item.address}
                      </div>
                      <div className="header-search-dropdown-type">
                        {item._type === "store" ? "업소" : "관광지"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 검색어는 있지만 결과가 없을 때 메시지 */}
            {search && results.length === 0 && (
              <div
                className="header-search-dropdown"
                style={{ padding: "1.2rem", color: "#aaa" }}
              >
                검색 결과가 없습니다
              </div>
            )}
          </div>
        </div>
      )}

      {/* === 사이드 드로어 === */}
      <SideDrawer open={showDrawer} onClose={() => setShowDrawer(false)}>
        <div style={{ marginTop: "2.5rem" }}>
          {/* AI 섹션 */}
          <h2 className="side-drawer-title">
            <span style={{ marginRight: "1.3rem" }}>✨</span>AI
          </h2>
          <div className="side-drawer-divider" />

          <div
            className="side-drawer-menu-item"
            onClick={() => {
              navigate("/recommend");
              setShowDrawer(false);
            }}
          >
            <span className="side-drawer-menu-icon">📍</span>
            <span>AI 코스 생성하기</span>
          </div>
          <div className="side-drawer-menu-divider" />

          <div
            className="side-drawer-menu-item"
            onClick={() => {
              navigate("/ai-course");
              setShowDrawer(false);
            }}
          >
            <span className="side-drawer-menu-icon">🔄️</span>
            <span>내 코스 보기</span>
          </div>

          <div
            className="side-drawer-menu-divider"
            style={{ marginBottom: "10rem" }}
          />

          {/* 카테고리 섹션 */}
          <h2 className="side-drawer-title">
            <span style={{ marginRight: "1.3rem" }}>📌</span>카테고리
          </h2>
          <div className="side-drawer-divider" />

          <div
            className="side-drawer-menu-item"
            onClick={() => {
              navigate("/festival");
              setShowDrawer(false);
            }}
          >
            <span className="side-drawer-menu-icon">🌅</span>
            <span>서산 페스티벌</span>
          </div>
          <div className="side-drawer-menu-divider" />

          <div
            className="side-drawer-menu-item"
            onClick={() => {
              navigate("/aramegil");
              setShowDrawer(false);
            }}
          >
            <span className="side-drawer-menu-icon">🚶</span>
            <span>서산 아라메길</span>
          </div>
          <div className="side-drawer-menu-divider" />

          <div
            className="side-drawer-menu-item"
            onClick={() => {
              navigate("/9kyung");
              setShowDrawer(false);
            }}
          >
            <span className="side-drawer-menu-icon">⛰️</span>
            <span>서산 9경</span>
          </div>
          <div className="side-drawer-menu-divider" />

          <div
            className="side-drawer-menu-item"
            onClick={() => {
              navigate("/9mi");
              setShowDrawer(false);
            }}
          >
            <span className="side-drawer-menu-icon">🦀</span>
            <span>서산 9미</span>
          </div>
          <div className="side-drawer-menu-divider" />

          <div
            className="side-drawer-menu-item"
            onClick={() => {
              navigate("/9pum");
              setShowDrawer(false);
            }}
          >
            <span className="side-drawer-menu-icon">🧄</span>
            <span>서산 9품</span>
          </div>
        </div>
      </SideDrawer>
    </div>
  );
}

export default Header;
