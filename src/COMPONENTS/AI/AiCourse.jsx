import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../CSS/AI/AiCourse.css";
import Header from "../COMMON/Header";

const AiCourse = () => {
  const [courseData, setCourseData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("aiCourses");
      if (stored) {
        const parsed = JSON.parse(stored);
        setCourseData(parsed);
      } else {
        console.warn("저장된 AI 코스 데이터가 없습니다.");
      }
    } catch (e) {
      console.error("AI 코스 데이터를 불러오는 중 오류 발생:", e);
    }
  }, []);

  // 코스 유효성 검사 함수
  const isValidCourse = (course) =>
    Array.isArray(course.course) && course.course.length > 0;

  return (
    <AnimatePresence>
      <motion.div
        className="ai-course-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <h2
          className="ai-course-title"
          style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
        >
          AI 추천 코스
        </h2>
        <p className="ai-course-sub">코스를 선택해주세요 ✨</p>

        {courseData.map((course, index) => {
          const valid = isValidCourse(course);

          return (
            <div
              className="course-box"
              key={index}
              tabIndex={0}
              role="button"
              style={{
                cursor: valid ? "pointer" : "not-allowed",
                position: "relative",
                opacity: valid ? 1 : 0.4,
              }}
              onClick={() => {
                if (valid) {
                  navigate(`/ai-course/${index}`);
                } else {
                  alert(
                    "이 코스는 유효하지 않아 상세 페이지로 이동할 수 없습니다."
                  );
                }
              }}
            >
              <div
                className="course-title"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>✦ 코스 {String.fromCharCode(65 + index)}.</span>
                {!valid && (
                  <span
                    style={{
                      color: "tomato",
                      fontSize: "0.9rem",
                      fontWeight: "normal",
                      marginRight: "2rem",
                    }}
                  >
                    (유효하지 않음)
                  </span>
                )}
                <span
                  className="course-more"
                  style={{
                    color: "#dff6ff",
                    fontSize: "1rem",
                    fontWeight: 400,
                    marginRight: "2.5rem",
                    marginTop: "0.7rem",
                  }}
                >
                  코스 더보기 &gt;
                </span>
              </div>

              <div className="course-summary">
                <p style={{ color: "#C1C1C1", marginBottom: "-0.5rem" }}>
                  AI 코스 요약
                </p>
                <p>{course.summary}</p>
              </div>

              {valid && (
                <div className="course-track">
                  <div className="track-line">
                    {course.course.slice(0, 5).map((item, idx, arr) => {
                      const minOpacity = 0.1;
                      const maxOpacity = 1;
                      const denominator = arr.length - 1;
                      const opacity =
                        denominator > 0
                          ? maxOpacity -
                            (maxOpacity - minOpacity) * (idx / denominator)
                          : maxOpacity;

                      return (
                        <div className="track-item" key={idx}>
                          <div className="track-dot" style={{ opacity }} />
                          <div
                            className={`track-label${
                              idx % 2 === 1
                                ? " track-label-top"
                                : " track-label-bottom"
                            }`}
                            style={{ opacity }}
                          >
                            {item.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <button className="retry-btn" onClick={() => navigate("/recommend")}>
          ✨ 다시 추천 받기
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default AiCourse;
