import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import homeIcon from "../assets/home.png";
import cropelleLogo from "../assets/cropelle-logo.png";
import locationIcon from "../assets/location.png";
import notificationsIcon from "../assets/notifications.png";
import settingsIcon from "../assets/settings.png";
import profileIcon from "../assets/profile.png";

export default function ProfileScreen() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("Getting location...");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const isPhone = screenWidth <= 768;
  const isTablet = screenWidth > 768 && screenWidth <= 1024;
  const isSmallDesktop = screenWidth > 1024 && screenWidth < 1200;

  const emptyProfile = {
    name: "",
    surname: "",
    farmName: "",
    phone: "",
    address: "",
    cropType: "",
    language: "",
  };

  const [formData, setFormData] = useState(() => {
    const savedProfile = localStorage.getItem("cropelleProfile");
    return savedProfile ? JSON.parse(savedProfile) : emptyProfile;
  });

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await response.json();

          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.suburb ||
            "";

          const country = data.address?.country || "";

          setLocation(
            city && country ? `${city}, ${country}` : "Location unavailable"
          );
        } catch (error) {
          console.error("Reverse geocoding error:", error);
          setLocation("Location unavailable");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocation("Location unavailable");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    const saved = localStorage.getItem("cropelleProfile");

    if (saved) {
      setFormData(JSON.parse(saved));
    } else {
      setFormData(emptyProfile);
    }
  };

  const handleSave = () => {
    localStorage.setItem("cropelleProfile", JSON.stringify(formData));
    alert("Profile saved successfully");
  };

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "clamp(8px, 2vw, 20px)",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  };

  const deviceStyle = {
    width: "100%",
    maxWidth: "1400px",
    backgroundColor: "#000",
    border: "3px solid #d9d9d9",
    borderRadius: "24px",
    padding: isPhone ? "8px" : "clamp(15px, 2vw, 38px)",
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
    height: isPhone ? "calc(100vh - 34px)" : "670px",
    minHeight: isPhone ? "560px" : "670px",
    backgroundColor: "#fff",
    border: "2px solid #222",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: "12px",
    position: "relative",
    boxSizing: "border-box",
  };

  const sidebarStyle = {
    width: isTablet
      ? "clamp(185px, 24vw, 220px)"
      : "clamp(210px, 22vw, 280px)",
    backgroundColor: "#f0ece3",
    padding: isTablet ? "14px" : "clamp(14px, 2vw, 25px)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  };

  const logoStyle = {
    width: isTablet ? "78px" : "clamp(80px, 8vw, 145px)",
    height: isTablet ? "78px" : "clamp(80px, 8vw, 145px)",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
  };

  const logoTextStyle = {
    color: "#176225",
    fontSize: isTablet ? "20px" : "clamp(22px, 3vw, 36px)",
    fontWeight: "900",
    textAlign: "center",
    marginBottom: isTablet ? "22px" : "28px",
  };

  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: isTablet ? "10px" : "clamp(12px, 2vw, 20px)",
    marginBottom: isTablet ? "28px" : "clamp(28px, 5vw, 55px)",
    cursor: "pointer",
    padding: isTablet ? "8px" : "10px",
    borderRadius: "14px",
    boxSizing: "border-box",
  };

  const menuIconStyle = {
    width: isTablet ? "32px" : "clamp(38px, 5vw, 58px)",
    height: isTablet ? "32px" : "clamp(38px, 5vw, 58px)",
    objectFit: "contain",
    flexShrink: 0,
  };

  const menuTextStyle = {
    fontSize: isTablet ? "12px" : "clamp(14px, 2vw, 20px)",
    fontWeight: "800",
    color: "#000",
    whiteSpace: "nowrap",
  };

  const sidebarLocationTextStyle = {
    fontSize: isTablet ? "10px" : "12px",
    color: "#555",
    fontWeight: "600",
    maxWidth: isTablet ? "130px" : "190px",
    wordBreak: "break-word",
  };

  const contentStyle = {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: isPhone ? "10px 14px 64px 14px" : "clamp(20px, 2vw, 30px)",
    position: "relative",
    boxSizing: "border-box",
    overflow: "hidden",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  };

  const topContentStyle = {
    flexShrink: 0,
  };

  const profileContentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    overflowY: "auto",
    paddingRight: isPhone ? "0px" : "4px",
  };

  const homeButtonStyle = {
    position: "absolute",
    top: isPhone ? "10px" : "20px",
    right: isPhone ? "10px" : "20px",
    width: isPhone ? "38px" : isTablet ? "48px" : "clamp(55px, 6vw, 75px)",
    height: isPhone ? "38px" : isTablet ? "48px" : "clamp(55px, 6vw, 75px)",
    backgroundColor: "#176225",
    border: "none",
    borderRadius: isPhone ? "12px" : "16px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  };

  const homeIconStyle = {
    width: isPhone ? "22px" : isTablet ? "28px" : "clamp(35px, 5vw, 45px)",
    height: isPhone ? "22px" : isTablet ? "28px" : "clamp(35px, 5vw, 45px)",
    objectFit: "contain",
  };

  const titleStyle = {
    color: "#176225",
    fontSize: isPhone
      ? "clamp(22px, 6vw, 28px)"
      : isTablet
      ? "clamp(30px, 4vw, 40px)"
      : isSmallDesktop
      ? "clamp(34px, 4vw, 44px)"
      : "clamp(42px, 5vw, 58px)",
    fontWeight: "900",
    lineHeight: "1.05",
    margin: 0,
    paddingRight: isPhone ? "48px" : "85px",
    maxWidth: "100%",
    overflowWrap: "break-word",
    boxSizing: "border-box",
  };

  const subtitleStyle = {
    color: "#176225",
    fontSize: isPhone
      ? "clamp(10px, 3vw, 13px)"
      : isTablet
      ? "clamp(13px, 2vw, 16px)"
      : "clamp(16px, 2vw, 22px)",
    fontWeight: "900",
    marginTop: isPhone ? "4px" : "8px",
    marginBottom: isPhone ? "8px" : isTablet ? "16px" : "24px",
  };

  const locationRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: isPhone ? "8px" : "18px",
    flexWrap: "wrap",
    maxWidth: "100%",
  };

  const locationSmallIconStyle = {
    width: isPhone ? "15px" : "18px",
    height: isPhone ? "15px" : "18px",
    objectFit: "contain",
    flexShrink: 0,
  };

  const locationTextStyle = {
    fontSize: isPhone ? "11px" : "13px",
    fontWeight: "700",
    color: "#555",
    wordBreak: "break-word",
  };

  const profileGridStyle = {
    display: "grid",
    gridTemplateColumns:
      isPhone || isTablet || isSmallDesktop ? "1fr" : "1fr 1fr",
    columnGap: isPhone ? "0px" : isTablet ? "0px" : "45px",
    rowGap: isPhone ? "8px" : isTablet ? "14px" : "20px",
    width: "100%",
  };

  const sectionStyle = {
    minWidth: 0,
    width: "100%",
  };

  const sectionTitleStyle = {
    fontSize: isPhone ? "13px" : isTablet ? "16px" : "20px",
    fontWeight: "900",
    marginBottom: isPhone ? "8px" : isTablet ? "12px" : "18px",
    color: "#000",
    lineHeight: "1.1",
  };

  const fieldRowStyle = {
    display: "grid",
    gridTemplateColumns:
      isPhone || isTablet || isSmallDesktop ? "1fr" : "115px 1fr",
    rowGap: isPhone || isTablet || isSmallDesktop ? "5px" : "0",
    columnGap: isPhone || isTablet || isSmallDesktop ? "0px" : "12px",
    alignItems: "center",
    marginBottom: isPhone ? "10px" : isTablet ? "12px" : "18px",
    width: "100%",
  };

  const labelStyle = {
    fontSize: isPhone ? "11px" : isTablet ? "12px" : "13px",
    fontWeight: "800",
    color: "#000",
    whiteSpace: "normal",
    marginBottom: isPhone || isTablet || isSmallDesktop ? "3px" : 0,
  };

  const inputStyle = {
    width: "100%",
    height: isPhone ? "32px" : isTablet ? "34px" : "38px",
    backgroundColor: "#ece8df",
    border: "1px solid #ddd",
    padding: "0 10px",
    boxSizing: "border-box",
    fontSize: isPhone ? "12px" : isTablet ? "13px" : "14px",
    borderRadius: "4px",
    minWidth: 0,
  };

  const dividerStyle = {
    margin: isPhone ? "10px 0" : isTablet ? "16px 0" : "24px 0",
    border: "none",
    borderTop: "2px solid #333",
    width: "100%",
  };

  const actionButtonContainerStyle = {
    display: "flex",
    flexDirection: "row",
    gap: isPhone ? "12px" : "20px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: isPhone ? "10px" : "0px",
    flexShrink: 0,
  };

  const actionButtonStyle = {
    backgroundColor: "#176225",
    color: "#fff",
    border: "none",
    width: isPhone ? "105px" : isTablet ? "135px" : "180px",
    height: isPhone ? "34px" : isTablet ? "40px" : "50px",
    fontSize: isPhone ? "13px" : isTablet ? "15px" : "20px",
    fontWeight: "900",
    cursor: "pointer",
    borderRadius: "9px",
  };

  const bottomNavStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "55px",
    backgroundColor: "#f0ece3",
    borderTop: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 1000,
    padding: "5px 8px",
    boxSizing: "border-box",
  };

  const bottomNavButtonStyle = {
    width: "38px",
    height: "38px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    flexShrink: 0,
  };

  const bottomNavIconStyle = {
    width: "24px",
    height: "24px",
    objectFit: "contain",
  };

  const bottomNavLogoStyle = {
    width: "34px",
    height: "34px",
    objectFit: "contain",
    flexShrink: 0,
  };

  return (
    <div style={pageStyle}>
      <div style={deviceStyle}>
        <div style={cameraStyle}></div>

        <div style={screenStyle}>
          {!isPhone && (
            <div style={sidebarStyle}>
              <img src={cropelleLogo} alt="Cropelle Logo" style={logoStyle} />

              <div style={logoTextStyle}>CROPELLE</div>

              <div style={menuItemStyle}>
                <img src={locationIcon} alt="Location" style={menuIconStyle} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    lineHeight: "1.2",
                    minWidth: 0,
                  }}
                >
                  <span style={menuTextStyle}>LOCATION</span>
                  <span style={sidebarLocationTextStyle}>{location}</span>
                </div>
              </div>

              <div
                style={menuItemStyle}
                onClick={() => navigate("/notifications")}
              >
                <img
                  src={notificationsIcon}
                  alt="Notifications"
                  style={menuIconStyle}
                />
                <span style={menuTextStyle}>NOTIFICATIONS</span>
              </div>

              <div style={menuItemStyle} onClick={() => navigate("/settings")}>
                <img src={settingsIcon} alt="Settings" style={menuIconStyle} />
                <span style={menuTextStyle}>SETTINGS</span>
              </div>

              <div style={menuItemStyle} onClick={() => navigate("/profile")}>
                <img src={profileIcon} alt="Profile" style={menuIconStyle} />
                <span style={menuTextStyle}>PROFILE</span>
              </div>
            </div>
          )}

          <div style={contentStyle}>
            <div style={topContentStyle}>
              <button
                type="button"
                style={homeButtonStyle}
                onClick={() => navigate("/dashboard")}
              >
                <img src={homeIcon} alt="Home" style={homeIconStyle} />
              </button>

              <h1 style={titleStyle}>PROFILE</h1>

              <div style={subtitleStyle}>DASHBOARD / PROFILE</div>

              {isPhone && (
                <div style={locationRowStyle}>
                  <img
                    src={locationIcon}
                    alt="Location"
                    style={locationSmallIconStyle}
                  />

                  <span style={locationTextStyle}>{location}</span>
                </div>
              )}
            </div>

            <div style={profileContentStyle}>
              <div style={profileGridStyle}>
                <div style={sectionStyle}>
                  <div style={sectionTitleStyle}>PERSONAL DETAILS:</div>

                  <div style={fieldRowStyle}>
                    <label style={labelStyle}>NAME:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>

                  <div style={fieldRowStyle}>
                    <label style={labelStyle}>SURNAME:</label>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={sectionStyle}>
                  <div style={sectionTitleStyle}>FARM DETAILS:</div>

                  <div style={fieldRowStyle}>
                    <label style={labelStyle}>FARM NAME:</label>
                    <input
                      type="text"
                      name="farmName"
                      value={formData.farmName}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              <hr style={dividerStyle} />

              <div style={profileGridStyle}>
                <div style={sectionStyle}>
                  <div style={fieldRowStyle}>
                    <label style={labelStyle}>PHONE NUMBER:</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>

                  <div style={fieldRowStyle}>
                    <label style={labelStyle}>ADDRESS:</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={sectionStyle}>
                  <div style={fieldRowStyle}>
                    <label style={labelStyle}>TYPES OF CROPS:</label>
                    <select
                      name="cropType"
                      value={formData.cropType}
                      onChange={handleChange}
                      style={inputStyle}
                    >
                      <option value="">Select Crop</option>
                      <option value="Maize">Maize</option>
                      <option value="Wheat">Wheat</option>
                      <option value="Soybeans">Soybeans</option>
                    </select>
                  </div>

                  <div style={fieldRowStyle}>
                    <label style={labelStyle}>LANGUAGE:</label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      style={inputStyle}
                    >
                      <option value="">Select Language</option>
                      <option value="English">English</option>
                      <option value="Afrikaans">Afrikaans</option>
                      <option value="Zulu">Zulu</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={actionButtonContainerStyle}>
                <button
                  type="button"
                  style={actionButtonStyle}
                  onClick={handleSave}
                >
                  SAVE
                </button>

                <button
                  type="button"
                  style={actionButtonStyle}
                  onClick={handleCancel}
                >
                  CANCEL
                </button>
              </div>
            </div>

            {isPhone && (
              <div style={bottomNavStyle}>
                <img
                  src={cropelleLogo}
                  alt="Cropelle"
                  style={bottomNavLogoStyle}
                />

                <button
                  type="button"
                  style={bottomNavButtonStyle}
                  onClick={() => navigate("/notifications")}
                >
                  <img
                    src={notificationsIcon}
                    alt="Notifications"
                    style={bottomNavIconStyle}
                  />
                </button>

                <button
                  type="button"
                  style={bottomNavButtonStyle}
                  onClick={() => navigate("/settings")}
                >
                  <img
                    src={settingsIcon}
                    alt="Settings"
                    style={bottomNavIconStyle}
                  />
                </button>

                <button
                  type="button"
                  style={bottomNavButtonStyle}
                  onClick={() => navigate("/profile")}
                >
                  <img
                    src={profileIcon}
                    alt="Profile"
                    style={bottomNavIconStyle}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}