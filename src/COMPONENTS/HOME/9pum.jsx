import React from "react";
// import { MdKeyboardArrowRight } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import "../../CSS/HOME/9kyung.css";
import Header from "../COMMON/Header";
// import { useNavigate } from "react-router-dom";
import { ReactComponent as StarSvg } from "../../IMAGE/kyung-star.svg";

const img1 =
  "https://www.seosan.go.kr/site/tour/images/contents/cts959_img.jpg";
const img2 =
  "https://www.seosan.go.kr/site/tour/images/contents/cts959_img2.jpg";
const img3 =
  "https://www.seosan.go.kr/site/tour/images/contents/cts959_img3.jpg";
const img4 =
  "https://www.seosan.go.kr/site/tour/images/contents/cts959_img4.jpg";
const img5 =
  "https://www.seosan.go.kr/site/tour/images/contents/cts959_img5.jpg";
const img6 =
  "https://www.seosan.go.kr/site/tour/images/contents/cts959_img6.jpg";
const img7 =
  "https://www.seosan.go.kr/site/tour/images/contents/cts959_img7.jpg";
const img8 =
  "https://www.seosan.go.kr/site/tour/images/contents/cts959_img8.jpg";
const img9 =
  "https://www.seosan.go.kr/site/tour/images/contents/cts959_img9.jpg";

const pumList = [
  {
    id: 1,
    number: 1,
    title: "6쪽마늘",
    subtitle: "Yukjok Garlic",
    desc: "삼국시대부터 재배해온 재래종 한지형 마늘로 저장성이 우수하고 씨알이 굵으며 배병성이 강하여 약용 및 조미료로 사용되는 높은 인지도를 자랑하는 서산의 대표 농특산물",
    img: img1,
  },
  {
    id: 21,
    number: 2,
    title: "생강",
    subtitle: "Ginger",
    desc: "전국의 총 생산량 33%를 차지, 전국의 최대 생강 주생산 단지로 발이 굵고 육질이 연함. 재배 농민 6천여 명, 다양한 가공품으로도 인기가 많음\n해독 및 소염, 풍증 제거, 치통의 악취제거 강장, 감기예방, 이뇨제, 폐렴, 화농성 질환, 항균작용, 중금속 중독의 해독작용과 동맥경화 예방 등의 의약품으로 광범위하게 이용되고 있으며, 특히 항암작용 식품으로 타 식품 함유량보다 월등한 효능이 있음.",
    img: img2,
  },
  {
    id: 56,
    number: 3,
    title: "뜸부기쌀",
    subtitle: "Tteumbugi Rice",
    desc: "필수아미노산 라이신이 일반 벼 품종보다 11%높게 함유되어 있는 영양만점의 쌀은 천수만에서 공급한 농업용수와 일조량이 풍부하여 간척농지가 많은 천혜의 벼 재배지로 명품 쌀로 인정받음.",
    img: img3,
  },
  {
    id: 44,
    number: 4,
    title: "서산갯벌낙지",
    subtitle: "Seosan Mudflat Octopus",
    desc: "가로림만 청정 해역의 깨끗한 갯벌에서 나는 갯벌 낙지는 서산시 지곡면 중왕리와 도성리 등지에서 많이 생산되고 있음.\n가로림만과 접해 있는 서산시 지곡면 중왕리 왕산포구 낙지는 목포 낙지에 견줄만큼 전국적으로 유명하고 프랜치스코 교황의 식탁에 올라 호평을 받으면서 더욱 유명세를 타고 있음.",
    img: img4,
  },
  {
    id: 37,
    number: 5,
    title: "서산 6년 근 인삼",
    subtitle: "6-year-old Ginseng",
    desc: "재배적지에 따른 선택성이 강한 인삼은 재배지에 따라 형태와 품질 및 약효에 현저한 차이가 있음.\n고북면 음암면 부석면에서 인삼재배가 이루어지고 있으며 전국 6년 근 인삼 생산량의 15%를 차지하며 인삼이 자라기에 적합한 황토토질에서 서해의 바닷바람을 맞고 자라 단단하고 향이 강하고 품질이 우수함.",
    img: img5,
  },
  {
    id: 49,
    number: 6,
    title: "달래",
    subtitle: "Wild Chive",
    desc: "전국 생산량의 70%를 차지하고 있으며 재배 농가는 380여 가구에 이름. 땅과 기후가 달래 재배에 적합하며 최신재배시설에서 친환경농업으로 재배되고 있음. 서산은 마늘, 파, 쪽파, 백합 등 백합과 식물 재배가 많음. 땅과 기후가 백합과 식물. 재배에 적합하기 때문이며 단군신화에서, 곰이 사람이 되기 위해 동굴에서 삼칠일 동안 먹은 음식은 쑥과 마늘인 것으로 흔히 알고 있는데 [삼국유사]에 적혀 있는, 마늘로 번역된 한자는 蒜(산)으로 蒜은 달래, 파, 마늘, 부추 등을 다 이름",
    img: img6,
  },
  {
    id: 32,
    number: 7,
    title: "황토알타리 무",
    subtitle: "Hwangto Altari Radish",
    desc: "서산의 우수한 황토에서 자란 알타리 무는 육질과 맛이 뛰어나 김치 가공공장에서 주문이 쇄도하는 최고의 상품으로 인정받고 있음.\n고북 지역의 경우 127개 농가에서 1년에 4차례 재배해 농가소득을 올리고 있음",
    img: img7,
  },
  {
    id: 64,
    number: 8,
    title: "팔봉산 감자",
    subtitle: "Palbongsan Potato",
    desc: "감자 최초로 도래, 감자의 전래설에는 여러 가지 중에 순조32년(1832년에 영국의 선박이 서산지방으로 표류하였을 때 감자가 전파되었을 것으로 보는 견해가 있음",
    img: img8,
  },
  {
    id: 27,
    number: 9,
    title: "감태",
    subtitle: "Gamtai Seaweed",
    desc: "달 감, 이끼 태를 써서 감태 이고 실처럼 가느다란 해초류로 파래의 한 종류임\n보관상 이유로 김처럼 말려서 먹기 시작함 성장조건이 까다로워 양식이 불가능하며 12월에서 3월 추운 겨울 태안과 서산 일부 지역에서만 채취가 가능함 노화방지와 당뇨, 동맥경화, 지방간에 좋으며 천연의 갯벌에 알맞은 햇볕 천혜의 무공해 지역 서산에서 나는 귀한 먹거리임. 감태는 서해안에서도 일부지역에서만 소량 생산되고 있으며 주로 서산에서 생산되고 있음. 최근 수요량이 급증함에 따라 재래시장의 효자상품이 됨",
    img: img9,
  },
];

const PumCard = ({ item }) => {
  // const navigate = useNavigate();
  return (
    <div className="kyung-card-redesign">
      <div className="kyung-card-left">
        <div className="kyung-card-badge">{item.number}품</div>
        <div className="kyung-card-title-row">
          <StarSvg className="kyung-card-star" />
          <span className="kyung-card-title">{item.title}</span>
          <span className="kyung-card-title-en">{item.subtitle}</span>
        </div>
        <div className="kyung-card-desc">{item.desc}</div>
        {/* <button
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
        </button> */}
      </div>
      <div className="kyung-card-right">
        <img src={item.img} alt={item.title} className="kyung-card-img" />
      </div>
    </div>
  );
};

const PumList = () => {
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
          <h1 className="kyung-list-title">서산9품</h1>
          <div className="kyung-list-desc">
            자연의 맛과 정성을 담은 서산 9품을 통해 신선함과 풍미를 한껏
            느껴보세요.
          </div>
          <div className="kyung-pill-list">
            {pumList.map((item) => (
              <span className="kyung-pill" key={item.id}>
                {item.title}
              </span>
            ))}
          </div>
        </div>
        <hr className="kyung-section-divider" />
        <div className="kyung-list-wrap">
          {pumList.map((item) => (
            <PumCard key={item.id} item={item} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PumList;
