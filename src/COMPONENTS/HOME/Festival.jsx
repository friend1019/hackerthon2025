import React, { useState } from "react";
import Header from "../COMMON/Header";
import "../../CSS/HOME/Festival.css";
import samgilpoImg from "../../IMAGE/samgilpo.svg"; // 예시 이미지 경로
import haemiblossomImg from "../../IMAGE/haemiblossom.svg"; // 예시 이미지 경로
import starfestivalImg from "../../IMAGE/starfestival.svg"; // 예시 이미지 경로
import wangsanpofestivalImg from "../../IMAGE/jigokwang.svg"; // 예시 이미지 경로
import potatofestivalImg from "../../IMAGE/potatofestival.svg"; // 예시 이미지 경로
import octopusfestivalImg from "../../IMAGE/octopusfestival.svg"; // 예시 이미지 경로
import garlicfestivalImg from "../../IMAGE/garlicfestival.svg"; // 예시 이미지 경로
import gukwhafestivalImg from "../../IMAGE/gukwhafestival.svg"; // 예시 이미지 경로
import haemifortressfestivalImg from "../../IMAGE/haemifortressfestival.svg"; // 예시 이미지 경로
import gulfestivalImg from "../../IMAGE/gulfestival.svg"; // 예시 이미지 경로

const monthList = [
  { num: 4, label: "Apr." },
  { num: 5, label: "May" },
  { num: 6, label: "June" },
  { num: 7, label: "July" },
  { num: 8, label: "Aug." },
  { num: 9, label: "Sep." },
  { num: 10, label: "Oct." },
  { num: 11, label: "Nov." },
];

// 축제 데이터 (월 기준 정렬)
const festivalData = [
  {
    month: 7,
    title: "삼길포우럭축제",
    subtitle: "Samgilpo Rockfish Festival",
    desc: "전국 유일의 우럭을 주제로 한 축제로 우럭 시식 및 맨손 잡기 체험, 에어바운스 등 다채로운 프로그램이 준비되어 있다.",
    location: "서산시 대산읍 삼길포항 일원",
    date: "매년 8월 ~ 9월",
    tel1: "해양수산과 : 041-660-2647",
    tel2: "대산읍행정복지센터 : 041-660-3728",
    site: "https://www.seosan.go.kr/tour/",
    status: "진행중",
    image: samgilpoImg,
  },
  {
    month: 4,
    title: "해미벚꽃축제",
    subtitle: "Haemi Cherry Blossom Festival",
    desc: "해미천을 따라 벚꽃이 흐드러지게 피어 아름다운 풍경을 연출한다. 전시회, 체험행사, 먹거리 장터 등 보고 즐길 거리가 다양하다",
    location: "서산시 해미면 해미천 일원",
    date: "매년 4월",
    tel1: "해미면행정복지센터 : 041-660-2647",
    tel2: "",
    site: "https://www.seosan.go.kr/tour/",
    status: "예정",
    image: haemiblossomImg,
  },
  {
    month: 5,
    title: "류방택별축제",
    subtitle: "Seosan Ryubangtaek Star Festival",
    desc: "고려 말 천문학자 '금헌 류방택' 선생의 업적과 과학 정신을 계승하고 기념하는 축제이며, 아이들을 위한 다양한 체험과 프로그램이 준비되어 있다.",
    location: "서산시 인지면 류방택천문기상과학관 일원",
    date: "매년 5월",
    tel1: "류방택천문기상과학관 : 041-669-8496~7",
    tel2: "문화시설사업소 : 041-661-8009",
    site: "https://www.seosan.go.kr/tour/",
    status: "예정",
    image: starfestivalImg,
  },
  {
    month: 5,
    title: "지곡왕산포 서산갯마을축제",
    subtitle: "Seosan Gaetmaeul Festival at Jikok Wangsampo",
    desc: "지곡면 가로림만에서 채취되는 낙지, 바지락 등 해산물을 주제로 하는 축제이다. 맨손 물고기잡기, 수산물 할인행사, 노래자랑 등 다양한 프로그램과 체험을 통해 서해바다를 느낄 수 있다. ",
    location: "서산시 지곡면 왕산포구 일원",
    date: "매년 5월 ~ 6월",
    tel1: "해양수산과 : 041-660-2647",
    tel2: "지곡면행정복지센터 : 041-660-3473",
    site: "https://www.seosan.go.kr/tour/",
    status: "예정",
    image: wangsanpofestivalImg,
  },
  {
    month: 6,
    title: "팔봉산감자축제",
    subtitle: "Seosan Palbongsan Potato Festival",
    desc: "감자 캐기, 감자요리 만들기, 농특산물 판매 및 즉석경매 등 다채로운 체험과 행사를 통하여 팔봉산 감자 및 지역 농산물의 우수성을 알리고 있다.",
    location: "서산시 팔봉면 양길리 주차장 일원",
    date: "매년 6월",
    tel1: "농업기술센터 농식품유통과 : 041-660-3068",
    tel2: "팔봉면행정복지센터 : 041-660-3453",
    site: "https://www.seosan.go.kr/tour/",
    status: "예정",
    image: potatofestivalImg,
  },
  {
    month: 7,
    title: "서산6쪽마늘축제",
    subtitle: "Seosan 6-Job Garlic Festival",
    desc: "서산6쪽 마늘축제는 서산을 대표하는 농산물 축제다. 축제 기간 동안 판매, 시식 등 다양한 볼거리, 즐길 거리를 경험할 수 있다.",
    location: "서산시 해미면 남문2로 143 서산 해미읍성 일원",
    date: "매년 7월",
    tel1: "농업기술센터 농식품유통과 : 041-660-3068",
    tel2: "",
    site: "https://www.seosan.go.kr/tour/",
    status: "예정",
    image: garlicfestivalImg,
  },
  {
    month: 9,
    title: "서산어리굴젓축제",
    subtitle: "Seosan Eori Gulpjeot Festival",
    desc: "서산 천수만과 더불어 가을바다의 낙조를 즐길 수 있는 간월도에서 어리굴젓을 비롯한 신선한 수산물을 주제로 열리는 축제이다.",
    location: "서산시 부석면 간월도리 일원",
    date: "매년 9월 ~ 10월",
    tel1: "해양수산과 : 041-660-2647",
    tel2: "부석면행정복지센터 : 041-660-3431",
    site: "https://www.seosan.go.kr/tour/",
    status: "예정",
    image: gulfestivalImg,
  },
  {
    month: 10,
    title: "서산뻘낙지먹물축제",
    subtitle: "Seosan Mud Octopus Ink Festival",
    desc: "지곡리 중리 포구에서 건강식품인 낙지를 주제로 축제를 개최하고 있으며 먹거리, 볼거리, 즐길 거리들이 다양하게 준비되어 있다.",
    location: "서산시 지곡면 중리포구 일원",
    date: "매년 10월",
    tel1: "해양수산과 : 041-660-2647",
    tel2: "지곡면행정복지센터 : 041-660-3473",
    site: "https://www.seosan.go.kr/tour/",
    status: "예정",
    image: octopusfestivalImg,
  },
  {
    month: 10,
    title: "서산시해미읍성축제",
    subtitle: "Seosan Haemi Fortress Festival",
    desc: "조선시대 생활, 문화를 체험할 수 있는 역사축제로 태종대왕 행렬, 성내 숙영 프로그램, 역사마당극 등 다양한 프로그램을 운영하며 전국적인 축제로 자리매김하고 있다.",
    location: "서산시 해미면 남문2로 143 서산 해미읍성 일원",
    date: "매년 10월",
    tel1: "서산문화재단 : 041-660-2697",
    tel2: "",
    site: "https://www.seosan.go.kr/tour/",
    status: "예정",
    image: haemifortressfestivalImg,
  },
  {
    month: 11,
    title: "서산국화축제",
    subtitle: "Seosan Chrysanthemum Festival",
    desc: "형형색색 아름다운 국화꽃과 함께 은은하게 퍼지는 매혹적인 국화 향기를 느낄 수 있는 축제이다. 늦가을 정취속에서 대형 국화 작품과 다양한 분재국들을 감상해보자.",
    location: "서산시 고북면 복남곰길 31-1 일원",
    date: "매년 11월",
    tel1: "농업기술센터 기술보급과 : 041-660-3936",
    tel2: "고북면행정복지센터 : 041-660-3855",
    site: "https://www.seosan.go.kr/tour/",
    status: "예정",
    image: gukwhafestivalImg,
  },
];

const Festival = () => {
  const [selectedMonth, setSelectedMonth] = useState(8);

  // date에 "8월~9월"처럼 입력된 경우 해당 월에 포함되도록 처리
  const filteredFestivals = festivalData.filter((f) => {
    // "8월~9월" 또는 "8월" 등에서 월 추출
    const monthRange = f.date.match(/(\d{1,2})월(?:~(\d{1,2})월)?/);
    if (monthRange) {
      const startMonth = parseInt(monthRange[1], 10);
      const endMonth = monthRange[2] ? parseInt(monthRange[2], 10) : startMonth;
      return selectedMonth >= startMonth && selectedMonth <= endMonth;
    }
    // 기존 month 필드도 체크
    return f.month === selectedMonth;
  });

  return (
    <div className="festival-container">
      <Header />
      <h1 className="festival-title">서산시 페스티벌</h1>
      <div className="month-slider">
        {monthList.map((month) => (
          <button
            key={month.num}
            className={`month-button ${
              selectedMonth === month.num ? "active" : ""
            }`}
            onClick={() => setSelectedMonth(month.num)}
          >
            <div className="month-num">{month.num}월</div>
            <span className="month-divider" />
            <div className="month-label">{month.label}</div>
          </button>
        ))}
      </div>

      <div className="festival-list">
        {filteredFestivals.map((f, idx) => (
          <div className="festival-card" key={idx}>
            <img src={f.image} alt={f.title} className="festival-img" />
            <div className="festival-info">
              <h3>
                {f.title} <span className="subtitle">{f.subtitle}</span>
                <span className="status-tag">{f.status}</span>
              </h3>
              <p>{f.desc}</p>
              <ul className="festival-meta">
                <li>
                  <strong>📍 장소:</strong> {f.location}
                </li>
                <li>
                  <strong>📅 기간:</strong> {f.date}
                </li>
                <li>
                  <strong>☎️ 문의:</strong> {f.tel1} / {f.tel2}
                </li>
                <li>
                  <strong>🔗 공식사이트:</strong>{" "}
                  <a href={f.site} target="_blank" rel="noreferrer">
                    {f.site}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Festival;
