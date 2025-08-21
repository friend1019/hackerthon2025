import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../CSS/HOME/9kyung.css";
import Header from "../COMMON/Header";
import { ReactComponent as StarSvg } from "../../IMAGE/kyung-star.svg";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

import a1 from "../../IMAGE/a1.svg";
import a2 from "../../IMAGE/a2.svg";
import a3 from "../../IMAGE/a3.svg";
import a4 from "../../IMAGE/a4.svg";
import a5 from "../../IMAGE/a5.svg";
import a6 from "../../IMAGE/a6.svg";
import a7 from "../../IMAGE/a7.svg";
import a8 from "../../IMAGE/a8.svg";
import a9 from "../../IMAGE/a9.svg";

const kyungList = [
  {
    id: 1,
    number: 1,
    title: "해미읍성",
    subtitle: "Haemieupseong Fortress",
    desc: "조선 초 병영성으로 만들어졌으며 원형이 가장 완전하게 보존된 평성, 이순신 장군이 군관으로 근무했던 곳이며 조선 후기 순교성지로 2014년 프란치스코 교황이 방문했다.",
    img: a1,
  },
  {
    id: 20,
    number: 2,
    title: "서산 용현리 마애여래삼존상",
    subtitle: "Rock-carved Buddha of Yonghyeon-ri",
    desc: "백제의 미소로 불리는 석불의 온화한 미소는 빛의 방향, 바라보는 각도에 따라 다르게 보인다. 백제 후기 화강암에 조각된 불상으로 역사적, 미학적 가치가 크다.",
    img: a2,
  },
  {
    id: 49,
    number: 3,
    title: "간월암",
    subtitle: "Ganworam Hermitage",
    desc: "저녁 노을빛이 바다까지 붉게 물들이는 아름다운 낙조가 유명한 곳으로 바닷물이 밀려들어오면 섬이 되고, 빠져 나가면 다시 뭍이 되는 신비로운 암자이다.",
    img: a3,
  },
  {
    id: 40,
    number: 4,
    title: "개심사",
    subtitle: "Gaesimsa Temple",
    desc: "가야산이 동쪽 장벽을 이루고 산 속 중턱 계류가 시작되는 협곡에 자리하여 사계절 내내 수려한 경관을 자랑한다. 왕벚꽃, 청벚꽃이 만개하는 봄철 수많은 사람들이 찾는 명소이다.",
    img: a4,
  },
  {
    id: 34,
    number: 5,
    title: "팔봉산",
    subtitle: "Palbongsan Mountain",
    desc: "8개의 봉우리가 서해안 갯벌과 바다를 굽어보는 아기자기한 산으로, 산세가 낮고 풍경이 아름다워 봉우리를 타고 넘는 재미가 쏠쏠하다.",
    img: a5,
  },
  {
    id: 43,
    number: 6,
    title: "가야산",
    subtitle: "Gayasan Mountain",
    desc: "보원사지, 개심사 등 많은 문화재와 보물을 품고 있는 명산으로 내포문화숲길과 아라메길을 통해 유서 깊은 문화유적과 수려한 자연경관을 감상할 수 있다.",
    img: a6,
  },
  {
    id: 30,
    number: 7,
    title: "황금산",
    subtitle: "Hwanggeumsan Mountain",
    desc: "해송과 야생화가 어우러진 숲길과 몽돌로 이루어진 해안이 절경을 이루는 곳으로 해발 156m의 낮은 산이지만 산을 넘으면 코끼리바위가 있는 아름다운 해안절벽을 감상할 수 있다.",
    img: a7,
  },
  {
    id: 55,
    number: 8,
    title: "서산한우목장",
    subtitle: "Seosan Hanwoo Ranch",
    desc: "드넓은 초지에서 한가로이 풀을 뜯는 한우떼가 이국적 풍경을 연출하는 곳으로 양쪽 넓은 초원을 보며 자연이 주는 아름다운 풍경을 만끽할 수 있다.",
    img: a8,
  },
  {
    id: 25,
    number: 9,
    title: "삼길포항",
    subtitle: "Samgilpo Port",
    desc: "풍부한 해산물과 화려한 야경을 함께 만날 수 있는 곳으로 선상횟집과 수산물직매장, 횟집 등에서 맛있는 해산물을 부담없이 즐길 수 있다.",
    img: a9,
  },
];

const KyungCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="kyung-card-redesign">
      <div className="kyung-card-left">
        <div className="kyung-card-badge">{item.number}경</div>
        <div className="kyung-card-title-row">
          <StarSvg className="kyung-card-star" />
          <span className="kyung-card-title">{item.title}</span>
          <span className="kyung-card-title-en">{item.subtitle}</span>
        </div>
        <div className="kyung-card-desc">{item.desc}</div>
        <button
          className="kyung-card-link"
          onClick={() => navigate(`/place/${item.id}`)}
        >
          상세정보{" "}
          <MdKeyboardArrowRight
            style={{
              fontSize: "1.3rem",
              verticalAlign: "middle",
              marginLeft: "-0.3rem",
              marginBottom: "0.1rem",
            }}
          />
        </button>
      </div>
      <div className="kyung-card-right">
        <img src={item.img} alt={item.title} className="kyung-card-img" />
      </div>
    </div>
  );
};

const KyungList = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="kyung-list-all"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <div className="kyung-top-section">
          <h1 className="kyung-list-title">서산9경</h1>
          <div className="kyung-list-desc">
            자연과 역사가 빚어낸 서산 9경을 통해 아름다움과 감동을 한껏
            느껴보세요.
          </div>
          <div className="kyung-pill-list">
            {kyungList.map((item) => (
              <span className="kyung-pill" key={item.id}>
                {item.title}
              </span>
            ))}
          </div>
        </div>
        <hr className="kyung-section-divider" />
        <div className="kyung-list-wrap">
          {kyungList.map((item) => (
            <KyungCard key={item.id} item={item} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default KyungList;
