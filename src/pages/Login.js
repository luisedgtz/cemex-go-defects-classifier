import React from "react";
import "./Login.css";
import LoginIllustration from "../assets/login-illustration.png";
import CemexLogo from "../assets/cemex-logo.png";

const Login = () => {
  return (
    <section className="main-container">
      <div className="side-left">
        <img className="side-left-logo" src={CemexLogo} />
        <img className="side-left-illustration" src={LoginIllustration} />
      </div>

      <div className="side-right">
        <div className="login-form">
          <h2 className="login-title">Welcome to CEMEX GO Classifier!</h2>
          <h3 className="login-subtitle">
            Login with your assigned credentials
          </h3>
          {/* TODO: Hacer esto un componente */}
          <div className="prompt">
            <h5>xd</h5>
            <div className="custom-input">
              <input type="email" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
