// src/COMPONENTS/HOME/9mi.jsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

/* 공통 컴포넌트 & 스타일 */
import Header from "../COMMON/Header";
import "../../CSS/HOME/9kyung.css";

/* 에셋 */
import { ReactComponent as StarSvg } from "../../IMAGE/icons/kyung-star.svg";
import b1 from "../../IMAGE/place/b1.svg";
import b2 from "../../IMAGE/place/b2.svg";
import b3 from "../../IMAGE/place/b3.svg";
import b4 from "../../IMAGE/place/b4.svg";
import b5 from "../../IMAGE/place/b5.svg";
import b6 from "../../IMAGE/place/b6.svg";
import b7 from "../../IMAGE/place/b7.svg";
import b8 from "../../IMAGE/place/b8.svg";
import b9 from "../../IMAGE/place/b9.svg";

/* === 서산 9미 목록(정적 데이터) === */
const miList = [
  {
    id: 1,
    number: 1,
    title: "꽃게장",
    subtitle: "Soy Sauce Marinated Crab",
    desc: "서해안에서 잡은 신선한 꽃게를 간장에 절여 숙성시킨 서산 대표 음식입니다.\n짭조름한 간장 맛과 게살의 감칠맛이 조화를 이루며, 밥과 함께 먹으면 그야말로 '밥도둑'이라 불릴 만큼 인기가 높습니다.",
    img: b1,
  },
  {
    id: 21,
    number: 2,
    title: "서산 어리굴젓",
    subtitle: "Fermented Oyster Jeotgal",
    desc: "갓 채취한 굴에 고춧가루, 마늘, 생강 등을 넣어 숙성시킨 발효 젓갈로,\n깔끔하고 깊은 풍미가 특징입니다. 서산의 해산물 발효식품을 대표하는 밑반찬이자 선물용으로도 사랑받습니다.",
    img: b2,
  },
  {
    id: 56,
    number: 3,
    title: "게국지",
    subtitle: "Crab Kimchi Stew",
    desc: "김치와 꽃게, 젓갈, 된장을 넣고 끓인 얼큰한 찌개로, 서산 갯마을의 전통 음식입니다.\n시원하고 칼칼한 국물 맛이 특징이며, 계절에 따라 별미로 즐기기 좋습니다.",
    img: b3,
  },
  {
    id: 44,
    number: 4,
    title: "밀국낙지탕",
    subtitle: "Wheat Noodle Octopus Soup",
    desc: "서산에서 재배한 밀가루로 만든 칼국수(밀국수)에 낙지를 넣고 얼큰하게 끓인 탕입니다.\n쫄깃한 낙지와 깊은 국물 맛으로 미식가들의 입맛을 사로잡는 보양식입니다.",
    img: b4,
  },
  {
    id: 37,
    number: 5,
    title: "서산 우리한우",
    subtitle: "Seosan Korean Beef",
    desc: "청정 자연에서 사육된 서산 한우는 육질이 부드럽고 풍미가 진해 고급 한우로 손꼽힙니다.\n불고기, 구이, 국거리 등 다양한 방식으로 즐길 수 있습니다.",
    img: b5,
  },
  {
    id: 49,
    number: 6,
    title: "우럭젓국",
    subtitle: "Rockfish Jeotgal Soup",
    desc: "서해안에서 잡은 우럭과 젓갈을 넣고 끓인 국물 요리입니다.\n서산 특유의 감칠맛을 담은 얼큰한 국물 음식으로, 해장용으로도 인기가 많습니다.",
    img: b6,
  },
  {
    id: 32,
    number: 7,
    title: "생강한과",
    subtitle: "Ginger Traditional Confectionery",
    desc: "서산 특산물인 생강을 활용한 전통 한과입니다.\n은은한 생강향과 바삭한 식감이 조화를 이루며, 건강한 간식 또는 선물용으로 적합합니다.",
    img: b7,
  },
  {
    id: 64,
    number: 8,
    title: "마늘각시",
    subtitle: "Garlic Snack",
    desc: "서산 육쪽마늘을 활용해 만든 창의적인 마늘 가공식품입니다.\n마늘의 향과 영양을 살린 이색 간식으로, 서산 마늘의 우수성을 알리는 특산 제품입니다.",
    img: b8,
  },
  {
    id: 27,
    number: 9,
    title: "영양굴밥",
    subtitle: "Nutritious Oyster Rice",
    desc: "제철 굴과 다양한 채소, 해산물 육수를 넣어 지은 건강 밥상입니다.\n굴의 고소한 맛과 영양이 어우러져 남녀노소 누구나 즐길 수 있는 영양식입니다.",
    img: b9,
  },
];

/* === 개별 카드 === */
const MiCard = ({ item }) => {
  // 상세 페이지 라우팅을 추가한다면 useNavigate 사용
  // const navigate = useNavigate();

  return (
    <div className="kyung-card-redesign">
      {/* 좌측: 배지/타이틀/설명 */}
      <div className="kyung-card-left">
        <div className="kyung-card-badge">{item.number}미</div>

        <div className="kyung-card-title-row">
          <StarSvg className="kyung-card-star" />
          <span className="kyung-card-title">{item.title}</span>
          <span className="kyung-card-title-en">{item.subtitle}</span>
        </div>

        <div className="kyung-card-desc">{item.desc}</div>

        {/* 상세 페이지가 준비되면 아래 버튼을 활성화하세요.
        <button
          className="kyung-card-link"
          onClick={() => navigate(`/place/${item.id}`)}
        >
          상세정보 <MdKeyboardArrowRight style={{ fontSize: "1.3rem", verticalAlign: "middle", marginLeft: "-0.3rem", marginBottom: "0.1rem" }} />
        </button>
        */}
      </div>

      {/* 우측: 썸네일 이미지 */}
      <div className="kyung-card-right">
        <img src={item.img} alt={item.title} className="kyung-card-img" />
      </div>
    </div>
  );
};

/* === 목록 페이지 === */
const MiList = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="kyung-list-all"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 상단 헤더 */}
        <Header />

        {/* 상단 섹션: 타이틀/설명/필 리스트 */}
        <div className="kyung-top-section">
          <h1 className="kyung-list-title">서산9미</h1>
          <div className="kyung-list-desc">
            자연의 맛과 정성이 담긴 서산 9미를 통해 서산의 풍미와 멋을 함께
            느껴보세요.
          </div>

          <div className="kyung-pill-list">
            {miList.map((item) => (
              <span className="kyung-pill" key={item.id}>
                {item.title}
              </span>
            ))}
          </div>
        </div>

        <hr className="kyung-section-divider" />

        {/* 카드 리스트 */}
        <div className="kyung-list-wrap">
          {miList.map((item) => (
            <MiCard key={item.id} item={item} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MiList;
