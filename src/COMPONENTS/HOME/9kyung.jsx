import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ReactComponent as StarSvg } from "../../IMAGE/9경별.svg";
import "../../CSS/HOME/9kyung.css";
import Header from "../COMMON/Header";

const img1 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR80WMSFs7Q_U73M8QwEIMz0I0MEl8ivxBGg&s";
const img2 =
  "http://www.chungnam.go.kr/export/media/article_image/20200506/IM0001578900.jpg";
const img3 =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%EC%A0%9C3%EA%B2%BD_%EA%B0%84%EC%9B%94%EC%95%94.jpg/330px-%EC%A0%9C3%EA%B2%BD_%EA%B0%84%EC%9B%94%EC%95%94.jpg";
const img4 =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/%EC%A0%9C4%EA%B2%BD_%EA%B0%9C%EC%8B%AC%EC%82%AC.jpg/330px-%EC%A0%9C4%EA%B2%BD_%EA%B0%9C%EC%8B%AC%EC%82%AC.jpg";
const img5 =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/%EC%A0%9C5%EA%B2%BD_%ED%8C%94%EB%B4%89%EC%82%B0.jpg/330px-%EC%A0%9C5%EA%B2%BD_%ED%8C%94%EB%B4%89%EC%82%B0.jpg";
const img6 =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/%EC%A0%9C6%EA%B2%BD_%EA%B0%80%EC%95%BC%EC%82%B0.jpg/330px-%EC%A0%9C6%EA%B2%BD_%EA%B0%80%EC%95%BC%EC%82%B0.jpg";
const img7 =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/%EC%A0%9C7%EA%B2%BD_%ED%99%A9%EA%B8%88%EC%82%B0_%EC%BD%94%EB%81%BC%EB%A6%AC%EB%B0%94%EC%9C%84.jpg/330px-%EC%A0%9C7%EA%B2%BD_%ED%99%A9%EA%B8%88%EC%82%B0_%EC%BD%94%EB%81%BC%EB%A6%AC%EB%B0%94%EC%9C%84.jpg";
const img8 =
  "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202311/03/a62f3ef3-2e5d-426d-a877-6a2ef3af0ffa.jpg";
const img9 =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/%EC%A0%9C9%EA%B2%BD_%EC%82%BC%EA%B8%B8%ED%8F%AC%ED%95%AD.jpg/250px-%EC%A0%9C9%EA%B2%BD_%EC%82%BC%EA%B8%B8%ED%8F%AC%ED%95%AD.jpg";

const kyungList = [
  {
    id: 88,
    number: 1,
    title: "해미읍성",
    subtitle: "Haemieupseong Fortress",
    desc: "조선 초 병영성으로 만들어졌으며 원형이 가장 완전하게 보존된 평성, 이순신 장군이 군관으로 근무했던 곳이며 조선 후기 순교성지로 2014년 프란치스코 교황이 방문했다.",
    img: img1,
  },
  {
    id: 107,
    number: 2,
    title: "서산 용현리 마애여래삼존상",
    subtitle: "Rock-carved Buddha of Yonghyeon-ri",
    desc: "백제의 미소로 불리는 석불의 온화한 미소는 빛의 방향, 바라보는 각도에 따라 다르게 보인다. 백제 후기 화강암에 조각된 불상으로 역사적, 미학적 가치가 크다.",
    img: img2,
  },
  {
    id: 136,
    number: 3,
    title: "간월암",
    subtitle: "Ganworam Hermitage",
    desc: "저녁 노을빛이 바다까지 붉게 물들이는 아름다운 낙조가 유명한 곳으로 바닷물이 밀려들어오면 섬이 되고, 빠져 나가면 다시 뭍이 되는 신비로운 암자이다.",
    img: img3,
  },
  {
    id: 127,
    number: 4,
    title: "개심사",
    subtitle: "Gaesimsa Temple",
    desc: "가야산이 동쪽 장벽을 이루고 산 속 중턱 계류가 시작되는 협곡에 자리하여 사계절 내내 수려한 경관을 자랑한다. 왕벚꽃, 청벚꽃이 만개하는 봄철 수많은 사람들이 찾는 명소이다.",
    img: img4,
  },
  {
    id: 121,
    number: 5,
    title: "팔봉산",
    subtitle: "Palbongsan Mountain",
    desc: "8개의 봉우리가 서해안 갯벌과 바다를 굽어보는 아기자기한 산으로, 산세가 낮고 풍경이 아름다워 봉우리를 타고 넘는 재미가 쏠쏠하다.",
    img: img5,
  },
  {
    id: 130,
    number: 6,
    title: "가야산",
    subtitle: "Gayasan Mountain",
    desc: "보원사지, 개심사 등 많은 문화재와 보물을 품고 있는 명산으로 내포문화숲길과 아라메길을 통해 유서 깊은 문화유적과 수려한 자연경관을 감상할 수 있다.",
    img: img6,
  },
  {
    id: 117,
    number: 7,
    title: "황금산",
    subtitle: "Hwanggeumsan Mountain",
    desc: "해송과 야생화가 어우러진 숲길과 몽돌로 이루어진 해안이 절경을 이루는 곳으로 해발 156m의 낮은 산이지만 산을 넘으면 코끼리바위가 있는 아름다운 해안절벽을 감상할 수 있다.",
    img: img7,
  },
  {
    id: 142,
    number: 8,
    title: "서산한우목장",
    subtitle: "Seosan Hanwoo Ranch",
    desc: "드넓은 초지에서 한가로이 풀을 뜯는 한우떼가 이국적 풍경을 연출하는 곳으로 양쪽 넓은 초원을 보며 자연이 주는 아름다운 풍경을 만끽할 수 있다.",
    img: img8,
  },
  {
    id: 112,
    number: 9,
    title: "삼길포항",
    subtitle: "Samgilpo Port",
    desc: "풍부한 해산물과 화려한 야경을 함께 만날 수 있는 곳으로 선상횟집과 수산물직매장, 횟집 등에서 맛있는 해산물을 부담없이 즐길 수 있다.",
    img: img9,
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
