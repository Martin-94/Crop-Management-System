import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import backArrow from "../assets/backarrow.png";
import cropelleLogo from "../assets/cropelle-logo.png";
import userIcon from "../assets/user.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import cropsIcon from "../assets/crops.png";
import dropdownIcon from "../assets/dropdown.png";
import phoneIcon from "../assets/phone.png";
import locationIcon from "../assets/location.png";
import visibilityIcon from "../assets/visablity.png";

export default function RegistrationScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const deviceStyle = {
    width: "100%",
    maxWidth: "1180px",
    backgroundColor: "#000",
    border: "3px solid #d9d9d9",
    borderRadius: "24px",
    padding: "34px 38px",
    boxSizing: "border-box",
    position: "relative",
  };

  const cameraStyle = {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#061d1f",
    border: "2px solid #111",
    position: "absolute",
    top: "16px",
    left: "50%",
    transform: "translateX(-50%)",
  };

  const screenStyle = {
    backgroundColor: "#f4f4f4",
    border: "2px solid #222",
    minHeight: "620px",
    boxSizing: "border-box",
  };

  const headerStyle = {
    backgroundColor: "#e4ded3",
    display: "flex",
    alignItems: "flex-start",
    padding: "14px 22px 10px 22px",
    boxSizing: "border-box",
  };

  const logoBoxStyle = {
    width: "175px",
    textAlign: "center",
    flexShrink: 0,
    marginRight: "24px",
  };

  const logoImageStyle = {
    width: "98px",
    height: "98px",
    objectFit: "contain",
    display: "block",
    margin: "0 auto 4px auto",
  };

  const logoTextStyle = {
    color: "#1f6b2e",
    fontSize: "28px",
    fontWeight: "800",
    letterSpacing: "1px",
  };

  const titleRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  };

  const backButtonStyle = {
    width: "42px",
    height: "38px",
    backgroundColor: "#1f6b2e",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    padding: 0,
  };

  const backIconStyle = {
    width: "26px",
    height: "26px",
    objectFit: "contain",
  };

  const titleStyle = {
    margin: 0,
    color: "#1f6b2e",
    fontSize: "40px",
    fontWeight: "800",
    letterSpacing: "1px",
    lineHeight: "1",
  };

  const introStyle = {
    marginTop: "8px",
    fontSize: "15px",
    lineHeight: "1.15",
    color: "#000",
    maxWidth: "760px",
  };

  const formWrapperStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    padding: "28px 24px 4px 24px",
    boxSizing: "border-box",
  };

  const leftColumnStyle = {
    paddingRight: "28px",
    borderRight: "2px solid #111",
  };

  const rightColumnStyle = {
    paddingLeft: "28px",
  };

  const sectionTitleStyle = {
    margin: "0 0 22px 0",
    fontSize: "19px",
    fontWeight: "800",
    color: "#000",
  };

  const fieldStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "13px",
  };

  const addressFieldStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "13px",
  };

  const iconStyle = {
    width: "45px",
    height: "45px",
    objectFit: "contain",
    flexShrink: 0,
  };

  const labelStyle = {
    width: "105px",
    fontSize: "18px",
    fontWeight: "500",
    color: "#000",
  };

  const phoneLabelStyle = {
    width: "105px",
    fontSize: "18px",
    fontWeight: "500",
    color: "#000",
    lineHeight: "1.05",
  };

  const inputStyle = {
    flex: 1,
    height: "42px",
    backgroundColor: "#e2dbcf",
    border: "none",
    outline: "none",
    padding: "0 10px",
    boxSizing: "border-box",
    fontSize: "15px",
    color: "#000",
  };

  const textareaStyle = {
    flex: 1,
    height: "86px",
    backgroundColor: "#e2dbcf",
    border: "none",
    outline: "none",
    padding: "10px",
    boxSizing: "border-box",
    fontSize: "15px",
    resize: "none",
    color: "#000",
    fontFamily: "Arial, sans-serif",
  };

  const passwordWrapperStyle = {
    flex: 1,
    height: "42px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e2dbcf",
  };

  const passwordInputStyle = {
    flex: 1,
    height: "42px",
    backgroundColor: "#e2dbcf",
    border: "none",
    outline: "none",
    padding: "0 10px",
    boxSizing: "border-box",
    fontSize: "15px",
    color: "#000",

    /*
      IMPORTANT:
      We keep this as type="text" and hide/show using WebkitTextSecurity.
      This prevents the browser's default password eye icon from appearing.
    */
    WebkitTextSecurity: showPassword ? "none" : "disc",
  };

  const visibilityButtonStyle = {
    width: "52px",
    height: "42px",
    backgroundColor: "#e2dbcf",
    border: "none",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  };

  const visibilityIconStyle = {
    width: "34px",
    height: "34px",
    objectFit: "contain",
    display: "block",
  };

  const selectWrapperStyle = {
    flex: 1,
    height: "42px",
    position: "relative",
    backgroundColor: "#e2dbcf",
  };

  const selectStyle = {
    width: "100%",
    height: "42px",
    backgroundColor: "#e2dbcf",
    border: "none",
    outline: "none",
    padding: "0 45px 0 10px",
    boxSizing: "border-box",
    fontSize: "15px",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    cursor: "pointer",
  };

  const dropdownIconStyle = {
    width: "26px",
    height: "26px",
    objectFit: "contain",
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  };

  const registerButtonWrapperStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "18px",
  };

  const registerButtonStyle = {
    width: "150px",
    height: "46px",
    backgroundColor: "#1f6b2e",
    color: "#fff",
    border: "none",
    fontSize: "17px",
    fontWeight: "800",
    cursor: "pointer",
  };

  return (
    <div style={pageStyle}>
      <div style={deviceStyle}>
        <div style={cameraStyle}></div>

        <div style={screenStyle}>
          {/* HEADER */}
          <div style={headerStyle}>
            <div style={logoBoxStyle}>
              <img
                src={cropelleLogo}
                alt="Cropelle Logo"
                style={logoImageStyle}
              />
              <div style={logoTextStyle}>CROPELLE</div>
            </div>

            <div style={{ flex: 1 }}>
              <div style={titleRowStyle}>
                <button
                  type="button"
                  style={backButtonStyle}
                  onClick={() => navigate("/")}
                >
                  <img src={backArrow} alt="Back" style={backIconStyle} />
                </button>

                <h1 style={titleStyle}>REGISTRATION</h1>
              </div>

              <div style={introStyle}>
                Join Us 🌱
                <br />
                Create your account and become part of a growing community.
                <br />
                Set up your profile, explore opportunities, and connect with
                others in a simple and seamless way.
                <br />
                Let's help you get started and make the most of what we offer.
              </div>
            </div>
          </div>

          {/* FORM */}
          <div style={formWrapperStyle}>
            {/* LEFT SIDE */}
            <div style={leftColumnStyle}>
              <h2 style={sectionTitleStyle}>PERSONAL DETAILS</h2>

              <div style={fieldStyle}>
                <img src={userIcon} alt="User" style={iconStyle} />
                <label style={labelStyle}>NAME:</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <img src={userIcon} alt="User" style={iconStyle} />
                <label style={labelStyle}>SURNAME:</label>
                <input
                  type="text"
                  placeholder="Enter surname"
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <img src={emailIcon} alt="Email" style={iconStyle} />
                <label style={labelStyle}>EMAIL:</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <img src={userIcon} alt="Username" style={iconStyle} />
                <label style={labelStyle}>USERNAME:</label>
                <input
                  type="text"
                  placeholder="Choose username"
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <img src={passwordIcon} alt="Password" style={iconStyle} />
                <label style={labelStyle}>PASSWORD:</label>

                <div style={passwordWrapperStyle}>
                  <input
                    type="text"
                    placeholder="Enter password"
                    autoComplete="new-password"
                    style={passwordInputStyle}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={visibilityButtonStyle}
                  >
                    <img
                      src={visibilityIcon}
                      alt="Visibility"
                      style={visibilityIconStyle}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div style={rightColumnStyle}>
              <h2 style={sectionTitleStyle}>FARM DETAILS</h2>

              <div style={fieldStyle}>
                <img src={cropsIcon} alt="Farm Type" style={iconStyle} />
                <label style={labelStyle}>TYPE:</label>

                <div style={selectWrapperStyle}>
                  <select style={selectStyle} defaultValue="">
                    <option value="" disabled>
                      Select farm type
                    </option>
                    <option value="crop">Crop Farming</option>
                    <option value="livestock">Livestock Farming</option>
                    <option value="mixed">Mixed Farming</option>
                  </select>

                  <img
                    src={dropdownIcon}
                    alt="Dropdown"
                    style={dropdownIconStyle}
                  />
                </div>
              </div>

              <div style={fieldStyle}>
                <img src={phoneIcon} alt="Phone" style={iconStyle} />
                <label style={phoneLabelStyle}>
                  PHONE
                  <br />
                  NUMBER:
                </label>

                <input
                  type="tel"
                  placeholder="Enter phone number"
                  style={inputStyle}
                />
              </div>

              <div style={addressFieldStyle}>
                <img src={locationIcon} alt="Location" style={iconStyle} />
                <label style={labelStyle}>ADDRESS:</label>

                <textarea
                  placeholder="Enter farm address"
                  style={textareaStyle}
                />
              </div>

              <div style={registerButtonWrapperStyle}>
                <button
                  type="button"
                  style={registerButtonStyle}
                  onClick={() => navigate("/login")}
                >
                  REGISTER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

