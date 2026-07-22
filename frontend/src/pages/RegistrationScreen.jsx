import React, { useState, useEffect } from "react";
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

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

const isPhone = screenWidth <= 768;
const isTablet = screenWidth > 768 && screenWidth <= 1024;
const isDesktop = screenWidth > 1024;

const isMobile = isPhone;

useEffect(() => {
const handleResize = () => setScreenWidth(window.innerWidth);

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


 const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "clamp(10px, 2vw, 20px)",
  fontFamily: "Arial, sans-serif",
};

  const deviceStyle = {
  width: "100%",
  maxWidth: "1400px",
  backgroundColor: "#000",
  border: "3px solid #d9d9d9",
  borderRadius: "24px",
  padding: "clamp(15px, 2vw, 38px)",
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
  width: "100%",
  overflowX: "hidden",
  overflowY: "auto",
  boxSizing: "border-box",
};

 const headerStyle = {
  backgroundColor: "#e4ded3",
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  alignItems: isMobile ? "center" : "flex-start",
  padding: "clamp(12px, 2vw, 22px)",
  boxSizing: "border-box",
  position: "relative",
};

  const logoBoxStyle = {
  width: isMobile ? "100%" : "clamp(140px, 15vw, 175px)",
  textAlign: "center",
  flexShrink: 0,
  marginRight: isMobile ? "0" : "24px",
};

  const logoImageStyle = {
  width: "clamp(70px, 8vw, 98px)",
  height: "clamp(70px, 8vw, 98px)",
  objectFit: "contain",
  display: "block",
  margin: "0 auto 4px auto",
};

  const logoTextStyle = {
  color: "#1f6b2e",
  fontSize: "clamp(20px, 2vw, 28px)",
  fontWeight: "800",
  letterSpacing: "1px",
};

  const titleRowStyle = {
  display: "flex",
  justifyContent: isMobile ? "center" : "flex-start",
  alignItems: "center",
  gap: "18px",
  flexWrap: "wrap",
};

 const backButtonStyle = {
  width: "clamp(38px, 4vw, 42px)",
  height: "clamp(38px, 4vw, 42px)",
  backgroundColor: "#1f6b2e",
  border: "none",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  padding: 0,
};

 const backIconStyle = {
  width: "clamp(20px, 3vw, 26px)",
  height: "clamp(20px, 3vw, 26px)",
  objectFit: "contain",
};

 const titleStyle = {
  margin: 0,
  color: "#1f6b2e",
  fontSize: "clamp(28px, 4vw, 40px)",
  fontWeight: "800",
  letterSpacing: "1px",
  lineHeight: "1",
};

  const introStyle = {
  marginTop: "8px",
  textAlign: isMobile ? "center" : "left",
  fontSize: "clamp(13px, 1.5vw, 15px)",
  lineHeight: "1.4",
  color: "#000",
  maxWidth: "760px",
};

const formWrapperStyle = {
  display: isPhone ? "flex" : "grid",
  flexDirection: isPhone ? "column" : undefined,
  gridTemplateColumns: isPhone ? undefined : "1fr 1fr",
  gap: isPhone ? "20px" : "32px",
  padding: isPhone ? "12px" : "28px 24px",
  boxSizing: "border-box",
};

const leftColumnStyle = {
  paddingRight: isPhone ? "0" : "28px",
  borderRight: isPhone ? "none" : "2px solid #111",
  marginBottom: isPhone ? "0" : "0",
};

 const rightColumnStyle = {
   paddingLeft: isPhone ? "0" : "28px",
};

  const sectionTitleStyle = {
  margin: "0 0 22px 0",
  fontSize: "clamp(18px, 2vw, 22px)",
  fontWeight: "800",
  color: "#000",
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginBottom: "16px",
};

const fieldHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "6px",
};

const addressFieldStyle = {
  display: "grid",
  gridTemplateColumns: isPhone ? "32px 1fr" : "45px 140px 1fr",
  gap: "10px",
  alignItems: "start",
  marginBottom: "16px",
  width: "100%",
};

 const iconStyle = {
  width: isPhone ? "24px" : "45px",
  height: isPhone ? "24px" : "45px",
  objectFit: "contain",
  justifySelf: "center",
};

const labelStyle = {
  fontSize: isPhone ? "14px" : "18px",
  fontWeight: "600",
  color: "#000",
};

const phoneLabelStyle = {
  fontSize: isPhone ? "14px" : "18px",
  fontWeight: "600",
  color: "#000",
  lineHeight: "1.1",
};

const mobileLogoutButtonStyle = {
  position: "absolute",
  top: "15px",
  right: "15px",
  backgroundColor: "#1f6b2e",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "8px 16px",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  height: "42px",
  backgroundColor: "#e2dbcf",
  border: "none",
  outline: "none",
  padding: "0 12px",
  boxSizing: "border-box",
  fontSize: "16px",
  color: "#000",
  borderRadius: "8px",
};

 const textareaStyle = {
  width: "100%",
  minWidth: 0,
  height: "120px",
  backgroundColor: "#e2dbcf",
  border: "none",
  outline: "none",
  padding: "12px",
  boxSizing: "border-box",
  fontSize: "14px",
  resize: "none",
  color: "#000",
  fontFamily: "Arial, sans-serif",
  borderRadius: "8px",
};


const passwordWrapperStyle = {
  width: "100%",
  minWidth: 0,
  flex: 1,
  height: "42px",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#e2dbcf",
  borderRadius: "8px",
  overflow: "hidden",
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
  width: isPhone ? "40px" : "52px",
  height: "42px",
  backgroundColor: "#e2dbcf",
  border: "none",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  flexShrink: 0,
};

  const visibilityIconStyle = {
    width: "34px",
    height: "34px",
    objectFit: "contain",
    display: "block",
  };

const selectWrapperStyle = {
  width: "100%",
  height: "42px",
  position: "relative",
  backgroundColor: "#e2dbcf",
  borderRadius: "8px",
  overflow: "hidden",
  boxSizing: "border-box",
};

 const selectStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: "#e2dbcf",
  border: "none",
  outline: "none",
  padding: "0 40px 0 10px",
  fontSize: "16px",
  boxSizing: "border-box",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
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
  justifyContent: isMobile ? "center" : "flex-end",
  marginTop: "18px",
};

 const registerButtonStyle = {
  width: "clamp(140px, 15vw, 180px)",
  height: "clamp(46px, 5vw, 56px)",
  backgroundColor: "#1f6b2e",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "clamp(15px, 2vw, 18px)",
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
            {isMobile && (
              <button
                type="button"
                style={mobileLogoutButtonStyle}
                onClick={() => navigate("/")}
              >
              <img
                      src={backArrow}
                      alt="Back"
                      style={backIconStyle}
                    />
              </button>

              
            )}

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
                {!isMobile && (
                  <button
                    type="button"
                    style={backButtonStyle}
                    onClick={() => navigate("/")}
                  >
                    <img
                      src={backArrow}
                      alt="Back"
                      style={backIconStyle}
                    />
                  </button>
                )}

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
                <div style={fieldHeaderStyle}>
                  <img src={userIcon} alt="User" style={iconStyle} />
                  <label style={labelStyle}>NAME:</label>
                </div>

                <input
                  type="text"
                  placeholder="Enter name"
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
                <div style={fieldHeaderStyle}>
                  <img src={userIcon} alt="User" style={iconStyle} />
                  <label style={labelStyle}>SURNAME:</label>
                </div>

                <input
                  type="text"
                  placeholder="Enter surname"
                  style={inputStyle}
                />
              </div>

             <div style={fieldStyle}>
                <div style={fieldHeaderStyle}>
                  <img src={emailIcon} alt="Email" style={iconStyle} />
                  <label style={labelStyle}>Email:</label>
                </div>

                <input
                  type="text"
                  placeholder="Enter email"
                  style={inputStyle}
                />
              </div>

               <div style={fieldStyle}>
                <div style={fieldHeaderStyle}>
                  <img src={userIcon} alt="Username" style={iconStyle} />
                  <label style={labelStyle}>USERNAME:</label>
                </div>

                <input
                  type="text"
                  placeholder="Enter username"
                  style={inputStyle}
                />
              </div>

              <div style={fieldStyle}>
              <div style={fieldHeaderStyle}>
                <img src={passwordIcon} alt="Password" style={iconStyle} />
                <label style={labelStyle}>PASSWORD:</label>
              </div>

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
               <h2
                  style={{
                    ...sectionTitleStyle,
                    marginTop: "10px",
                    marginBottom: "12px",
                  }}
                >
                  FARM DETAILS
                </h2>

                {/* TYPE */}
                <div style={fieldStyle}>
                  <div style={fieldHeaderStyle}>
                    <img src={cropsIcon} alt="Farm Type" style={iconStyle} />
                    <label style={labelStyle}>TYPE:</label>
                  </div>

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

                {/* PHONE */}
                <div style={fieldStyle}>
                  <div style={fieldHeaderStyle}>
                    <img src={phoneIcon} alt="Phone" style={iconStyle} />
                    <label style={phoneLabelStyle}>PHONE NUMBER:</label>
                  </div>

                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    style={inputStyle}
                  />
                </div>

                {/* ADDRESS */}
                <div style={fieldStyle}>
                  <div style={fieldHeaderStyle}>
                    <img src={locationIcon} alt="Location" style={iconStyle} />
                    <label style={labelStyle}>ADDRESS:</label>
                  </div>

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

