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
          <img src="https://ik.imagekit.io/verbum0179/v0/b/stalbertschool-351e8.appspot.com/o/imgs%2Flogo.png?alt=media&token=7c76096a-f104-4dae-bf52-63ce4b8661f3" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
