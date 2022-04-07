import React, { useState } from "react";
import "./Login.css";
import LoginIllustration from "../assets/login-illustration.png";
import CemexLogo from "../assets/cemex-logo.png";
import UserIcon from "../assets/user-icon.png";
import LockIcon from "../assets/lock-icon.png";
import EyeIcon from "../assets/eye-icon.png";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className="main-container">
      <div className="side-left">
        <img className="side-left-logo" src={CemexLogo} />
        <img className="side-left-illustration" src={LoginIllustration} />
      </div>

      <div className="side-right">
        <div className="container">
          <div className="login-form">
            <h2 className="login-title">Welcome to CEMEX GO Classifier!</h2>
            <h3 className="login-subtitle">
              Login with your assigned credentials
            </h3>
            {/* TODO: Hacer esto un componente */}
            <div className="prompt">
              <h4 className="prompt-title">Username</h4>
              <div className="custom-input">
                <img className="user-icon" src={UserIcon} />
                <input className="email-input" type="email" />
              </div>
            </div>
            <div className="prompt">
              <h4 className="prompt-title">Password</h4>
              <div className="custom-input">
                <img className="lock-icon" src={LockIcon} />
                <input
                  className="password-input"
                  type={passwordVisible ? "text" : "password"}
                />

                <img
                  className="eye-icon"
                  src={EyeIcon}
                  onClick={() => handlePasswordVisibilityToggle()}
                />
              </div>
            </div>
            <button className="login-button">LOGIN</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
