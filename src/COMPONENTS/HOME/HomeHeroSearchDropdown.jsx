import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../API/axios";
import DefaultStoreImg from "../../IMAGE/place/defaultImage.svg";
import "../../CSS/HOME/HomeHero.css";

export default function HomeHeroSearchDropdown() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (keyword) => {
    setSearch(keyword);
    if (!keyword.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
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
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-search" style={{ position: "relative" }}>
      <input
        className="hero-search-input"
        placeholder="서산 어디로 가볼까요?"
        aria-label="여행지 검색"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        autoComplete="off"
      />
      <button className="hero-search-btn" aria-label="검색">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 0 0 1.57-4.23A6.5 6.5 0 1 0 9.5 16a6.471 6.471 0 0 0 4.23-1.57l.27.28v.79L20 21.5 21.5 20 15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </button>
      {search && (
        <div className="hero-search-dropdown" style={{
          position: "absolute",
          left: 0,
          top: "4.6rem",
          width: "100%",
          background: "#222",
          borderRadius: "0.8rem",
          boxShadow: "0 2px 18px #0005",
          zIndex: 1,
          maxHeight: 260,
          overflowY: "auto",
        }}>
          {loading && (
            <div style={{ color: "#fff", padding: "1.2rem", textAlign: "center" }}>검색 중...</div>
          )}
          {!loading && results.length === 0 && (
            <div style={{ color: "#aaa", padding: "1.2rem", textAlign: "center" }}>검색 결과가 없습니다</div>
          )}
          {!loading && results.map((item, idx) => (
            <div
              key={idx}
              className="hero-search-dropdown-item"
              style={{ display: "flex", alignItems: "center", gap: "1.1rem", padding: "1.1rem 1.2rem", cursor: "pointer" }}
              onClick={() => {
                const path =
                  item._type === "store"
                    ? `/store/${item.id}`
                    : `/place/${item.id}`;
                navigate(path);
              }}
            >
              <img
                src={item.imageUrl || (item._type === "store" ? DefaultStoreImg : "")}
                alt={item.name}
                style={{ width: "2.7rem", height: "2.7rem", objectFit: "cover", borderRadius: "0.7rem", background: "#eee" }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "#4bcdfd", fontWeight: 600 }}>{item.name}</div>
                <div style={{ color: "#eee", fontSize: "1rem" }}>{item.address}</div>
                <div style={{ color: "#aaa", fontSize: "0.95rem" }}>{item._type === "store" ? "업소" : "관광지"}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
