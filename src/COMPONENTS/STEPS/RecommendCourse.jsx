// RecommendCourse.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepTheme from "./StepTheme";
import StepInterest from "./StepInterest";
import StepAi from "./StepAi";
import api from "../../API/axios";
import CourseSpinner from "./CourseSpinner";

const steps = [StepTheme, StepInterest, StepAi];

const RecommendCourse = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    theme: "",
    interests: [],
    aiText: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const nextStep = async (updatedAnswers = answers) => {
    console.log(`✅ Step ${step + 1} - answers 상태:`, updatedAnswers);
    if (step === steps.length - 1) {
      await handleRecommend(updatedAnswers);
    } else {
      setAnswers(updatedAnswers);
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleRecommend = async (updatedAnswers = answers) => {
    setLoading(true);
    const area = updatedAnswers.theme;
    const category = updatedAnswers.interests.join(",");
    const text = updatedAnswers.aiText;

    console.log("🚀 API 요청 파라미터:", { area, category, text });

    try {
      const res = await api.get(
        `/ai/travel-plans?area=${area}&category=${category}&text=${text}`
      );
      localStorage.setItem("aiCourses", JSON.stringify(res.data));
      console.log("✅ API 응답 결과 저장 완료");
      navigate("/ai-course");
    } catch (err) {
      console.error("❌ AI 추천 실패:", err);
      alert("추천 코스 요청 실패");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CourseSpinner />;

  const StepComponent = steps[step];
  return (
    <div className="recommend-course-bg">
      <StepComponent
        answers={answers}
        setAnswers={setAnswers}
        nextStep={nextStep}
        prevStep={prevStep}
        step={step}
      />
    </div>
  );
};

export default RecommendCourse;