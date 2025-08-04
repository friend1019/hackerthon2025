import React from "react";
import star1 from "../../IMAGE/star1.svg";

const CourseSpinner = () => {
  // 애니메이션 상태 관리
  const [rot, setRot] = React.useState(0);
  const [active, setActive] = React.useState(true);

  React.useEffect(() => {
    let timer;
    if (active) {
      timer = setTimeout(() => {
        setRot(r => r + 90);
        setActive(false);
      }, 1000);
    } else {
      timer = setTimeout(() => {
        setActive(true);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className="course-spinner-bg">
      <div className="course-spinner-center">
        <img
          src={star1}
          alt="별"
          className="course-spinner-star"
          style={{ transform: `rotate(${rot}deg)`, transition: active ? "transform 1s cubic-bezier(.7,.2,.3,1)" : "none" }}
        />
        <h2 className="course-spinner-title">코스 추천 중</h2>
        <div className="course-spinner-desc">
          당신의 여행 스타일을 분석 중이에요...<br />
          곧, 딱 맞는 여행 코스를 추천해드릴게요
        </div>
      </div>
    </div>
  );
};

export default CourseSpinner;
