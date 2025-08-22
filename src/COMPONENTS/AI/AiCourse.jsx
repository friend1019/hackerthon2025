import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Alert from "../COMMON/Alert";
import Header from "../COMMON/Header";

import "../../CSS/AI/AiCourse.css";

const AiCourse = () => {
  const [courseData, setCourseData] = useState([]);
  const [initialized, setInitialized] = useState(false); // 초기 렌더 제어
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertRedirect, setAlertRedirect] = useState(null); // 닫을 때 이동할 경로
  const navigate = useNavigate();

  // 코스 유효성 검사 함수
  const isValidCourse = (course) =>
    course && Array.isArray(course.course) && course.course.length > 0;

  useEffect(() => {
    try {
      const stored = localStorage.getItem("aiCourses");

      if (!stored) {
        setAlertMessage("추천받은 AI 코스가 없습니다.");
        setAlertRedirect("/"); // 확인 시 홈으로 이동
        setShowAlert(true);
        return;
      }

      const parsed = JSON.parse(stored);

      // 배열이 아니거나 빈 배열이거나, 모든 코스가 유효하지 않은 경우까지 처리
      const isArray = Array.isArray(parsed);
      const hasUsable =
        isArray && parsed.length > 0 && parsed.some((c) => isValidCourse(c));

      if (!isArray || !hasUsable) {
        setAlertMessage("추천받은 AI 코스가 없습니다.");
        setAlertRedirect("/"); // 확인 시 홈으로 이동
        setShowAlert(true);
        return;
      }

      setCourseData(parsed);
    } catch (e) {
      console.error("AI 코스 데이터를 불러오는 중 오류 발생:", e);
      setAlertMessage("추천받은 AI 코스가 없습니다.");
      setAlertRedirect("/"); // 확인 시 홈으로 이동
      setShowAlert(true);
    } finally {
      setInitialized(true);
    }
  }, [navigate]);

  // 초기화 전에는 렌더하지 않음(깜빡임 방지)
  if (!initialized) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="ai-course-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Alert 모달 */}
        {showAlert && (
          <Alert
            message={alertMessage}
            onClose={() => {
              setShowAlert(false);
              if (alertRedirect) {
                navigate(alertRedirect, { replace: true });
              }
            }}
          />
        )}

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
              key={index}
              className="course-box"
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
                  setAlertMessage(
                    "이 코스는 유효하지 않아 상세 페이지로 이동할 수 없습니다."
                  );
                  setAlertRedirect(null); // 닫아도 이동 없음
                  setShowAlert(true);
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
                        <div key={idx} className="track-item">
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

        <div className="ai-course-btn-group">
          <button
            className="ai-course-btn"
            onClick={() => navigate("/recommend")}
          >
            ✨ 다시 추천 받기
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AiCourse;