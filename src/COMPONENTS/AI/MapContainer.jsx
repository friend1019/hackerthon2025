// src/COMPONENTS/AI/MapContainer.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import Header from "../COMMON/Header";
import "../../CSS/AI/MapContainer.css";

const transportModes = [
  { value: "driving", label: "🚗 자동차", icon: "🚗" },
  { value: "walking", label: "🚶 도보", icon: "🚶" },
  { value: "transit", label: "🚌 대중교통", icon: "🚌" },
  { value: "bicycle", label: "🚲 자전거", icon: "🚲" },
];
const SPEED = { driving: 40, walking: 5, transit: 25, bicycle: 15 };

function getMockDistanceAndTime(lat1, lng1, lat2, lng2, mode) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  const time = (distance / SPEED[mode]) * 60;
  return { distance: distance.toFixed(1), time: Math.round(time) };
}

// ✅ 커스텀 핀(SVG) 이미지
function makePinImage(kakao, color = "#80A5F6") {
  const svg = `
  <svg width="20" height="28" viewBox="0 0 22 30" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="ds" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" flood-color="rgba(0,0,0,0.35)"/>
      </filter>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity="1"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0.9"/>
      </linearGradient>
    </defs>
    <path d="M11 0c6.1 0 11 4.9 11 11 0 7.5-11 19-11 19S0 18.5 0 11C0 4.9 4.9 0 11 0z" fill="url(#g)" filter="url(#ds)"/>
    <circle cx="11" cy="11" r="5.2" fill="#fff"/>
    <circle cx="11" cy="11" r="2.4" fill="${color}"/>
  </svg>`;
  const url = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  const size = new kakao.maps.Size(20, 28);
  const offset = new kakao.maps.Point(10, 28); // 하단 중앙 기준
  return new kakao.maps.MarkerImage(url, size, { offset });
}

export default function MapContainer({
  places: propPlaces = [],
  initialMode = "driving",
  onMapReady,
  onRouteComputed,
}) {
  const location = useLocation();

  // ===== 상태 =====
  const [places, setPlaces] = useState([]);
  const [selectedMode, setSelectedMode] = useState(initialMode);
  const [routeInfo, setRouteInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRouteInfo, setShowRouteInfo] = useState(false);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(null); // null=전체

  // ===== refs =====
  const mapRef = useRef(null);
  const mapInitedRef = useRef(false);
  const onMapReadyRef = useRef(onMapReady);
  const onRouteComputedRef = useRef(onRouteComputed);

  const markersRef = useRef([]);
  const overlaysRef = useRef([]); // 이름 카드
  const pulseOverlaysRef = useRef([]); // 펄스
  const segmentRefs = useRef([]); // [{outline, polyline, label}]
  const firstCardOpenedOnceRef = useRef(false);

  useEffect(() => {
    onMapReadyRef.current = onMapReady;
  }, [onMapReady]);
  useEffect(() => {
    onRouteComputedRef.current = onRouteComputed;
  }, [onRouteComputed]);

  // ===== 데이터 로딩 (props → location.state → localStorage) =====
  useEffect(() => {
    const candidates = [
      Array.isArray(propPlaces) ? propPlaces : [],
      Array.isArray(location?.state?.places) ? location.state.places : [],
      (() => {
        try {
          const raw = localStorage.getItem("places");
          const parsed = raw ? JSON.parse(raw) : [];
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      })(),
    ];

    const firstValid = candidates.find((arr) => arr.length > 0) || [];
    const next = firstValid
      .map((p) => ({
        name: p.name,
        lat: Number(p.lat ?? p.latitude),
        lng: Number(p.lng ?? p.longitude),
      }))
      .filter(
        (p) => p.name && Number.isFinite(p.lat) && Number.isFinite(p.lng)
      );

    const sameLength = places.length === next.length;
    const sameAll =
      sameLength &&
      places.every(
        (v, i) =>
          v.name === next[i].name &&
          v.lat === next[i].lat &&
          v.lng === next[i].lng
      );

    if (!sameAll) setPlaces(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propPlaces, location?.state?.places]);

  // ===== Kakao SDK 로더 =====
  const loadKakao = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.kakao?.maps?.LatLng) return resolve();
      const apiKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;
      if (!apiKey) return reject(new Error("REACT_APP_KAKAO_MAP_API_KEY 누락"));

      const id = "kakao-map-sdk";
      const ready = () => {
        try {
          window.kakao.maps.load(() => {
            if (window.kakao?.maps?.LatLng) resolve();
            else reject(new Error("kakao.maps 준비 실패"));
          });
        } catch {
          reject(new Error("kakao.maps.load 호출 실패"));
        }
      };

      const existed = document.getElementById(id);
      if (existed) {
        existed.addEventListener("load", ready, { once: true });
        existed.addEventListener("error", () =>
          reject(new Error("카카오맵 스크립트 로드 실패(중복)"))
        );
        return;
      }

      const s = document.createElement("script");
      s.id = id;
      s.async = true;
      s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
      s.onload = ready;
      s.onerror = () => reject(new Error("카카오맵 스크립트 로드 실패"));
      document.head.appendChild(s);
    });
  }, []);

  // ===== 정리 유틸 =====
  function clearMarkersAndOverlays() {
    markersRef.current.forEach((m) => m.setMap && m.setMap(null));
    overlaysRef.current.forEach((o) => o.setMap && o.setMap(null));
    pulseOverlaysRef.current.forEach((p) => p.setMap && p.setMap(null));
    markersRef.current = [];
    overlaysRef.current = [];
    pulseOverlaysRef.current = [];
  }
  function clearSegments() {
    segmentRefs.current.forEach((seg) => {
      seg.outline?.setMap && seg.outline.setMap(null);
      seg.polyline?.setMap && seg.polyline.setMap(null);
      seg.label?.setMap && seg.label.setMap(null);
    });
    segmentRefs.current = [];
  }

  // ===== 마커 + 카드 + 펄스 =====
  function addMarkerWithOverlay(map, place, idx, openNow = false) {
    const { kakao } = window;
    const pos = new kakao.maps.LatLng(place.lat, place.lng);

    // 마커(커스텀 핀)
    const image = makePinImage(kakao, "#80A5F6");
    const marker = new kakao.maps.Marker({
      position: pos,
      map,
      image,
      zIndex: 4,
    });
    markersRef.current.push(marker);

    // 펄스
    const pulseEl = document.createElement("div");
    pulseEl.className = "seosan-pin-pulse";
    const pulseOverlay = new kakao.maps.CustomOverlay({
      position: pos,
      content: pulseEl,
      xAnchor: 0.5,
      yAnchor: 1.0, // 핀 끝점
      zIndex: 3,
      clickable: false,
    });
    pulseOverlay.setMap(map);
    pulseOverlaysRef.current.push(pulseOverlay);

    // 카드
    const container = document.createElement("div");
    container.className = "seosan-overlay-card";
    container.innerHTML = `
      <div class="title">${idx + 1}. ${place.name ?? "장소"}</div>
      <div class="seosan-overlay-arrow"></div>
    `;

    const overlay = new kakao.maps.CustomOverlay({
      position: pos,
      content: container,
      yAnchor: 1.15,
      xAnchor: 0.5,
      zIndex: 5,
      clickable: true,
    });
    overlaysRef.current.push(overlay);

    let visible = false;
    const show = () => {
      if (!visible) {
        overlay.setMap(map);
        visible = true;
      }
    };
    const hide = () => {
      if (visible) {
        overlay.setMap(null);
        visible = false;
      }
    };

    if (openNow && !firstCardOpenedOnceRef.current) {
      show();
      firstCardOpenedOnceRef.current = true;
    }

    kakao.maps.event.addListener(marker, "click", () => {
      overlaysRef.current.forEach((o) => o.setMap && o.setMap(null));
      visible = false;
      show();
    });
    kakao.maps.event.addListener(marker, "mouseover", show);
    kakao.maps.event.addListener(marker, "mouseout", hide);
    kakao.maps.event.addListener(map, "click", hide);

    return { marker, overlay, pulseOverlay };
  }

  // ===== 경로 그리기(구간별 색/대시 + 라벨) =====
  const drawRoute = useCallback(async (placesArg, mode, map) => {
    if (!map || !window.kakao?.maps) return;
    clearSegments();

    if (!placesArg || placesArg.length < 2) {
      setRouteInfo([]);
      return;
    }

    setLoading(true);
    try {
      const info = [];
      const { kakao } = window;

      const COLORS = [
        "#80A5F6",
        "#03C75A",
        "#FF7A59",
        "#FFD400",
        "#9B59B6",
        "#E74C3C",
      ];
      const STYLES = ["solid", "shortdash", "dash", "shortdot"];

      for (let i = 0; i < placesArg.length - 1; i++) {
        const o = placesArg[i],
          d = placesArg[i + 1];
        const r = getMockDistanceAndTime(o.lat, o.lng, d.lat, d.lng, mode);
        info.push({
          from: o.name,
          to: d.name,
          distance: r.distance,
          time: r.time,
        });

        const path = [
          new kakao.maps.LatLng(o.lat, o.lng),
          new kakao.maps.LatLng(d.lat, d.lng),
        ];
        const color = COLORS[i % COLORS.length];
        const style = STYLES[i % STYLES.length];

        const outline = new kakao.maps.Polyline({
          path,
          strokeWeight: 8,
          strokeColor: "rgba(0,0,0,0.45)",
          strokeOpacity: 0.7,
          strokeStyle: "solid",
          zIndex: 2,
        });
        outline.setMap(map);

        const polyline = new kakao.maps.Polyline({
          path,
          strokeWeight: 6,
          strokeColor: color,
          strokeOpacity: 0.95,
          strokeStyle: style,
          zIndex: 3,
        });
        polyline.setMap(map);

        // 중간 라벨
        const midLat = (o.lat + d.lat) / 2;
        const midLng = (o.lng + d.lng) / 2;
        const labelEl = document.createElement("div");
        labelEl.className = "seosan-seg-label";
        labelEl.textContent = `코스 ${i + 1}`;
        labelEl.style.borderColor = color;

        const labelOverlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(midLat, midLng),
          content: labelEl,
          xAnchor: 0.5,
          yAnchor: 0.5,
          zIndex: 4,
          clickable: false,
        });
        labelOverlay.setMap(map);

        segmentRefs.current.push({ outline, polyline, label: labelOverlay });
      }

      setRouteInfo(info);
      onRouteComputedRef.current?.(info);
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ===== 표시/줌 유틸 =====
  const fitBoundsForAll = useCallback(() => {
    const map = mapRef.current;
    if (!map || markersRef.current.length === 0) return;
    const { kakao } = window;
    const bounds = new kakao.maps.LatLngBounds();
    markersRef.current.forEach((m) => bounds.extend(m.getPosition()));
    map.relayout();
    map.setBounds(bounds);
  }, []);

  // ✅ 구간 중심으로 정확히 보이게: 패널 높이만큼 Y보정 + 한단계 줌
  const focusSegmentCenter = useCallback(
    (i, delay = 0) => {
      const map = mapRef.current;
      if (!map || !places[i] || !places[i + 1]) return;

      const midLat = (places[i].lat + places[i + 1].lat) / 2;
      const midLng = (places[i].lng + places[i + 1].lng) / 2;

      const run = () => {
        map.relayout(); // 패널 변화 반영

        const proj = map.getProjection?.();
        const { kakao } = window;
        const midLatLng = new kakao.maps.LatLng(midLat, midLng);

        // 패널 높이의 35% 만큼 위로 올려서 중앙 체감 보정
        let yOffset = 0;
        const sheet = document.querySelector(".seosan-route-info-list");
        if (sheet) {
          const h = sheet.clientHeight || 0;
          yOffset = Math.min(Math.round(h * 0.35), 220);
        }

        if (proj?.containerPointFromCoords && proj?.coordsFromContainerPoint) {
          const pt = proj.containerPointFromCoords(midLatLng);
          const adjPt = new kakao.maps.Point(pt.x, pt.y + yOffset);
          const target = proj.coordsFromContainerPoint(adjPt);
          map.panTo(target);
        } else {
          map.panTo(midLatLng);
        }

        const current = map.getLevel();
        if (current > 1) map.setLevel(current); // 한 단계만 줌
      };

      if (delay > 0) setTimeout(run, delay);
      else run();
    },
    [places]
  );

  const applySegmentVisibility = useCallback((idx) => {
    const map = mapRef.current;
    if (!map) return;
    const segs = segmentRefs.current;

    segs.forEach((seg, i) => {
      const show = idx === null || i === idx;
      seg.outline?.setMap && seg.outline.setMap(show ? map : null);
      seg.polyline?.setMap && seg.polyline.setMap(show ? map : null);
      seg.label?.setMap && seg.label.setMap(show ? map : null);

      if (seg.polyline?.setOptions) {
        seg.polyline.setOptions({
          strokeWeight: show && idx !== null ? 8 : 6,
          strokeOpacity: show && idx !== null ? 1 : 0.95,
          zIndex: show && idx !== null ? 5 : 3,
        });
      }
    });
  }, []);

  const showOverlaysForSegment = useCallback((i) => {
    const map = mapRef.current;
    if (!map) return;
    overlaysRef.current.forEach((ov, idx) => {
      if (idx === i || idx === i + 1) ov.setMap(map);
      else ov.setMap(null);
    });
  }, []);

  // ===== 코스 포커스 핸들러 =====
  const handleFocusSegment = useCallback(
    (i) => {
      setSelectedSegmentIndex(i);
      applySegmentVisibility(i);
      showOverlaysForSegment(i);

      // 패널이 닫혀 있었다면 먼저 열고, 열림 트랜지션(0.28s) 뒤에 중심 이동
      const needDelay = !showRouteInfo;
      if (!showRouteInfo) setShowRouteInfo(true);

      focusSegmentCenter(i, needDelay ? 300 : 0);
    },
    [
      applySegmentVisibility,
      showOverlaysForSegment,
      focusSegmentCenter,
      showRouteInfo,
    ]
  );

  const handleShowAllSegments = useCallback(() => {
    setSelectedSegmentIndex(null);
    applySegmentVisibility(null);
    overlaysRef.current.forEach((o) => o.setMap && o.setMap(null));
    fitBoundsForAll();
  }, [applySegmentVisibility, fitBoundsForAll]);

  // ===== 지도 초기화 / 업데이트 =====
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await loadKakao();
        if (cancelled) return;

        const { kakao } = window;
        const container = document.getElementById("map");
        if (!container) return;

        if (!mapInitedRef.current) {
          const map = new kakao.maps.Map(container, {
            center: new kakao.maps.LatLng(36.7819, 126.4502),
            level: 8,
          });
          mapRef.current = map;
          mapInitedRef.current = true;
          onMapReadyRef.current?.(map);
        }

        const map = mapRef.current;
        if (!map) return;

        // 마커/Bounds 갱신 (첫 마커 자동 오픈)
        clearMarkersAndOverlays();

        if (places.length > 0) {
          const bounds = new kakao.maps.LatLngBounds();
          places.forEach((p, idx) => {
            const { marker } = addMarkerWithOverlay(map, p, idx, idx === 0);
            bounds.extend(marker.getPosition());
          });
          map.setBounds(bounds);
        }

        // 경로 구간 갱신
        await drawRoute(places, selectedMode, map);

        // 현재 선택 상태에 맞게 표시 + 중심 이동
        if (selectedSegmentIndex === null) {
          fitBoundsForAll();
        } else {
          applySegmentVisibility(selectedSegmentIndex);
          showOverlaysForSegment(selectedSegmentIndex);
          // 패널 상태를 고려해서 약간의 딜레이 후 중심 이동
          focusSegmentCenter(selectedSegmentIndex, showRouteInfo ? 0 : 300);
        }
      } catch (e) {
        console.error("카카오맵 초기화/업데이트 오류:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    places,
    selectedMode,
    loadKakao,
    drawRoute,
    applySegmentVisibility,
    selectedSegmentIndex,
    fitBoundsForAll,
    focusSegmentCenter,
    showOverlaysForSegment,
    showRouteInfo,
  ]);

  // ====== 네이버 지도 p/directions 전용 헬퍼들 ======
  // 값 꺼내기 (lat/lng 또는 latitude/longitude 모두 지원)
  const getLat = (p) => Number(p.lat ?? p.latitude);
  const getLng = (p) => Number(p.lng ?? p.longitude);

  // WGS84(위도/경도) → Web Mercator(EPSG:3857) 변환
  const toMercator = (lat, lng) => {
    const R = 6378137.0;
    const x = R * ((lng * Math.PI) / 180);
    const y = R * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 180 / 2));
    return [x, y];
  };

  // 소수 자리수 정리(과하지 않게)
  const fmt = (n) => (Math.round(n * 1e7) / 1e7).toString();
  // // 전체 경로 열기 (경유지는 최대 3개, 모드: transit 고정, 카메라: c=14.00,…)
  // const openNaverMap = useCallback(() => {
  //   if (!Array.isArray(places) || places.length < 2) return;

  //   const start = places[0];
  //   const end = places[places.length - 1];
  //   const vias = places.slice(1, -1).slice(0, 3);

  //   const parts = [segP(start), ...vias.map(segP), segP(end)];
  //   const url = `https://map.naver.com/p/directions/${parts.join(
  //     "/"
  //   )}/-/transit?c=14.00,0,0,0,dh`;

  //   window.open(url, "_blank", "noopener");
  // }, [places]);

  // 특정 구간만 열기 (i → i+1, 대중교통 고정)
  const openNaverSegment = useCallback(
    (i) => {
      // segP를 이 안에 정의
      const segP = (p) => {
        const lat = getLat(p);
        const lng = getLng(p);
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return "";
        const [x, y] = toMercator(lat, lng);
        const name = encodeURIComponent(p.name || "");
        const poi = p.naverPlaceId ? `,${p.naverPlaceId},PLACE_POI` : "";
        return `${fmt(x)},${fmt(y)},${name}${poi}`;
      };

      if (!Array.isArray(places) || i < 0 || i >= places.length - 1) return;
      const o = places[i];
      const d = places[i + 1];
      const url = `https://map.naver.com/p/directions/${segP(o)}/${segP(
        d
      )}/-/transit?c=14.00,0,0,0,dh`;
      window.open(url, "_blank", "noopener");
    },
    [places]
  );

  const navigate = useNavigate();
  const prevStep = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="seosan-map-fullscreen-container">
      <Header />
      <button
        className="step-interest-prev-btn"
        onClick={prevStep}
        aria-label="이전 단계로"
      >
        <FiChevronLeft style={{ fontSize: "2.1rem", color: "black" }} />
      </button>
      {/* 교통수단 선택 */}
      <div className="seosan-transport-mode-overlay">
        <div className="seosan-transport-mode-selector">
          <h3>교통수단</h3>
          <div className="seosan-mode-buttons">
            {transportModes.map((m) => (
              <button
                key={m.value}
                className={`seosan-mode-button ${
                  selectedMode === m.value ? "active" : ""
                }`}
                onClick={() => setSelectedMode(m.value)}
              >
                <span className="seosan-mode-icon">{m.icon}</span>
                <span className="seosan-mode-label">
                  {m.label.split(" ")[1]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 지도 */}
      <div id="map" className="seosan-map-container" />

      {/* 장소 없음 안내 */}
      {places.length === 0 && (
        <div className="seosan-no-places-overlay">
          <div className="seosan-no-places-message">
            <h3>장소 데이터가 없습니다</h3>
            <p>
              AI 추천에서 ‘지도 보기’를 눌러 이동하거나, 샘플 데이터를
              로드하세요.
            </p>
            <div className="seosan-command-examples">
              <div className="seosan-command">
                <strong>서산9경:</strong>
                <code>loadSeosan9ScenicOnStart()</code>
              </div>
              <div className="seosan-command">
                <strong>서울 관광지:</strong>
                <code>loadSeoulOnStart()</code>
              </div>
              <div className="seosan-command">
                <strong>샘플:</strong>
                <code>saveSamplePlaces()</code>
              </div>
              <div className="seosan-command">
                <strong>삭제:</strong>
                <code>clearPlacesAndReload()</code>
              </div>
            </div>
            <div className="seosan-note">
              💡 개발자도구(Console)에서 실행하세요.
            </div>
          </div>
        </div>
      )}

      {/* 하단 경로 패널 */}
      {places.length > 0 && (
        <div
          className={`seosan-route-info-overlay ${
            showRouteInfo ? "active" : ""
          }`}
        >
          <button
            className="seosan-route-toggle-button"
            onClick={() => setShowRouteInfo((s) => !s)}
          >
            <span className="seosan-toggle-icon">—</span>
          </button>

          <div className="seosan-route-info-list">
            <div className="seosan-route-header">
              <h3>경로 정보</h3>
              <div className="seosan-route-header-actions">
                <button
                  className="seosan-show-all-button"
                  onClick={handleShowAllSegments}
                  disabled={selectedSegmentIndex === null}
                >
                  전체 경로 보기
                </button>
              </div>
            </div>

            {routeInfo.length > 0 ? (
              <div className="seosan-route-cards">
                {routeInfo.map((r, i) => (
                  <div
                    key={i}
                    className={`seosan-route-card ${
                      selectedSegmentIndex === i ? "active" : ""
                    }`}
                  >
                    <div className="seosan-route-card-header">
                      <div className="seosan-route-number">코스 {i + 1}</div>
                    </div>
                    <div className="seosan-route-card-content">
                      <div className="seosan-route-info-item">
                        <div className="seosan-route-label">경로</div>
                        <div className="seosan-route-value">
                          {r.from} → {r.to}
                        </div>
                      </div>
                      <div className="seosan-route-info-item">
                        <div className="seosan-route-label">거리</div>
                        <div className="seosan-route-value">
                          {r.distance} km
                        </div>
                      </div>
                      <div className="seosan-route-info-item">
                        <div className="seosan-route-label">시간</div>
                        <div className="seosan-route-value">{r.time}분</div>
                      </div>
                    </div>

                    <div className="seosan-seg-actions">
                      <button
                        className={`seosan-seg-view-button ${
                          selectedSegmentIndex === i ? "active" : ""
                        }`}
                        onClick={() => handleFocusSegment(i)}
                      >
                        구간 보기
                      </button>
                      <button
                        className="seosan-seg-naver-button"
                        onClick={() => openNaverSegment(i)}
                      >
                        네이버 지도
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="seosan-no-route-message">
                {loading
                  ? "경로 정보를 계산 중입니다..."
                  : "경로 정보가 없습니다."}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
