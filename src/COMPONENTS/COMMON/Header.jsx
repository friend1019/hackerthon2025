import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../CSS/COMMON/Header.css";
import Logo from "../../IMAGE/logo.svg";
import { FiSearch, FiMenu } from "react-icons/fi";
import api from "../../API/axios";
import DefaultStoreImg from "../../IMAGE/defaultImage.svg";
import SideDrawer from "./SideDrawer";
// ...existing code...

function Header() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);

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

  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    try {
      // 관광지 + 업소 데이터 모두 조회
      const [tourRes, storeRes] = await Promise.all([
        api.get("/tourist-places"),
        api.get("/store"),
      ]);

      // 관광지 데이터 가공
      const tourData = tourRes.data.map((item) => ({
        ...item,
        _type: "tourist",
        imageUrl: item.imageUrl || null,
        id: item.id,
        name: item.name,
        address: item.address,
      }));

      // 업소 데이터 가공
      const storeData = storeRes.data.map((item) => ({
        ...item,
        _type: "store",
        imageUrl: null, // 기본 이미지 사용
        id: item.id,
        name: item.name,
        address: item.address,
      }));

      // 통합 필터링
      const all = [...tourData, ...storeData];
      const filtered = all.filter(
        (place) =>
          (place.name && place.name.includes(keyword)) ||
          (place.address && place.address.includes(keyword))
      );

      setResults(filtered);
    } catch (error) {
      console.error("검색 오류:", error);
      setResults([]);
    }
  };

  return (
    <div className="header">
      <header className="header-top">
        <div className="header-top-container">
          <div className="logo-area">
            <Link to="/" className="logo-link">
              <img src={Logo} alt="logo" />
            </Link>
          </div>

          <nav className="navbar-container">
            <li className="nav-item">
              <button className="nav-link" onClick={() => setShowSearch(true)}>
                <FiSearch className="nav-icon nav-search" />
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link" onClick={() => setShowDrawer(true)}>
                <FiMenu className="nav-icon nav-hamburger" />
              </button>
            </li>
          </nav>
        </div>
      </header>

      {/* 검색 모달 */}
      {showSearch && (
        <div className="header-search-modal">
          <div
            className="header-search-modal-bg"
            onClick={() => setShowSearch(false)}
          />
          <div className="header-search-modal-content">
            <button
              className="header-search-modal-close"
              onClick={() => setShowSearch(false)}
            >
              닫기
            </button>
            <input
              type="text"
              className="header-search-input"
              placeholder="장소 검색어 입력"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(e.target.value);
              }}
              autoFocus
            />
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
          </div>
        </div>
      )}

      {/* 사이드 드로어 */}
      <SideDrawer open={showDrawer} onClose={() => setShowDrawer(false)}>
        <div style={{ marginTop: "2.5rem" }}>
          <h2 className="side-drawer-title">
            <span style={{ marginRight: "1.3rem" }}>✨</span>AI
          </h2>
          <div className="side-drawer-divider" />
          <div className="side-drawer-menu-item" onClick={() => { navigate("/recommend"); setShowDrawer(false); }}>
            <span className="side-drawer-menu-icon">📍</span>
            <span>AI 코스 생성하기</span>
          </div>
          <div className="side-drawer-menu-divider" />
          <div className="side-drawer-menu-item" onClick={() => { navigate("/ai-course"); setShowDrawer(false); }}>
            <span className="side-drawer-menu-icon">🔄️</span>
            <span>AI 코스 다시보기</span>
          </div>
          <div className="side-drawer-menu-divider" style={{ marginBottom: "10rem" }} />
          <h2 className="side-drawer-title">
            <span style={{ marginRight: "1.3rem" }}>📌</span>카테고리
          </h2>
          <div className="side-drawer-divider" />
          <div className="side-drawer-menu-item" onClick={() => { navigate("/festival"); setShowDrawer(false); }}>
            <span className="side-drawer-menu-icon">🌅</span>
            <span>서산 페스티벌</span>
          </div>
          <div className="side-drawer-menu-divider" />
          {/* 아라메길 추가시 여기 수정해야함 */}
          <div className="side-drawer-menu-item" onClick={() => { navigate("/festival"); setShowDrawer(false); }}>
            <span className="side-drawer-menu-icon">🚶</span>
            <span>서산 아라메길</span>
          </div>
          <div className="side-drawer-menu-divider" />
          <div className="side-drawer-menu-item" onClick={() => { navigate("/9kyung"); setShowDrawer(false); }}>
            <span className="side-drawer-menu-icon">⛰️</span>
            <span>서산 9경</span>
          </div>
          <div className="side-drawer-menu-divider" />
          <div className="side-drawer-menu-item" onClick={() => { navigate("/9mi"); setShowDrawer(false); }}>
            <span className="side-drawer-menu-icon">🦀</span>
            <span>서산 9미</span>
          </div>
          <div className="side-drawer-menu-divider" />
          <div className="side-drawer-menu-item" onClick={() => { navigate("/9pum"); setShowDrawer(false); }}>
            <span className="side-drawer-menu-icon">🧄</span>
            <span>서산 9품</span>
          </div>
        </div>
      </SideDrawer>
    </div>
  );
}

export default Header;
