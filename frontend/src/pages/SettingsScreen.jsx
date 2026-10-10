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
            city && country
              ? `${city}, ${country}`
              : "Location unavailable"
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

  localStorage.setItem(
    "cropelleSettings",
    JSON.stringify(settings)
  );

  navigate("/dashboard");
};

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
    height: "670px",
    backgroundColor: "#fff",
    border: "2px solid #222",
    display: "flex",
    overflow: "hidden",
  };

  const sidebarStyle = {
    width: "340px",
    backgroundColor: "#f0ece3",
    padding: "12px 25px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  };

  const logoStyle = {
    width: "145px",
    height: "145px",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
  };

  const logoTextStyle = {
    color: "#176225",
    fontSize: "36px",
    fontWeight: "900",
    textAlign: "center",
    marginBottom: "28px",
  };

  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "55px",
    cursor: "pointer",
  };

  const menuIconStyle = {
    width: "58px",
    height: "58px",
    objectFit: "contain",
  };

  const menuTextStyle = {
    fontSize: "20px",
    fontWeight: "800",
    color: "#000",
    whiteSpace: "nowrap",
  };

  const contentStyle = {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: "20px 25px",
    position: "relative",
    boxSizing: "border-box",
  };

  const homeButtonStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    width: "75px",
    height: "75px",
    backgroundColor: "#176225",
    border: "none",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const homeIconStyle = {
    width: "45px",
    height: "45px",
    objectFit: "contain",
  };

  const titleStyle = {
    color: "#176225",
    fontSize: "58px",
    fontWeight: "900",
    lineHeight: "1",
    margin: 0,
  };

  const subtitleStyle = {
    color: "#176225",
    fontSize: "24px",
    fontWeight: "900",
    marginBottom: "38px",
  };

  const sectionTitleStyle = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    fontSize: "24px",
    fontWeight: "900",
    color: "#000",
    marginBottom: "22px",
  };

  const sectionIconStyle = {
    width: "34px",
    height: "34px",
    objectFit: "contain",
  };

  const settingRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
    fontSize: "20px",
    fontWeight: "800",
    color: "#000",
  };

  const dividerStyle = {
    margin: "28px 0",
    border: "none",
    borderTop: "2px solid #333",
  };

  const actionButtonStyle = {
    backgroundColor: "#176225",
    color: "#fff",
    border: "none",
    width: "180px",
    height: "50px",
    fontSize: "20px",
    fontWeight: "900",
    cursor: "pointer",
  };

const getToggleContainerStyle = (active) => ({
  width: "48px",
  height: "24px",
  backgroundColor: active ? "#176225" : "#999",
  borderRadius: "20px",
  cursor: "pointer",
  position: "relative",
  transition: "0.2s ease",
});

  const getToggleCircleStyle = (active) => ({
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    position: "absolute",
    top: "3px",
    left: active ? "27px" : "3px",
    transition: "0.2s ease",
  });

  return (
    <div style={pageStyle}>
      <div style={deviceStyle}>
        <div style={cameraStyle}></div>

        <div style={screenStyle}>
          {/* Sidebar */}
          <div style={sidebarStyle}>
            <img src={cropelleLogo} alt="Cropelle Logo" style={logoStyle} />

            <div style={logoTextStyle}>CROPELLE</div>

            {/* Location navigation item */}
            <div style={menuItemStyle}>
              <img
                src={locationIcon}
                alt="Location"
                style={menuIconStyle}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "1.2",
                }}
              >
                <span style={menuTextStyle}>LOCATION</span>

                <span
                  style={{
                    fontSize: "12px",
                    color: "#555",
                    fontWeight: "600",
                    maxWidth: "190px",
                    wordBreak: "break-word",
                  }}
                >
                  {location}
                </span>
              </div>
            </div>

            {/* Notifications navigation item */}
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

            {/* Settings navigation item */}
            <div
              style={menuItemStyle}
              onClick={() => navigate("/settings")}
            >
              <img
                src={settingsIcon}
                alt="Settings"
                style={menuIconStyle}
              />
              <span style={menuTextStyle}>SETTINGS</span>
            </div>

            {/* Profile navigation item */}
            <div
              style={menuItemStyle}
              onClick={() => navigate("/profile")}
            >
              <img
                src={profileIcon}
                alt="Profile"
                style={menuIconStyle}
              />
              <span style={menuTextStyle}>PROFILE</span>
            </div>
          </div>

          {/* Main Content */}
          <div style={contentStyle}>
            <button
              type="button"
              style={homeButtonStyle}
              onClick={() => navigate("/dashboard")}
            >
              <img src={homeIcon} alt="Home" style={homeIconStyle} />
            </button>

            <h1 style={titleStyle}>SETTINGS</h1>

            <div style={subtitleStyle}>DASHBOARD / SETTINGS</div>

            {/* Notifications Settings */}
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

            {/* Data Usage Settings */}
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

            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                marginTop: "48px",
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
                onClick={() => navigate("/dashboard")}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}