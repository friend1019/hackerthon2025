// src/API/kmaClient.js
// KMA 단기예보/초단기실황을 호출해 HomeWeather가 쓰는 포맷으로 가공

const BASE = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";
// 키 자동 판별: 인코딩키면 그대로, 디코딩키면 1회 인코딩
const rawKey = (process.env.REACT_APP_KMA_SERVICE_KEY || "").trim();
const KEY = /%[0-9A-F]{2}/i.test(rawKey) ? rawKey : encodeURIComponent(rawKey);

// 서산시청 기준 위경도
const DEFAULT_LAT = 36.7849;
const DEFAULT_LON = 126.4506;

/* ===========================
 * 좌표 변환 (위경도 -> 기상청 격자)
 * =========================== */
function toXY(lat, lon) {
  const RE = 6371.00877;
  const GRID = 5.0;
  const SLAT1 = 30.0;
  const SLAT2 = 60.0;
  const OLON = 126.0;
  const OLAT = 38.0;
  const XO = 43;
  const YO = 136;

  const DEGRAD = Math.PI / 180.0;
  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = Math.pow(sf, sn) * (Math.cos(slat1) / sn);
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  let ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  let theta = lon * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  const x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  const y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
  return { nx: x, ny: y };
}

/* ===========================
 * 시간 유틸 (KST 고정)
 * =========================== */
function pad2(n) {
  return String(n).padStart(2, "0");
}
function toKST(d = new Date()) {
  return new Date(d.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
}
function yyyymmdd_kst(d = new Date()) {
  const k = toKST(d);
  return `${k.getFullYear()}${pad2(k.getMonth() + 1)}${pad2(k.getDate())}`;
}
function yyyymmdd_yesterday_kst(d = new Date()) {
  const k = toKST(d);
  k.setDate(k.getDate() - 1);
  return `${k.getFullYear()}${pad2(k.getMonth() + 1)}${pad2(k.getDate())}`;
}

/* ===========================
 * 숫자 정규화 (빈문자/NaN → null)
 * =========================== */
function toNumOrNull(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === "string" && v.trim() === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

/* ===========================
 * 기상청 발표시각 계산/백오프
 * =========================== */
// 단기예보(getVilageFcst): 02,05,08,11,14,17,20,23시
function latestVilageBase(now = new Date()) {
  const k = toKST(now);
  const hours = [23, 20, 17, 14, 11, 8, 5, 2];
  let baseDate = yyyymmdd_kst(k);
  let baseTime = "0200";
  const hh = k.getHours();
  for (const h of hours) {
    if (hh >= h) {
      baseTime = pad2(h) + "00";
      break;
    }
  }
  if (hh < 2) {
    const y = new Date(k.getTime() - 86400000);
    baseDate = yyyymmdd_kst(y);
    baseTime = "2300";
  }
  return { baseDate, baseTime };
}
function prevVilageBase(baseDate, baseTime) {
  const order = [
    "2300",
    "2000",
    "1700",
    "1400",
    "1100",
    "0800",
    "0500",
    "0200",
  ];
  const i = order.indexOf(baseTime);
  if (i === -1) return { baseDate, baseTime };
  if (i < order.length - 1) return { baseDate, baseTime: order[i + 1] };
  const d = new Date(
    +baseDate.slice(0, 4),
    +baseDate.slice(4, 6) - 1,
    +baseDate.slice(6, 8)
  );
  d.setDate(d.getDate() - 1);
  return { baseDate: yyyymmdd_kst(d), baseTime: "2300" };
}
// 초단기실황(getUltraSrtNcst): 매시 30분
function latestUltraNcstBase(now = new Date()) {
  const k = toKST(now);
  let baseDate = yyyymmdd_kst(k);
  let hour = k.getHours();
  const min = k.getMinutes();
  if (min < 45) hour -= 1;
  if (hour < 0) {
    hour = 23;
    const y = new Date(k.getTime() - 86400000);
    baseDate = yyyymmdd_kst(y);
  }
  const baseTime = pad2((hour + 24) % 24) + "30";
  return { baseDate, baseTime };
}
function prevUltraBase(baseDate, baseTime) {
  let h = +baseTime.slice(0, 2) - 1;
  let d = new Date(
    +baseDate.slice(0, 4),
    +baseDate.slice(4, 6) - 1,
    +baseDate.slice(6, 8)
  );
  if (h < 0) {
    h = 23;
    d.setDate(d.getDate() - 1);
  }
  return { baseDate: yyyymmdd_kst(d), baseTime: pad2(h) + "30" };
}

/* ===========================
 * API 호출 (JSON/에러 안전 + 로깅)
 * =========================== */
async function fetchJSON(url) {
  console.log("[KMA] 요청 URL:", url);
  const res = await fetch(url);
  const ct = res.headers.get("content-type") || "";
  console.log("[KMA] content-type:", ct);

  if (ct.includes("application/json")) {
    const json = await res.json();
    console.log("[KMA] JSON 응답:", json);
    const resultCode = json?.response?.header?.resultCode;
    if (resultCode === "03") {
      const e = new Error("NO_DATA");
      e.noData = true;
      throw e;
    }
    const items = json?.response?.body?.items?.item;
    if (!items) throw new Error("KMA JSON 응답에 items가 없습니다.");
    return items;
  }

  const text = await res.text();
  console.log("[KMA] 원시 응답(텍스트 앞부분):", text.slice(0, 500));
  if (text.includes("<OpenAPI_ServiceResponse")) {
    const reasonCode =
      text.match(/<returnReasonCode>(.*?)<\/returnReasonCode>/)?.[1] || "";
    const authMsg =
      text.match(/<returnAuthMsg>(.*?)<\/returnAuthMsg>/)?.[1] || "";
    const msg =
      text.match(/<returnReasonMessage>(.*?)<\/returnReasonMessage>/)?.[1] ||
      "";
    throw new Error(
      `KMA OpenAPI 오류: code=${reasonCode} auth="${authMsg}" msg="${msg}". (키/파라미터 확인)`
    );
  }
  throw new Error(`KMA 응답이 JSON이 아닙니다. content-type="${ct}"`);
}

/* ===========================
 * KMA 엔드포인트 래퍼
 * =========================== */
async function fetchUltraNcst(nx, ny) {
  let { baseDate, baseTime } = latestUltraNcstBase();
  for (let i = 0; i < 3; i++) {
    const url = `${BASE}/getUltraSrtNcst?serviceKey=${KEY}&numOfRows=60&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;
    try {
      return await fetchJSON(url);
    } catch (e) {
      if (e.noData) {
        ({ baseDate, baseTime } = prevUltraBase(baseDate, baseTime));
        continue;
      }
      throw e;
    }
  }
  throw new Error("초단기실황 NO_DATA 지속");
}

async function fetchVilageFcst(nx, ny, override) {
  let base;
  if (override) base = override;
  else base = latestVilageBase();

  for (let i = 0; i < 4; i++) {
    const url = `${BASE}/getVilageFcst?serviceKey=${KEY}&numOfRows=1000&pageNo=1&dataType=JSON&base_date=${base.baseDate}&base_time=${base.baseTime}&nx=${nx}&ny=${ny}`;
    try {
      return await fetchJSON(url);
    } catch (e) {
      if (e.noData) {
        base = prevVilageBase(base.baseDate, base.baseTime);
        continue;
      }
      throw e;
    }
  }
  throw new Error("단기예보 NO_DATA 지속");
}

/* ===========================
 * 해석/가공 공통
 * =========================== */
function interpretWeatherKorean({ SKY, PTY }) {
  const p = Number(PTY);
  if ([3, 7].includes(p)) return "눈";
  if ([2, 6].includes(p)) return "비/눈";
  if ([1, 4, 5].includes(p)) return "비";
  const s = Number(SKY);
  if (s === 4) return "흐림";
  if (s === 3) return "구름많음";
  if (s === 1) return "맑음";
  return "흐림";
}

function groupByDate(items) {
  const map = new Map();
  for (const it of items) {
    const k = it.fcstDate;
    if (!k) continue;
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(it);
  }
  return map;
}

function findNear(items, category, hhmm) {
  const arr = items.filter((it) => it.category === category);
  if (!arr.length) return null;
  arr.sort(
    (a, b) => Math.abs(+a.fcstTime - +hhmm) - Math.abs(+b.fcstTime - +hhmm)
  );
  return arr[0]?.fcstValue ?? null;
}

/**
 * TMX/TMN 기준: TMX/TMN 우선, 없으면 T3H(00~23) min/max
 * 현재 실황(T1H)은 기준이 있을 때만 확장용으로 반영
 */
function baselineTmxTmn(items, currentTemp = null) {
  const tmxRaw = toNumOrNull(
    items.find((it) => it.category === "TMX")?.fcstValue
  );
  const tmnRaw = toNumOrNull(
    items.find((it) => it.category === "TMN")?.fcstValue
  );

  const t3hValues = items
    .filter((it) => it.category === "T3H")
    .filter(
      (it) =>
        typeof it.fcstTime === "string" && /^[0-2][0-9]00$/.test(it.fcstTime)
    )
    .map((it) => toNumOrNull(it.fcstValue))
    .filter((n) => n !== null);

  let maxBase = tmxRaw ?? (t3hValues.length ? Math.max(...t3hValues) : null);
  let minBase = tmnRaw ?? (t3hValues.length ? Math.min(...t3hValues) : null);

  const cur = toNumOrNull(currentTemp);
  if (cur !== null) {
    if (maxBase !== null) maxBase = Math.max(maxBase, cur);
    if (minBase !== null) minBase = Math.min(minBase, cur);
  }

  return {
    tmx: maxBase !== null ? Math.round(maxBase) : null,
    tmn: minBase !== null ? Math.round(minBase) : null,
  };
}

/* ===========================
 * (신규) 시간대 요약: 강수 우선 → SKY 보강
 * 오전: 00:00~11:59, 오후: 12:00~23:59
 * 눈(3,7) > 비/눈(2,6) > 비(1,4,5) > SKY(4>3>1)
 * =========================== */
function summarizeSkyPeriod(items, startHour, endHour) {
  const inRange = (t) => {
    const hh = Number(String(t).slice(0, 2));
    return hh >= startHour && hh < endHour;
  };

  const ptys = items
    .filter((it) => it.category === "PTY" && inRange(it.fcstTime))
    .map((it) => Number(it.fcstValue));

  if (ptys.some((p) => [3, 7].includes(p))) return "눈";
  if (ptys.some((p) => [2, 6].includes(p))) return "비/눈";
  if (ptys.some((p) => [1, 4, 5].includes(p))) return "비";

  const skys = items
    .filter((it) => it.category === "SKY" && inRange(it.fcstTime))
    .map((it) => Number(it.fcstValue));

  if (skys.length) {
    if (skys.some((s) => s === 4)) return "흐림";
    if (skys.some((s) => s === 3)) return "구름많음";
    if (skys.some((s) => s === 1)) return "맑음";
  }
  return "흐림";
}

/* ===========================
 * (신규) 오늘 보강 유틸
 * =========================== */
function itemsOfDate(items, yyyymmdd) {
  return items.filter((it) => it.fcstDate === yyyymmdd);
}
function mergeDailyItems(...arrs) {
  const key = (it) => `${it.category}_${it.fcstDate}_${it.fcstTime}`;
  const map = new Map();
  for (const arr of arrs) {
    for (const it of arr) {
      const k = key(it);
      if (!map.has(k)) map.set(k, it);
    }
  }
  return Array.from(map.values());
}

// 오늘 TMX/TMN 보강: 전날 23시 + 오늘 02·05·08시까지 순차 시도(병합)
async function patchTodayMinMaxFromYesterday(nx, ny, todayYmd) {
  const bases = [
    { baseDate: yyyymmdd_yesterday_kst(), baseTime: "2300" },
    { baseDate: yyyymmdd_kst(), baseTime: "0200" },
    { baseDate: yyyymmdd_kst(), baseTime: "0500" },
    { baseDate: yyyymmdd_kst(), baseTime: "0800" },
  ];

  const got = [];
  for (const b of bases) {
    try {
      const items = await fetchVilageFcst(nx, ny, b);
      got.push(itemsOfDate(items, todayYmd));
    } catch (e) {
      console.warn("[KMA] 보강용 fetch 실패:", b, e?.message);
    }
  }

  const merged = mergeDailyItems(...got);
  if (!merged.length) return { tmx: null, tmn: null };

  const { tmx, tmn } = baselineTmxTmn(merged, null);
  return { tmx, tmn };
}

/* ===========================
 * 최종: HomeWeather가 바로 쓰는 함수
 * =========================== */
export async function getSeosanWeatherFromKMA() {
  const { nx, ny } = toXY(DEFAULT_LAT, DEFAULT_LON);

  // 1) 현재(초단기실황)
  const ultra = await fetchUltraNcst(nx, ny);
  const T1H = ultra.find((it) => it.category === "T1H")?.obsrValue ?? null;
  const PTY_NCST = ultra.find((it) => it.category === "PTY")?.obsrValue ?? 0;

  // 2) 단기예보(기본: 최신 발표본)
  const baseVilage = await fetchVilageFcst(nx, ny);
  const byDate = groupByDate(baseVilage);
  const dates = Array.from(byDate.keys()).sort();
  if (!dates.length) throw new Error("단기예보 데이터 없음");

  const todayYmd = yyyymmdd_kst();
  const today = dates.includes(todayYmd)
    ? todayYmd
    : dates.find((d) => d > todayYmd) ?? dates[0];

  // 3) 주간 예보(오늘 포함 이후)
  let weeklyForecast = dates
    .filter((d) => d >= today)
    .map((date) => {
      const items = byDate.get(date) ?? [];
      const { tmx, tmn } = baselineTmxTmn(items, date === today ? T1H : null);

      let skyAm, skyPm;
      if (date === today) {
        // 오늘은 대표시각 근처(09/15시) 유지
        skyAm = interpretWeatherKorean({
          SKY: findNear(items, "SKY", "0900"),
          PTY: findNear(items, "PTY", "0900"),
        });
        skyPm = interpretWeatherKorean({
          SKY: findNear(items, "SKY", "1500"),
          PTY: findNear(items, "PTY", "1500"),
        });
      } else {
        // 내일 이후: 시간대 전체 훑어서 강수 우선
        skyAm = summarizeSkyPeriod(items, 0, 12); // 00:00~11:59
        skyPm = summarizeSkyPeriod(items, 12, 24); // 12:00~23:59
      }

      return {
        date,
        tempMax: tmx ?? "-",
        tempMin: tmn ?? "-",
        skyAm,
        skyPm,
      };
    });

  // 4) 오늘 TMX/TMN 보강 적용
  const todayIdx = weeklyForecast.findIndex((d) => d.date === today);
  if (todayIdx >= 0) {
    const w = weeklyForecast[todayIdx];
    const needPatch =
      w.tempMax === "-" ||
      w.tempMax == null ||
      w.tempMin === "-" ||
      w.tempMin == null;

    if (needPatch) {
      try {
        const patched = await patchTodayMinMaxFromYesterday(nx, ny, today);
        if (patched.tmx != null) w.tempMax = patched.tmx;
        if (patched.tmn != null) w.tempMin = patched.tmn;
      } catch (e) {
        console.warn("[KMA] 오늘 보강 실패:", e);
      }
    }
    // 최후 안전망: 그래도 없으면 T1H로 임시 채움(화면 공백 방지)
    if (w.tempMax === "-" || w.tempMax == null) w.tempMax = T1H ?? "-";
    if (w.tempMin === "-" || w.tempMin == null) w.tempMin = T1H ?? "-";
  }

  // --- 디버그 요약 ---
  console.group("[KMA][서산] 요약");
  console.log("격자:", { nx, ny });
  console.log("현재:", {
    temp: T1H ?? "-",
    sky: interpretWeatherKorean({
      SKY: findNear(byDate.get(today) ?? [], "SKY", "1200") ?? 1,
      PTY: PTY_NCST ?? 0,
    }),
  });
  console.log(
    "주간:",
    weeklyForecast.map((d) => ({
      date: d.date,
      max: d.tempMax,
      min: d.tempMin,
      am: d.skyAm,
      pm: d.skyPm,
    }))
  );
  console.groupEnd();

  // 5) HomeWeather 포맷 반환 (PTY_NCST 사용하여 ESLint 경고 제거)
  return {
    currentTemperature: T1H ?? "-",
    currentSky: interpretWeatherKorean({
      SKY: findNear(byDate.get(today) ?? [], "SKY", "1200") ?? 1,
      PTY: PTY_NCST ?? 0,
    }),
    precipitation: (Number(PTY_NCST) ?? 0) === 0 ? "없음" : "강수",
    weeklyForecast,
  };
}
