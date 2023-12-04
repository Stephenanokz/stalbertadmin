import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <img src="/img/logo.png" className="homeImg" alt="logo" />
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
