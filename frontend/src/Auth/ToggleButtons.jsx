import React from "react";

function ToggleButtons({ isLogin, setIsLogin }) {
  return (
    <div className="toggle-container">
     
      <div className="toggle-buttons">
        <button
          className={isLogin ? "active" : ""}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={!isLogin ? "active" : ""}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default ToggleButtons;
