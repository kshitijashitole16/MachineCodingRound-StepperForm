import React, { useState } from "react";

const Sidebar = ({
  heading,
  Content,
  siderBarOpen,
  isrightside,
  isleftside,
  RightSideBtn,
  LeftSideBtn,
}) => {
  const [close, setClose] = useState(siderBarOpen);
  if (!close) return null;

  return (
    <aside className="sidebar">
      <div className="cross hover-btn" onClick={() => setClose(false)}>
        {">"}
      </div>
      <div className="header-sideBar">
        <label className="form-title">{heading}</label>
      </div>

      <div className="content-sideBar">{Content}</div>

      <div className="siderbar-footer-main">
        <div className="siderbar-footer">
          {" "}
          {isrightside && <div className="hover-btn">{RightSideBtn}</div>}
          {isleftside && <div className="hover-btn">{LeftSideBtn}</div>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
