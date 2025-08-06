import { Routes, Route } from "react-router-dom";
import Home from "./COMPONENTS/HOME/Home";
import RecommendCourse from "./COMPONENTS/STEPS/RecommendCourse";
import PlaceDetail from "./COMPONENTS/PLACE/PlaceDetail";


function AppRouter() {
  return (
    <Routes>
      {/* 여기에 라우트 정의 */}
      <Route path="/" element={<Home />} />
      <Route path="/recommend" element={<RecommendCourse />} />
      <Route path="/place/:id" element={<PlaceDetail />} />
      <Route path="/store/:id" element={<PlaceDetail />} />
      {/* 기타 라우트 */}
    </Routes>
  );
}
export default AppRouter;