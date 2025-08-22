import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

import Alert from "../COMMON/Alert";
import Header from "../COMMON/Header";

import "../../CSS/AI/AiCourseDetail.css";
import defaultImage from "../../IMAGE/place/defaultImage.svg";

const AiCourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Alert 상태
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertRedirect, setAlertRedirect] = useState(null); // 닫을 때 이동할 경로

  // 데이터 로드
  useEffect(() => {
    try {
      const stored = localStorage.getItem("aiCourses");
      if (!stored) {
        setAlertMessage("추천 코스 정보가 없습니다.");
        setAlertRedirect("/ai-course");
        setShowAlert(true);
        return;
      }

      const parsed = JSON.parse(stored);
      const index = Number(id);

      if (!Number.isInteger(index) || !parsed[index]?.course?.length) {
        setAlertMessage("유효하지 않은 코스입니다.");
        setAlertRedirect("/ai-course");
        setShowAlert(true);
        return;
      }

      setCourse(parsed[index]);
    } catch (e) {
      console.error("코스 불러오기 실패:", e);
      setAlertMessage("코스 정보를 불러오는 중 오류가 발생했습니다.");
      setAlertRedirect("/ai-course");
      setShowAlert(true);
    } finally {
      setInitialized(true);
    }
  }, [id, navigate]);

  // 지도 보기: 코스 순서 유지 + 좌표 정규화 + 결측치 필터링
  const handleMapClick = useCallback(() => {
    if (!course?.course) return;

    const places = course.course
      .map((p) => ({
        id: p.id,
        name: p.name,
        type: p.type,
        description: p.description,
        imageUrl: p.imageUrl,
        lat: Number(p.latitude ?? p.lat),
        lng: Number(p.longitude ?? p.lng),
      }))
      .filter(
        (p) => p.name && Number.isFinite(p.lat) && Number.isFinite(p.lng)
      );

    if (places.length < 2) {
      setAlertMessage("지도에 표시할 유효한 장소 좌표가 부족합니다.");
      setAlertRedirect(null); // 닫아도 이동 없음
      setShowAlert(true);
      return;
    }

    navigate("/map", { state: { places, aiIndex: Number(id) } });
  }, [course, id, navigate]);

  const label = id === "0" ? "A" : id === "1" ? "B" : id === "2" ? "C" : "";

  // 초기화 전에는 렌더하지 않음(깜빡임 방지)
  if (!initialized) return null;

  return (
    <motion.div
      className="ai-course-detail-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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

      {course && (
        <>
          <h2 className="ai-course-detail-title">AI 추천 코스 {label}</h2>
          <p className="ai-course-detail-sub">{course.summary}</p>

          <div className="ai-course-detail-section">
            <div className="ai-course-detail-line" />
            {course.course.map((place, idx) => (
              <div key={`${place.id ?? idx}`}>
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
                    if (place.type === "가게") navigate(`/store/${place.id}`);
                    else navigate(`/place/${place.id}`);
                  }}
                >
                  <div className="ai-course-detail-imgbox">
                    {typeof place.imageUrl === "string" &&
                    place.imageUrl.startsWith("http") ? (
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
                      <span className="ai-course-detail-name">
                        {place.name}
                      </span>
                      <span className="ai-course-detail-eng">{place.type}</span>
                    </div>
                    <div className="ai-course-detail-desc">
                      {place.description}
                    </div>
                  </div>

                  <MdKeyboardArrowRight className="ai-course-detail-arrowicon" />
                </div>
              </div>
            ))}
          </div>

          <div className="ai-course-detail-btn-group">
            <button
              className="ai-course-detail-mapbtn"
              onClick={handleMapClick}
            >
              📍 지도 보기
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default AiCourseDetail;
