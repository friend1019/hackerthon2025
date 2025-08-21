import React, { useEffect, useState } from "react";
import api from "../../API/axios.js";
import "../../CSS/HOME/HomeWeather.css";

import Sun1 from "../../IMAGE/sun1.svg";
import Rain1 from "../../IMAGE/rain1.svg";
import Snow1 from "../../IMAGE/snow1.svg";
import Cloud1 from "../../IMAGE/cloud1.svg";

import Sun2 from "../../IMAGE/sun2.svg";
import Rain2 from "../../IMAGE/rain2.svg";
import Snow2 from "../../IMAGE/snow2.svg";
import Cloud2 from "../../IMAGE/cloud2.svg";

// 더미 (API 장애 시)
const FALLBACK = {
  currentTemperature: "31",
  currentSky: "맑음",
  precipitation: "없음",
  weeklyForecast: [
    {
      date: "20250820",
      tempMax: "31",
      tempMin: "26",
      skyAm: "맑음",
      skyPm: "구름많음",
    },
    {
      date: "20250821",
      tempMax: "32",
      tempMin: "25",
      skyAm: "구름많음",
      skyPm: "구름많음",
    },
    {
      date: "20250822",
      tempMax: "31",
      tempMin: "25",
      skyAm: "흐림",
      skyPm: "맑음",
    },
    {
      date: "20250823",
      tempMax: "31",
      tempMin: "25",
      skyAm: "구름많음",
      skyPm: "흐림",
    },
    {
      date: "20250824",
      tempMax: null,
      tempMin: null,
      skyAm: null,
      skyPm: "맑음",
    },
  ],
};

const MAIN_ICON = {
  맑음: Sun1,
  구름많음: Cloud1,
  흐림: Cloud1,
  비: Rain1,
  빗방울: Rain1,
  눈: Snow1,
  빗방울눈날림: Snow1,
  눈날림: Snow1,
  default: Cloud1,
};
const SUB_ICON = {
  맑음: Sun2,
  구름많음: Cloud2,
  흐림: Cloud2,
  비: Rain2,
  빗방울: Rain2,
  눈: Snow2,
  빗방울눈날림: Snow2,
  눈날림: Snow2,
  default: Cloud2,
};

const dateToLabel = (yyyymmdd) => {
  if (!yyyymmdd) return "-";
  const y = +yyyymmdd.slice(0, 4);
  const m = +yyyymmdd.slice(4, 6) - 1;
  const d = +yyyymmdd.slice(6, 8);
  const dt = new Date(y, m, d);
  return `${dt.getMonth() + 1}/${dt.getDate()}`;
};
const nowLabel = () =>
  new Date()
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(" ", "");

export default function HomeWeather() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/weather/seosan", { timeout: 8000 });
        setData(res.data);
      } catch (e) {
        console.error("weather api error:", e);
        setErr("실시간 날씨를 불러오지 못했어요. 임시 데이터로 표시합니다.");
        setData(FALLBACK);
      }
    })();
  }, []);

  if (!data && !err) return <div className="hw-loading">로딩중…</div>;

  const weekly = (data?.weeklyForecast || []).slice(0, 3); // 3일만
  const today = weekly[0] || {};
  const mainIcon = MAIN_ICON[data?.currentSky] || MAIN_ICON["default"];

  return (
    <section className="hw">
      {/* 작게 쓰려면 hw hw--compact */}
      {/* 좌측 큰 카드 */}
      <article className="hw-now">
        <header className="hw-now__top">
          <div className="hw-now__place">
            현재, 서산은 <strong>{data?.currentSky || "-"}</strong>
          </div>
          <div className="hw-now__time">{nowLabel()}</div>
        </header>

        {/* ▼ 샘플처럼 두 열 정렬 + 하단 배지 */}
        <div className="hw-now__main">
          {/* 온도 */}
          <div className="hw-now__tempwrap">
            <div className="hw-now__temp">
              {data?.currentTemperature ?? "-"}
              <span className="hw-now__deg">°</span>
            </div>
          </div>

          {/* 최고/최저 */}
          <div className="hw-now__minmax">
            <div>최고기온 {today?.tempMax ?? "-"}</div>
            <div>최저기온 {today?.tempMin ?? "-"}</div>
          </div>

          {/* 오른쪽 큰 아이콘 */}
          <div className="hw-now__right">
            <img
              src={mainIcon}
              alt="main weather"
              className="hw-now__bigicon"
            />
          </div>

          {/* 중앙 하단 배지 */}
          <div className="hw-now__badge">
            {err
              ? "서산여행하기 좋은 날씨네요!"
              : "서산여행하기 좋은 날씨네요!"}
          </div>
        </div>
      </article>

      {/* 우측 상단: 오전/오후 */}
      <aside className="hw-side">
        <div className="hw-halfcard">
          <div className="hw-halfcard__label">오전</div>
          <div className="hw-halfcard__chip">{today?.skyAm || "-"}</div>
          <img
            src={SUB_ICON[today?.skyAm] || SUB_ICON["default"]}
            alt="morning weather"
            className="hw-halfcard__icon"
          />
        </div>

        <div className="hw-halfcard">
          <div className="hw-halfcard__label">오후</div>
          <div className="hw-halfcard__chip">{today?.skyPm || "-"}</div>
          <img
            src={SUB_ICON[today?.skyPm] || SUB_ICON["default"]}
            alt="afternoon weather"
            className="hw-halfcard__icon"
          />
        </div>
      </aside>

      {/* 우측 하단: 주간(3일) */}
      <article className="hw-week">
        {weekly.map((d, i) => (
          <div className="hw-week__row" key={`${d?.date || "nodate"}-${i}`}>
            <div className="hw-week__date">{dateToLabel(d?.date)}</div>
            <div className="hw-week__icons">
              <img src={SUB_ICON[d?.skyPm] || SUB_ICON["default"]} alt="pm" />
            </div>
            <div className="hw-week__temps">
              <span>{d?.tempMax ?? "-"}</span>
              <span className="hw-week__deg">°</span>

              <span>{d?.tempMin ?? "-"}</span>
              <span className="hw-week__deg">°</span>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
}
