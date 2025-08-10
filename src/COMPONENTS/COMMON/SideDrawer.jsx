import React from "react";
import "../../CSS/COMMON/SideDrawer.css";
import { FiChevronLeft } from "react-icons/fi";

const SideDrawer = ({ open, onClose, children }) => {
  return (
    <div className={`side-drawer-bg${open ? " open" : ""}`} onClick={onClose}>
      <div
        className={`side-drawer${open ? " open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="side-drawer-close" onClick={onClose}>
          <FiChevronLeft size={28} />
        </button>
        <div className="side-drawer-content">{children}</div>
      </div>
    </div>
  );
};

export default SideDrawer;
