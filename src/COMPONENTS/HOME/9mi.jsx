import React from "react";
import "../../CSS/HOME/9kyung.css";
import Header from "../COMMON/Header";

const img1 = "https://www.seosan.go.kr/site/tour/images/main/food_img1.jpg";
const img2 = "https://www.seosan.go.kr/site/tour/images/main/food_img2.jpg";
const img3 = "https://www.seosan.go.kr/site/tour/images/main/food_img3.jpg";
const img4 = "https://www.seosan.go.kr/site/tour/images/main/food_img4.jpg";
const img5 = "https://www.seosan.go.kr/site/tour/images/main/food_img5.jpg";
const img6 = "https://www.seosan.go.kr/site/tour/images/main/food_img6.jpg";
const img7 = "https://www.seosan.go.kr/site/tour/images/main/food_img7.jpg";
const img8 = "https://www.seosan.go.kr/site/tour/images/main/food_img8.jpg";
const img9 = "https://www.seosan.go.kr/site/tour/images/main/food_img9.jpg";

const miList = [
  {
    id: 1,
    number: 1,
    title: "꽃게장",
    subtitle: "Soy Sauce Marinated Crab",
    desc: "서해안에서 잡은 신선한 꽃게를 간장에 절여 숙성시킨 서산 대표 음식입니다.\n짭조름한 간장 맛과 게살의 감칠맛이 조화를 이루며, 밥과 함께 먹으면 그야말로 '밥도둑'이라 불릴 만큼 인기가 높습니다.",
    img: img1,
  },
  {
    id: 21,
    number: 2,
    title: "서산 어리굴젓",
    subtitle: "Fermented Oyster Jeotgal",
    desc: "갓 채취한 굴에 고춧가루, 마늘, 생강 등을 넣어 숙성시킨 발효 젓갈로,\n깔끔하고 깊은 풍미가 특징입니다. 서산의 해산물 발효식품을 대표하는 밑반찬이자 선물용으로도 사랑받습니다.",
    img: img2,
  },
  {
    id: 56,
    number: 3,
    title: "게국지",
    subtitle: "Crab Kimchi Stew",
    desc: "김치와 꽃게, 젓갈, 된장을 넣고 끓인 얼큰한 찌개로, 서산 갯마을의 전통 음식입니다.\n시원하고 칼칼한 국물 맛이 특징이며, 계절에 따라 별미로 즐기기 좋습니다.",
    img: img3,
  },
  {
    id: 44,
    number: 4,
    title: "밀국낙지탕",
    subtitle: "Wheat Noodle Octopus Soup",
    desc: "서산에서 재배한 밀가루로 만든 칼국수(밀국수)에 낙지를 넣고 얼큰하게 끓인 탕입니다.\n쫄깃한 낙지와 깊은 국물 맛으로 미식가들의 입맛을 사로잡는 보양식입니다.",
    img: img4,
  },
  {
    id: 37,
    number: 5,
    title: "서산 우리한우",
    subtitle: "Seosan Korean Beef",
    desc: "청정 자연에서 사육된 서산 한우는 육질이 부드럽고 풍미가 진해 고급 한우로 손꼽힙니다.\n불고기, 구이, 국거리 등 다양한 방식으로 즐길 수 있습니다.",
    img: img5,
  },
  {
    id: 49,
    number: 6,
    title: "우럭젓국",
    subtitle: "Rockfish Jeotgal Soup",
    desc: "서해안에서 잡은 우럭과 젓갈을 넣고 끓인 국물 요리입니다.\n서산 특유의 감칠맛을 담은 얼큰한 국물 음식으로, 해장용으로도 인기가 많습니다.",
    img: img6,
  },
  {
    id: 32,
    number: 7,
    title: "생강한과",
    subtitle: "Ginger Traditional Confectionery",
    desc: "서산 특산물인 생강을 활용한 전통 한과입니다.\n은은한 생강향과 바삭한 식감이 조화를 이루며, 건강한 간식 또는 선물용으로 적합합니다.",
    img: img7,
  },
  {
    id: 64,
    number: 8,
    title: "마늘각시",
    subtitle: "Garlic Snack",
    desc: "서산 육쪽마늘을 활용해 만든 창의적인 마늘 가공식품입니다.\n마늘의 향과 영양을 살린 이색 간식으로, 서산 마늘의 우수성을 알리는 특산 제품입니다.",
    img: img8,
  },
  {
    id: 27,
    number: 9,
    title: "영양굴밥",
    subtitle: "Nutritious Oyster Rice",
    desc: "제철 굴과 다양한 채소, 해산물 육수를 넣어 지은 건강 밥상입니다.\n굴의 고소한 맛과 영양이 어우러져 남녀노소 누구나 즐길 수 있는 영양식입니다.",
    img: img9,
  },
];

const MiCard = ({ item }) => {
  return (
    <>
      <Header />
      <div
        className="kyung-card"
        style={{ cursor: "pointer" }}
      >
        <div className="kyung-card-imgbox">
          <img src={item.img} alt={item.title} className="kyung-card-img" />
          <div className="kyung-card-badge">{item.number}미</div>
        </div>
        <div className="kyung-card-info">
          <div className="kyung-card-title-row">
            <div className="kyung-card-title">{item.title}</div>
            <div className="kyung-card-divider" />
            <div className="kyung-card-subtitle">{item.subtitle}</div>
          </div>
          <div className="kyung-card-desc">{item.desc}</div>
        </div>
      </div>
    </>
  );
};

const MiList = () => {
  return (
    <>
      <div className="kyung-list-all">
        <Header />
        <h1 className="kyung-list-title">서산 9미</h1>
        <div className="kyung-list-wrap">
          {miList.map((item) => (
            <MiCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MiList;
