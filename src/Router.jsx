import { Routes, Route } from "react-router-dom";
import Home from "./COMPONENTS/HOME/Home";
import RecommendCourse from "./COMPONENTS/STEPS/RecommendCourse";
import PlaceDetail from "./COMPONENTS/PLACE/PlaceDetail";
import KyungList from "./COMPONENTS/HOME/9kyung";
import MiList from "./COMPONENTS/HOME/9mi";
import PumList from "./COMPONENTS/HOME/9pum";
import Festival from "./COMPONENTS/HOME/Festival";
import AiCourse from "./COMPONENTS/AI/AiCourse";
import AiCourseDetail from "./COMPONENTS/AI/AiCourseDetail";
import CourseSpinner from "./COMPONENTS/STEPS/CourseSpinner";
import MapContainer from "./COMPONENTS/AI/MapContainer";
import Aramegil from "./COMPONENTS/HOME/Aramegil";

function AppRouter() {
  return (
    <Routes>
      {/* 여기에 라우트 정의 */}
      <Route path="/" element={<Home />} />

      <Route path="/course-loading" element={<CourseSpinner />} />

      <Route path="/recommend" element={<RecommendCourse />} />
      <Route path="/place/:id" element={<PlaceDetail />} />
      <Route path="/store/:id" element={<PlaceDetail />} />
      <Route path="/9kyung" element={<KyungList />} />
      <Route path="/9mi" element={<MiList />} />
      <Route path="/9pum" element={<PumList />} />
      <Route path="/festival" element={<Festival />} />
      <Route path="/aramegil" element={<Aramegil />} />
      <Route path="/ai-course" element={<AiCourse />} />
      <Route path="/ai-course/:id" element={<AiCourseDetail />} />
      <Route path="/map" element={<MapContainer />} />

      {/* 기타 라우트 */}
    </Routes>
  );
}
export default AppRouter;