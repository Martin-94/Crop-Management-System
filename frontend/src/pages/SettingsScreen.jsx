import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import homeIcon from "../assets/home.png";
import cropelleLogo from "../assets/cropelle-logo.png";
import locationIcon from "../assets/location.png";
import notificationsIcon from "../assets/notifications.png";
import settingsIcon from "../assets/settings.png";
import profileIcon from "../assets/profile.png";
import dataUsageIcon from "../assets/datausage.png";

export default function SettingsScreen() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("Getting location...");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const isPhone = screenWidth <= 768;
  const isTablet = screenWidth > 768 && screenWidth <= 1024;

  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [pestAlerts, setPestAlerts] = useState(true);
  const [waterAlerts, setWaterAlerts] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [lowDataUsage, setLowDataUsage] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem("cropelleSettings");

    if (savedSettings) {
      const settings = JSON.parse(savedSettings);

      setWeatherAlerts(settings.weatherAlerts ?? true);
      setPestAlerts(settings.pestAlerts ?? true);
      setWaterAlerts(settings.waterAlerts ?? true);
      setOfflineMode(settings.offlineMode ?? false);
      setLowDataUsage(settings.lowDataUsage ?? false);
    }
  }, []);

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

  const handleSave = () => {
    const settings = {
      weatherAlerts,
      pestAlerts,
      waterAlerts,
      offlineMode,
      lowDataUsage,
    };

    localStorage.setItem("cropelleSettings", JSON.stringify(settings));
    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate("/dashboard");
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
    width: isTablet ? "clamp(220px, 28vw, 300px)" : "clamp(240px, 25vw, 340px)",
    backgroundColor: "#f0ece3",
    padding: "clamp(12px, 2vw, 25px)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
  };

  const logoStyle = {
    width: "clamp(80px, 8vw, 145px)",
    height: "clamp(80px, 8vw, 145px)",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
  };

  const logoTextStyle = {
    color: "#176225",
    fontSize: "clamp(22px, 3vw, 36px)",
    fontWeight: "900",
    textAlign: "center",
    marginBottom: "28px",
  };

  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "clamp(12px, 2vw, 20px)",
    marginBottom: "clamp(28px, 5vw, 55px)",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "14px",
    boxSizing: "border-box",
  };

  const menuIconStyle = {
    width: "clamp(38px, 5vw, 58px)",
    height: "clamp(38px, 5vw, 58px)",
    objectFit: "contain",
    flexShrink: 0,
  };

  const menuTextStyle = {
    fontSize: "clamp(14px, 2vw, 20px)",
    fontWeight: "800",
    color: "#000",
    whiteSpace: "nowrap",
  };

  const sidebarLocationTextStyle = {
    fontSize: "12px",
    color: "#555",
    fontWeight: "600",
    maxWidth: "190px",
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

  const settingsContentStyle = {
    flexShrink: 0,
  };

  const homeButtonStyle = {
    position: "absolute",
    top: isPhone ? "10px" : "20px",
    right: isPhone ? "10px" : "20px",
    width: isPhone ? "38px" : "clamp(55px, 6vw, 75px)",
    height: isPhone ? "38px" : "clamp(55px, 6vw, 75px)",
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
    width: isPhone ? "22px" : "clamp(35px, 5vw, 45px)",
    height: isPhone ? "22px" : "clamp(35px, 5vw, 45px)",
    objectFit: "contain",
  };

  const titleStyle = {
    color: "#176225",
    fontSize: isPhone
      ? "clamp(22px, 6vw, 28px)"
      : isTablet
      ? "clamp(34px, 4vw, 48px)"
      : "clamp(48px, 5vw, 58px)",
    fontWeight: "900",
    lineHeight: "1.05",
    margin: 0,
    paddingRight: isPhone ? "48px" : "95px",
    maxWidth: "100%",
    overflowWrap: "break-word",
    boxSizing: "border-box",
  };

  const subtitleStyle = {
    color: "#176225",
    fontSize: isPhone
      ? "clamp(10px, 3vw, 13px)"
      : isTablet
      ? "clamp(16px, 2vw, 20px)"
      : "clamp(18px, 2vw, 24px)",
    fontWeight: "900",
    marginTop: isPhone ? "4px" : "8px",
    marginBottom: isPhone ? "2px" : "28px",
  };

  const locationRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: isPhone ? "4px" : "18px",
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

  const sectionTitleStyle = {
    display: "flex",
    alignItems: "center",
    gap: isPhone ? "8px" : "15px",
    fontSize: isPhone ? "15px" : isTablet ? "20px" : "24px",
    fontWeight: "900",
    color: "#000",
    marginBottom: isPhone ? "9px" : "22px",
  };

  const sectionIconStyle = {
    width: isPhone ? "22px" : "34px",
    height: isPhone ? "22px" : "34px",
    objectFit: "contain",
    flexShrink: 0,
  };

  const settingRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: isPhone ? "8px" : "18px",
    fontSize: isPhone ? "12px" : isTablet ? "16px" : "20px",
    fontWeight: "800",
    color: "#000",
    gap: "10px",
  };

  const dividerStyle = {
    margin: isPhone ? "12px 0" : "28px 0",
    border: "none",
    borderTop: "2px solid #333",
  };

  const actionButtonContainerStyle = {
    display: "flex",
    flexDirection: "row",
    gap: isPhone ? "12px" : "20px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: isPhone ? "8px" : "48px",
    flexShrink: 0,
  };

  const actionButtonStyle = {
    backgroundColor: "#176225",
    color: "#fff",
    border: "none",
    width: isPhone ? "105px" : "180px",
    height: isPhone ? "34px" : "50px",
    fontSize: isPhone ? "13px" : "20px",
    fontWeight: "900",
    cursor: "pointer",
    borderRadius: "9px",
  };

  const getToggleContainerStyle = (active) => ({
    width: isPhone ? "38px" : "48px",
    height: isPhone ? "20px" : "24px",
    backgroundColor: active ? "#176225" : "#999",
    borderRadius: "20px",
    cursor: "pointer",
    position: "relative",
    transition: "0.2s ease",
    flexShrink: 0,
  });

  const getToggleCircleStyle = (active) => ({
    width: isPhone ? "14px" : "18px",
    height: isPhone ? "14px" : "18px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    position: "absolute",
    top: isPhone ? "3px" : "3px",
    left: active ? (isPhone ? "21px" : "27px") : "3px",
    transition: "0.2s ease",
  });

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

              <h1 style={titleStyle}>SETTINGS</h1>

              <div style={subtitleStyle}>DASHBOARD / SETTINGS</div>

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

            <div style={settingsContentStyle}>
              <div style={sectionTitleStyle}>
                <img
                  src={notificationsIcon}
                  alt="Notifications"
                  style={sectionIconStyle}
                />
                <span>NOTIFICATIONS</span>
              </div>

              <div style={settingRowStyle}>
                <span>WEATHER ALERTS</span>

                <div
                  style={getToggleContainerStyle(weatherAlerts)}
                  onClick={() => setWeatherAlerts(!weatherAlerts)}
                >
                  <div style={getToggleCircleStyle(weatherAlerts)} />
                </div>
              </div>

              <div style={settingRowStyle}>
                <span>PEST ALERTS</span>

                <div
                  style={getToggleContainerStyle(pestAlerts)}
                  onClick={() => setPestAlerts(!pestAlerts)}
                >
                  <div style={getToggleCircleStyle(pestAlerts)} />
                </div>
              </div>

              <div style={settingRowStyle}>
                <span>WATER ALERTS</span>

                <div
                  style={getToggleContainerStyle(waterAlerts)}
                  onClick={() => setWaterAlerts(!waterAlerts)}
                >
                  <div style={getToggleCircleStyle(waterAlerts)} />
                </div>
              </div>

              <hr style={dividerStyle} />

              <div style={sectionTitleStyle}>
                <img
                  src={dataUsageIcon}
                  alt="Data Usage"
                  style={sectionIconStyle}
                />
                <span>DATA USAGE</span>
              </div>

              <div style={settingRowStyle}>
                <span>OFFLINE MODE</span>

                <div
                  style={getToggleContainerStyle(offlineMode)}
                  onClick={() => setOfflineMode(!offlineMode)}
                >
                  <div style={getToggleCircleStyle(offlineMode)} />
                </div>
              </div>

              <div style={settingRowStyle}>
                <span>LOW DATA USAGE</span>

                <div
                  style={getToggleContainerStyle(lowDataUsage)}
                  onClick={() => setLowDataUsage(!lowDataUsage)}
                >
                  <div style={getToggleCircleStyle(lowDataUsage)} />
                </div>
              </div>
            </div>

            <div
                style={{
                  ...actionButtonContainerStyle,
                  marginTop: "auto",
                  paddingTop: isPhone ? "10px" : "0px",
                }}
              >

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