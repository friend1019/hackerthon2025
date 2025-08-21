import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../COMMON/Header";
import "../../CSS/HOME/Aramegil.css";
import arame1 from "../../IMAGE/arame-1.svg";
import arame2 from "../../IMAGE/arame-2.svg";
import arame3 from "../../IMAGE/arame-3.svg";
import arame4 from "../../IMAGE/arame-4.svg";
import arame5 from "../../IMAGE/arame-5.svg";
import arame6 from "../../IMAGE/arame-6.svg";
import arame7 from "../../IMAGE/arame-7.svg";
import arame8 from "../../IMAGE/arame-8.svg";
import arame9 from "../../IMAGE/arame-9.svg";
import arame10 from "../../IMAGE/arame-10.svg";
import arame11 from "../../IMAGE/arame-11.svg";
import arame12 from "../../IMAGE/arame-12.svg";
import starMain from "../../IMAGE/kyung-star.svg";
import starFill from "../../IMAGE/icon-star-2.svg";
import starEmpty from "../../IMAGE/icon-star-3.svg";

// trails 데이터 (trails.js에서 복사)
const trails = [
  {
    id: "aramestreet-1",
    title: "천년미소길",
    distanceKm: 21,
    durationH: 8,
    difficulty: 3, // 1~5
    desc:
      "전통가옥과 불교문화, 그리고 자연의 숨결을 따라 걷는 길.\n" +
      "웅장계곡의 청량한 바람과 천수만의 탁 트인 풍경, 해미읍성의 전통문화 체험까지.\n" +
      "서산에서만 만날 수 있는 특별한 여정을 즐겨보세요.",
    photos: [
      { src: arame1, label: "유기방가옥" },
      { src: arame2, label: "서산 용현리 마애여래삼존상" },
    ],
  },
  {
    id: "aramestreet-2",
    title: "천년미소길 순환노선",
    distanceKm: 7.8,
    durationH: 3,
    difficulty: 3,
    desc:
      "백제의 미소, 서산 용현리 마애여래삼존상과 보연사지, 개심사 등 고즈넉한 불교 문화 유적을 따라 걷는 길. \n" +
      "전망대에 오르면 가야산과 서산한우목장의 광활한 초지가 한눈에 펼쳐지고, 용현계곡에서는 계절마다 숲과 단풍이 선사하는 절경을 만날 수 있습니다.",
    photos: [
      { src: arame3, label: "보원사지" },
      { src: arame4, label: "개심사" },
    ],
  },
  {
    id: "aramestreet-3",
    title: "해미국제성지순례길",
    distanceKm: 10.1,
    durationH: 3,
    difficulty: 3,
    desc: "해미국제성지에서 시작되는 도보 순례길은 서산해미읍성과 한티고개를 지나며 순교자들의 숭고한 정신을 되새기게 합니다. 고요한 길을 걸으며 참회와 기도의 시간을 갖기에 좋은 서산의 특별한 코스입니다.",
    photos: [
      { src: arame5, label: "해미국제성지" },
      { src: arame6, label: "산수저수지" },
    ],
  },
  {
    id: "aramestreet-4",
    title: "삼길나루길",
    distanceKm: 3,
    durationH: 1.5,
    difficulty: 2,
    desc: "삼길산 봉화대에서는 드넓은 바다와 대호방조제가 시원하게 펼쳐지고, 봄에는 벚꽃길이 장관을 이룹니다. 인근에서는 삼길포 우럭 축제를 비롯해 다양한 먹거리와 볼거리를 즐길 수 있습니다.",
    photos: [
      { src: arame7, label: "삼길포항" },
      { src: arame8, label: "삼길산 봉화대" },
    ],
    subCourses: [
      {
        title: "등산로",
        distanceKm: 3,
        durationH: 1.5,
        difficulty: 2,
        desc:
          "삼길산 봉화대에서는 드넓은 바다와 대호방조제가 시원하게 펼쳐지고, 봄에는 벚꽃길이 장관을 이룹니다.\n" +
          "인근에서는 삼길포 우럭 축제를 비롯해 다양한 먹거리와 볼거리를 즐길 수 있습니다.",
      },
      {
        title: "벚꽃길",
        distanceKm: 4.2,
        durationH: 1.5,
        difficulty: 1,
        desc:
          "삼길산 봉화대에서는 드넓은 바다와 대호방조제가 시원하게 펼쳐지고, 봄에는 벚꽃길이 장관을 이룹니다.\n" +
          "인근에서는 다양한 먹거리와 볼거리를 즐기고, 삼길포 우럭 축제에서 신선한 바다의 맛을 만끽할 수 있습니다.",
      },
    ],
  },
  {
    id: "aramestreet-5",
    title: "도비마루길",
    distanceKm: 6.2,
    durationH: 3,
    difficulty: 5,
    desc: "도비마루길은 부석사와 해돋이•해넘이 전망대를 잇는 도보 코스로, 정상에서 서해 바다와 광활한 간척지가 한눈에 펼쳐집니다. 가을이면 황금빛 들판이 장관을 이루어 사계절 각기 다른 매력을 선사합니다.",
    photos: [
      { src: arame9, label: "해넘이전망대" },
      { src: arame10, label: "부석사" },
    ],
  },
  {
    id: "aramestreet-6",
    title: "구도범머리길",
    distanceKm: 24,
    durationH: 8.5,
    difficulty: 5,
    photos: [
      { src: arame11, label: "팔봉산" },
      { src: arame12, label: "주벅배전망대" },
    ],
    subCourses: [
      {
        title: "A코스",
        distanceKm: 24,
        durationH: 8.5,
        difficulty: 5,
        desc: "팔봉산 주차장에서 시작되는 이 길은 가로림만의 빼어난 풍광과 구도포구의 아름다운 갯벌, 그리고 민물과 바닷물이 만나 형성된 옻샘을 만날 수 있는 특별한 코스입니다. 인근에서는 팔봉산 감자축제와 갯벌 체험도 즐길 수 있습니다.",
      },
      {
        title: "B코스",
        distanceKm: 14.5,
        durationH: 4,
        difficulty: 2,
        desc: "구도포구에서는 눈부신 갯벌의 아름다움과 민물과 바닷물이 만나 형성된 신비로운 옻샘을 감상할 수 있습니다. 또한 팔봉산 감자축제와 팔봉 갯벌 체험장에서 갯벌체험 등 다채로운 즐길 거리를 만끽할 수 있습니다.",
      },
    ],
  },
];
export default function Aramegil() {
  // PlacePane1 컴포넌트
  const PlacePane1 = () => (
    <section className="aramegil-place-pane">
      <h2 className="aramegil-place-title">서산아라메길</h2>
      <p className="aramegil-place-description">
        서산 아라메길은 ‘아라(바다)’와 ‘메(산)’가 만나는 친환경 트레킹
        코스입니다. <br />
        시작과 끝이 없는 자연 그대로의 길에서, 가족·친구와 함께 나만의 추억을
        만들어보세요.
      </p>
      <div className="aramegil-tag-list">
        {[
          "천년미소길",
          "천년미소길 순환노선",
          "해미국제성지순례길",
          "삼길나루길",
          "도비마루길",
          "구도범머리길",
        ].map((label) => (
          <span key={label} className="aramegil-tag-item">
            {label}
          </span>
        ))}
      </div>
      <hr className="aramegil-divider" />
    </section>
  );

  // TrailCard 컴포넌트
  const TrailCard = ({
    title,
    distanceKm,
    durationH,
    difficulty,
    desc,
    photos = [],
    subCourses = [],
  }) => (
    <article className="aramegil-trail-card">
      <div className="aramegil-trail-card-header">
        <div className="aramegil-trail-card-title">
          <img
            src={starMain}
            alt="대표 아이콘"
            className="aramegil-star-icon"
          />
          <h3 className="aramegil-trail-card-title-text">{title}</h3>
          <span className="aramegil-trail-card-distance">{distanceKm}km</span>
          <span className="aramegil-trail-card-duration">| {durationH}h</span>
        </div>
        {/* subCourses가 없을 때만 난이도 별 표시 (오른쪽 정렬) */}
        {(!subCourses || subCourses.length === 0) && (
          <span className="aramegil-trail-card-difficulty aramegil-align-right">
            <span className="aramegil-difficulty-text">난이도</span>
            <span className="aramegil-difficulty-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={i}
                  src={i < difficulty ? starFill : starEmpty}
                  alt="난이도 별"
                  className="aramegil-difficulty-star-icon"
                />
              ))}
            </span>
          </span>
        )}
      </div>
      <p className="aramegil-trail-card-description">{desc}</p>
      {subCourses.length > 0 && (
        <div className="aramegil-subcourses-list">
          {subCourses.map((sub, idx) => (
            <div key={idx} className="aramegil-subcourse-block">
              <div className="aramegil-subcourse-title-row">
                <span className="aramegil-subcourse-title">{sub.title}</span>
                <span className="aramegil-subcourse-meta">
                  {sub.distanceKm}km&nbsp;&nbsp;|&nbsp;&nbsp;{sub.durationH}h
                </span>
                <span className="aramegil-difficulty-stars-inline aramegil-align-right">
                  <span className="aramegil-difficulty-text-inline">
                    난이도
                  </span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <img
                      key={i}
                      src={i < (sub.difficulty ?? 0) ? starFill : starEmpty}
                      alt="난이도 별"
                      className="aramegil-difficulty-star-icon"
                    />
                  ))}
                </span>
              </div>
              <p className="aramegil-subcourse-description">{sub.desc}</p>
            </div>
          ))}
        </div>
      )}
      {/* 사진 가로 스크롤 */}
      <div className="aramegil-photo-scroll">
        {photos.map((p, idx) => (
          <figure key={p.src + idx} className="aramegil-photo-figure">
            <img
              src={p.src}
              alt={p.label ?? title}
              className="aramegil-photo-img"
            />
            {p.label && (
              <figcaption className="aramegil-photo-caption">
                {p.label}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
      <div className="aramegil-divider-line" />
    </article>
  );

  // TrailsSection 컴포넌트
  const TrailsSection = () => (
    <section className="aramegil-trails-section">
      {trails.map((t) => (
        <TrailCard key={t.id} {...t} />
      ))}
    </section>
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="aramegil-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <div className="aramegil-main">
          <PlacePane1 />
          <TrailsSection />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
