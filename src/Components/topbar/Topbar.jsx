import React from "react";
import "./Topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">admin@stalbertschools.ng</span>
        </div>
        <div className="topRight">
          <img src="/img/logo.png" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
