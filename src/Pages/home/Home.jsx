import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <img src="https://ik.imagekit.io/verbum0179/v0/b/stalbertschool-351e8.appspot.com/o/imgs%2Flogo.png?alt=media&token=7c76096a-f104-4dae-bf52-63ce4b8661f3" className="homeImg" alt="logo" />
      <h1 className="homeTitle">
        Welcome back, {JSON.parse(localStorage.getItem("user")).username}.
      </h1>
      <span className="homeSubTitle">
        To create and edit any Module, please use the appropriate tab on the Sidebar
      </span>
    </div>
  );
};

export default Home;
