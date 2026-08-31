import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import cropelleLogo from "../assets/cropelle-logo.png";
import profileIcon from "../assets/profile.png";

export default function LoginScreen() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
  event.preventDefault();

  if (!username.trim() || !password.trim()) {
    alert("Please enter a username and password.");
    return;
  }

  try {
    /*
    =====================================
    FUTURE API LOGIN
    =====================================

    const response = await fetch(
      "https://your-api-url/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      navigate("/dashboard");
    } else {
      alert(data.message || "Invalid username or password.");
    }

    =====================================
    END API LOGIN
    =====================================
    */

    // TEMPORARY LOGIN
    const validUsername = "admin";
    const validPassword = "Password123";

    if (
      username === validUsername &&
      password === validPassword
    ) {

      localStorage.setItem("username", username);
      navigate("/dashboard");
    } else {
      alert("Invalid username or password.");
    }

  } catch (error) {
    console.error("Login Error:", error);
    alert("Login failed.");
  }
};

  const handleForgotPassword = () => {
  navigate("/forget-password");
};

  return (
    <div style={pageStyle}>
      <div style={deviceStyle}>
        <div style={cameraStyle}></div>

        <div style={containerStyle}>
          {/* LEFT PANEL */}
          <div style={leftPanelStyle}>
            <img src={cropelleLogo} alt="Cropelle Logo" style={logoStyle} />

            <h2 style={brandTextStyle}>CROPELLE</h2>
          </div>

          {/* RIGHT PANEL */}
          <div style={rightPanelStyle}>
            <h1 style={titleStyle}>LOGIN</h1>

            <form style={cardStyle} onSubmit={handleLogin}>
              {/* USERNAME */}
              <div style={labelRowStyle}>
               <img src={profileIcon} alt="Profile" style={menuIconStyle} />

                <label style={labelStyle} htmlFor="username">
                  USERNAME
                </label>
              </div>

              <div style={inputWrapperStyle}>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  style={inputStyle}
                  autoComplete="username"
                />
              </div>

              {/* PASSWORD */}
              <div style={labelRowStyle}>
                <img src={profileIcon} alt="Profile" style={menuIconStyle} />

                <label style={labelStyle} htmlFor="password">
                  PASSWORD
                </label>
              </div>

              <div style={inputWrapperStyle}>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  style={inputStyle}
                  autoComplete="current-password"
                />
              </div>

              <button
                type="button"
                style={forgotPasswordStyle}
                onClick={handleForgotPassword}
              >
                FORGOT PASSWORD?
              </button>

              <button type="submit" style={loginButtonStyle}>
                LOG IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#000000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  boxSizing: "border-box",
};
  const menuIconStyle = {
    width: "clamp(38px, 5vw, 58px)",
    height: "clamp(38px, 5vw, 58px)",
    objectFit: "contain",
    flexShrink: 0,
  };


const deviceStyle = {
  width: "100%",
  maxWidth: "1100px",
  backgroundColor: "#000000",
  border: "3px solid #D9D9D9",
  borderRadius: "24px",
  padding: "clamp(14px, 2vw, 30px)",
  position: "relative",
  boxSizing: "border-box",
};

const cameraStyle = {
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: "#061D1F",
  border: "2px solid #111111",
  position: "absolute",
  top: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 2,
};

const containerStyle = {
  width: "100%",
  minHeight: "580px",
  backgroundColor: "#FFFFFF",
  display: "flex",
  overflow: "hidden",
  border: "2px solid #222222",
  borderRadius: "12px",
  boxSizing: "border-box",
};

const leftPanelStyle = {
  width: "36%",
  minWidth: "180px",
  backgroundColor: "#F0ECE3",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  paddingTop: "70px",
  paddingLeft: "20px",
  paddingRight: "20px",
  boxSizing: "border-box",
};

const logoStyle = {
  width: "clamp(100px, 15vw, 165px)",
  height: "clamp(100px, 15vw, 165px)",
  objectFit: "contain",
  display: "block",
};

const brandTextStyle = {
  color: "#176225",
  fontSize: "clamp(20px, 3vw, 32px)",
  fontWeight: "900",
  marginTop: "4px",
  marginBottom: 0,
  textAlign: "center",
};

const rightPanelStyle = {
  flex: 1,
  backgroundColor: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "75px 30px 40px",
  boxSizing: "border-box",
};

const titleStyle = {
  color: "#176225",
  fontSize: "clamp(28px, 4vw, 42px)",
  fontWeight: "900",
  marginTop: 0,
  marginBottom: "28px",
  textAlign: "center",
};

const cardStyle = {
  width: "100%",
  maxWidth: "410px",
  backgroundColor: "#F7F7F7",
  padding: "30px",
  borderRadius: "6px",
  boxShadow: "0 3px 12px rgba(0, 0, 0, 0.12)",
  boxSizing: "border-box",
};

const labelRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "8px",
};

const labelIconStyle = {
  width: "20px",
  height: "20px",
  objectFit: "contain",
  display: "block",
  flexShrink: 0,
};

const labelStyle = {
  color: "#111111",
  fontSize: "11px",
  fontWeight: "900",
  margin: 0,
  lineHeight: 1,
};

const inputWrapperStyle = {
  width: "100%",
  height: "46px",
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  backgroundColor: "#EFEFEF",
  border: "1px solid #DDDDDD",
  borderRadius: "3px",
  boxSizing: "border-box",
};

const inputStyle = {
  flex: 1,
  minWidth: 0,
  height: "100%",
  border: "none",
  backgroundColor: "transparent",
  padding: "0 12px",
  outline: "none",
  color: "#111111",
  fontSize: "13px",
  fontWeight: "600",
  boxSizing: "border-box",
};

const forgotPasswordStyle = {
  display: "block",
  backgroundColor: "transparent",
  border: "none",
  padding: 0,
  marginBottom: "20px",
  color: "#111111",
  fontSize: "10px",
  fontWeight: "900",
  cursor: "pointer",
  textAlign: "left",
};

const loginButtonStyle = {
  display: "block",
  width: "80%",
  height: "42px",
  margin: "0 auto",
  border: "none",
  borderRadius: "2px",
  backgroundColor: "#176225",
  color: "#FFFFFF",
  fontSize: "12px",
  fontWeight: "900",
  cursor: "pointer",
};