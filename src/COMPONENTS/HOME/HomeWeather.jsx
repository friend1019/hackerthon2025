import React, { useEffect, useState } from "react";
import { getSeosanWeatherFromKMA } from "../../API/kmaClient"; // ← 경로 확인(소문자 api)
import "../../CSS/HOME/HomeWeather.css";

import Sun1 from "../../IMAGE/icons/sun1.svg";
import Rain1 from "../../IMAGE/icons/rain1.svg";
import Snow1 from "../../IMAGE/icons/snow1.svg";
import Cloud1 from "../../IMAGE/icons/cloud1.svg";

import Sun2 from "../../IMAGE/icons/sun2.svg";
import Rain2 from "../../IMAGE/icons/rain2.svg";
import Snow2 from "../../IMAGE/icons/snow2.svg";
import Cloud2 from "../../IMAGE/icons/cloud2.svg";

// 더미 (API 장애 시)
const FALLBACK = {
  currentTemperature: "31",
  currentSky: "맑음",
  precipitation: "없음",
  weeklyForecast: [
    { date: "20250820", tempMax: "31", tempMin: "26", skyAm: "맑음",   skyPm: "구름많음" },
    { date: "20250821", tempMax: "32", tempMin: "25", skyAm: "구름많음", skyPm: "구름많음" },
    { date: "20250822", tempMax: "31", tempMin: "25", skyAm: "흐림",   skyPm: "맑음" },
    { date: "20250823", tempMax: "31", tempMin: "25", skyAm: "구름많음", skyPm: "흐림" },
    { date: "20250824", tempMax: "29", tempMin: "23", skyAm: "비",     skyPm: "비" },
  ],
};

const MAIN_ICON = {
  맑음: Sun1,
  구름많음: Cloud1,
  흐림: Cloud1,
  비: Rain1,
  "비/눈": Snow1,        // 혼합 강수
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
  "비/눈": Snow2,        // 혼합 강수
  빗방울: Rain2,
  눈: Snow2,
  빗방울눈날림: Snow2,
  눈날림: Snow2,
  default: Cloud2,
};

// ---------- 유틸들 ----------

// 온도 포맷(숫자면 'NN°', 아니면 '-')
const fmtTemp = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? `${Math.round(n)}°` : "-";
};

// 하늘 상태 정규화
const normalizeSky = (skyRaw = "") => {
  const sky = String(skyRaw).trim();
  if (sky.includes("맑")) return "sunny";
  if (sky.includes("비") && sky.includes("눈")) return "mix";
  if (sky.includes("눈")) return "snow";
  if (sky.includes("비") || sky.includes("빗방울")) return "rain";
  if (sky.includes("구름") || sky.includes("흐림")) return "cloudy";
  return "cloudy";
};

// 기온대 구간화
const tempBand = (t) => {
  const n = Number.isFinite(t) ? t : NaN;
  if (Number.isNaN(n)) return "unknown";
  if (n >= 33) return "very_hot";
  if (n >= 28) return "hot";
  if (n >= 22) return "mild";
  if (n >= 15) return "cool";
  if (n >= 5)  return "chilly";
  return "cold";
};

// 배지 문구 생성 (하늘 + 기온대 조합)
const getBadgeMessage = (skyRaw, tempRaw) => {
  const sky = normalizeSky(skyRaw);
  const band = tempBand(Number(tempRaw));
  if (band === "unknown") return "서산여행하기 좋은 날씨네요!";

  switch (sky) {
    case "sunny":
      switch (band) {
        case "very_hot": return "햇살이 강해요. 모자와 물 필수! 🧢💧";
        case "hot":      return "해가 좋은 날, 시원한 커피 한 잔 어떨까요? ☕";
        case "mild":     return "맑고 선선해서 걷기 딱 좋아요. 🚶‍♀️";
        case "cool":     return "햇살은 좋고 바람은 살짝—겉옷 하나면 충분해요. 🧥";
        case "chilly":   return "맑지만 쌀쌀해요. 따뜻하게 입고 나가요! 🧣";
        case "cold":     return "쨍하지만 매서운 추위, 장갑 챙기세요! 🧤";
        default:         return "오늘은 맑은 하늘! 기분 좋은 하루 보내요. ☀️";
      }
    case "cloudy":
      switch (band) {
        case "very_hot": return "구름 사이로 뜨거운 햇살, 더위 관리 잊지 마세요. 🔆";
        case "hot":      return "구름이 좀 있어도 덥네요. 내륙 코스도 추천!🐇";
        case "mild":     return "구름이 햇살을 가려서 걷기 편해요. 🌤️";
        case "cool":     return "흐리고 선선—겉옷 하나 챙기면 딱! 🧥";
        case "chilly":   return "구름 낀 쌀쌀한 날, 따뜻한 음료가 어울려요. ☕";
        case "cold":     return "흐리고 차갑습니다. 방한 꼭 챙겨요! 🥶";
        default:         return "구름 많은 하루, 여유롭게 둘러보아요. ☁️";
      }
    case "rain":
      switch (band) {
        case "very_hot":
        case "hot":      return "후덥지근한 비—우산과 가벼운 옷차림 추천! ☔";
        case "mild":     return "비 오는 날, 카페에서 빗소리 감상 어떨까요? ☔☕";
        case "cool":
        case "chilly":   return "비와 함께 선선해요. 방수 겉옷 잊지 말기! 🧥";
        case "cold":     return "차가운 비, 체온 관리 신경 써요. ☔🔥";
        default:         return "비 소식 있어요. 우산 꼭 챙기세요! ☔";
      }
    case "snow":
      switch (band) {
        case "very_hot":
        case "hot":
        case "mild":     return "눈 소식이 있네요. 미끄럼 주의해요! ❄️";
        case "cool":
        case "chilly":   return "눈 오는 선선한 날—따뜻하게 입고 걸어봐요. ❄️🧥";
        case "cold":     return "서산이 하얗게—길 미끄러우니 조심! ❄️🧊";
        default:         return "하얀 풍경이 펼쳐져요. 안전하게 즐겨요! ❄️";
      }
    case "mix":
      return "눈비가 함께 내려요. 방수 신발과 우산 준비! ☔🥾";
    default:
      return "서산여행하기 좋은 날씨네요!";
  }
};

// 현재 시각 라벨
const nowLabel = () =>
  new Date()
    .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
    .replace(" ", "");

// KST 기준 오늘 YYYYMMDD
const getKstTodayYMD = () => {
  const nowKST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  const y = nowKST.getFullYear();
  const m = String(nowKST.getMonth() + 1).padStart(2, "0");
  const d = String(nowKST.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
};

// 주간 예보에서 '오늘 이후' 3개만 추출
const pickUpcoming3 = (weekly = []) => {
  const today = getKstTodayYMD();
  const future = weekly.filter((it) => it?.date && it.date > today);
  return future.slice(0, 3);
};

// YYYYMMDD → 요일(한글)
const getDayOfWeek = (yyyymmdd) => {
  if (!yyyymmdd) return "";
  const y = +yyyymmdd.slice(0, 4);
  const m = +yyyymmdd.slice(4, 6) - 1;
  const d = +yyyymmdd.slice(6, 8);
  const dt = new Date(y, m, d);
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  return weekdays[dt.getDay()];
};

export default function HomeWeather() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const payload = await getSeosanWeatherFromKMA();
        setData(payload);
      } catch (e) {
        console.error("weather api error:", e);
        setErr("실시간 날씨를 불러오지 못했어요. 임시 데이터로 표시합니다.");
        setData(FALLBACK);
      }
    })();
  }, []);

  if (!data && !err) return <div className="hw-loading">로딩중…</div>;

  const rawWeekly = data?.weeklyForecast || [];
  // 오늘 정보
  const todayYmd = getKstTodayYMD();
  const today = rawWeekly.find((it) => it?.date === todayYmd) || rawWeekly[0] || {};
  // 내일/모레/글피
  const upcoming3 = pickUpcoming3(rawWeekly);

  const mainIcon = MAIN_ICON[data?.currentSky] || MAIN_ICON["default"];

  return (
    <section className="hw">
      {/* 좌측 큰 카드 */}
      <article className="hw-now">
        <header className="hw-now__top">
          <div className="hw-now__place">
            현재, 서산은 <strong>{data?.currentSky || "-"}</strong>
          </div>
          <div className="hw-now__time">{nowLabel()}</div>
        </header>

        {/* 두 열 정렬 + 하단 배지 */}
        <div className="hw-now__main">
          {/* 온도 */}
          <div className="hw-now__tempwrap">
            <div className="hw-now__temp">
              {data?.currentTemperature ?? "-"}
              <span className="hw-now__deg">°</span>
            </div>
          </div>

          {/* 최고/최저 — 오늘 기준 */}
          <div className="hw-now__minmax">
            <div>최고기온 {fmtTemp(today?.tempMax)}</div>
            <div>최저기온 {fmtTemp(today?.tempMin)}</div>
          </div>

          {/* 오른쪽 큰 아이콘 */}
          <div className="hw-now__right">
            <img src={mainIcon} alt="main weather" className="hw-now__bigicon" />
          </div>

          {/* 중앙 하단 배지 */}
          <div className="hw-now__badge">
            {getBadgeMessage(data?.currentSky, Number(data?.currentTemperature))}
          </div>
        </div>
      </article>

      {/* 우측 상단: 오전/오후 (오늘) */}
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

      {/* 우측 하단: 주간(3일) — 오전/오후 + 최고/최저 */}
      <article className="hw-week">
        {/* 헤더 라벨 */}
        <div className="hw-week__header">
          <div className="hw-week__hcell hw-week__hday">요일</div>
          <div className="hw-week__hcell">오전</div>
          <div className="hw-week__hcell">오후</div>
          <div className="hw-week__hcell">최고</div>
          <div className="hw-week__hcell">최저</div>
        </div>

        {upcoming3.map((d, i) => {
          const dow = d?.date ? getDayOfWeek(d.date) : "-";
          return (
            <div className="hw-week__row" key={`${d?.date || "nodate"}-${i}`}>
              <div className="hw-week__date">{dow}</div>
              <div className="hw-week__am">
                <img
                  src={SUB_ICON[d?.skyAm] || SUB_ICON["default"]}
                  alt={`${dow} 오전`}
                />
              </div>
              <div className="hw-week__pm">
                <img
                  src={SUB_ICON[d?.skyPm] || SUB_ICON["default"]}
                  alt={`${dow} 오후`}
                />
              </div>
              <div className="hw-week__max">{fmtTemp(d?.tempMax)}</div>
              <div className="hw-week__min">{fmtTemp(d?.tempMin)}</div>
            </div>
          );
        })}
      </article>
    </section>
  );
}
