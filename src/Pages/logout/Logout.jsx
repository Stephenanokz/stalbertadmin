import React, { useContext } from "react";
import { logoutCall } from "../../context/authContext/AuthApiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./Logout.css";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logoutCall(dispatch);
    return navigate("/");
  };

  return (
    <div className="logout">
      <span className="logoutText">Are you sure you want to logout?</span>
      <button className="logoutButton" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
