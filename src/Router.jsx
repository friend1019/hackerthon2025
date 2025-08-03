import { Routes, Route } from "react-router-dom";
import Home from "./COMPONENTS/HOME/Home";


function AppRouter() {
  return (
    <Routes>
      {/* 여기에 라우트 정의 */}
      <Route path="/" element={<Home />} />
      {/* 기타 라우트 */}
    </Routes>
  );
}
export default AppRouter;