import React from "react";
import "../../CSS/COMMON/SideDrawer.css";
import { FiChevronLeft } from "react-icons/fi";

/**
 * 📌 SideDrawer 컴포넌트
 * - 화면 오른쪽에서 슬라이드되어 열리는 사이드 메뉴
 * - 배경 클릭 시 닫힘
 *
 * Props:
 *  - open (boolean): 드로어 열림 여부
 *  - onClose (function): 닫기 이벤트 핸들러
 *  - children (ReactNode): 드로어 내부에 표시할 콘텐츠
 */
const SideDrawer = ({ open, onClose, children }) => {
  return (
    <div
      className={`side-drawer-bg${open ? " open" : ""}`}
      onClick={onClose}
    >
      <div
        className={`side-drawer${open ? " open" : ""}`}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        {/* 닫기 버튼 */}
        <button className="side-drawer-close" onClick={onClose}>
          <FiChevronLeft size={28} />
        </button>

        {/* 드로어 내부 콘텐츠 */}
        <div className="side-drawer-content">{children}</div>
      </div>
    </div>
  );
};

export default SideDrawer;
