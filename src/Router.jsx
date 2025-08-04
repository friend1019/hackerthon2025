import { Routes, Route } from "react-router-dom";
import Home from "./COMPONENTS/HOME/Home";
import RecommendCourse from "./COMPONENTS/STEPS/RecommendCourse";


function AppRouter() {
  return (
    <Routes>
      {/* 여기에 라우트 정의 */}
      <Route path="/" element={<Home />} />
      <Route path="/recommend" element={<RecommendCourse />} />
      {/* 기타 라우트 */}
    </Routes>
  );
}
export default AppRouter;