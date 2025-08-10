import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import "../../CSS/AI/AiCourseDetail.css";
import Header from "../COMMON/Header";
import defaultImage from "../../IMAGE/defaultImage.svg";

const AiCourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    console.log("useParams id:", id);
    const stored = localStorage.getItem("aiCourses");
    console.log("localStorage raw:", stored);
    const parsed = stored ? JSON.parse(stored) : [];
    console.log("parsed:", parsed);
    const index = Number(id);
    console.log(
      "index:",
      index,
      "isValid:",
      Number.isInteger(index),
      "course exists:",
      parsed[index]
    );
  }, [id]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("aiCourses");
      if (!stored) {
        alert("추천 코스 정보가 없습니다.");
        navigate("/ai-course");
        return;
      }

      const parsed = JSON.parse(stored);
      const index = Number(id);

      if (
        !Number.isInteger(index) ||
        !parsed[index] ||
        !Array.isArray(parsed[index].course) ||
        parsed[index].course.length === 0
      ) {
        alert("유효하지 않은 코스입니다.");
        navigate("/ai-course");
        return;
      }

      setCourse(parsed[index]);
    } catch (e) {
      console.error("코스 불러오기 실패:", e);
      alert("코스 정보를 불러오는 중 오류가 발생했습니다.");
      navigate("/ai-course");
    }
  }, [id, navigate]);

  if (!course) return null; // 데이터 로딩 전에는 아무것도 표시 안 함

  return (
    <motion.div
      className="ai-course-detail-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <div style={{ marginLeft: "2rem", marginBottom: "0.5rem" }}>
        <MdKeyboardArrowLeft
          style={{
            fontSize: "2.2rem",
            cursor: "pointer",
            verticalAlign: "middle",
          }}
          onClick={() => navigate(-1)}
        />
      </div>

      <h2 className="ai-course-detail-title">
        AI 추천 코스 {id === "0" ? "A" : id === "1" ? "B" : id === "2" ? "C" : ""} 
      </h2>
      <p className="ai-course-detail-sub">
        {course.summary}
      </p>

      <div className="ai-course-detail-section">
        <div className="ai-course-detail-line" />
        {course.course.map((place, idx) => (
          <div key={idx}>
            <div className="ai-course-detail-header">
              <span className="ai-course-detail-star">✦</span>
              <span className="ai-course-detail-course-title">
                산책 {idx + 1}.
              </span>
              {place.type === "가게" && (
                <span className="ai-course-detail-currency-good">
                  ✅ 지역화폐 사용 가능
                </span>
              )}
            </div>

            <div
              className="ai-course-detail-card"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (place.type === "가게") {
                  navigate(`/store/${place.id}`);
                } else {
                  navigate(`/place/${place.id}`);
                }
              }}
            >
              <div className="ai-course-detail-imgbox">
                {place.imageUrl && place.imageUrl.startsWith("http") ? (
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="ai-course-detail-img"
                  />
                ) : (
                  <img
                    src={defaultImage}
                    alt="이미지 없음"
                    className="ai-course-detail-img"
                  />
                )}
              </div>

              <div className="ai-course-detail-info">
                <div className="ai-course-detail-names">
                  <span className="ai-course-detail-name">{place.name}</span>
                  <span className="ai-course-detail-eng">{place.type}</span>
                </div>
                <div className="ai-course-detail-desc">{place.description}</div>
              </div>

              <MdKeyboardArrowRight className="ai-course-detail-arrowicon" />
            </div>
          </div>
        ))}
      </div>

      <button className="ai-course-detail-mapbtn">지도 보기</button>
    </motion.div>
  );
};

export default AiCourseDetail;
