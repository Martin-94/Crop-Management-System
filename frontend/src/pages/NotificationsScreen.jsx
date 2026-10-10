import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import homeIcon from "../assets/home.png";
import cropelleLogo from "../assets/cropelle-logo.png";
import locationIcon from "../assets/location.png";
import notificationsIcon from "../assets/notifications.png";
import settingsIcon from "../assets/settings.png";
import profileIcon from "../assets/profile.png";

export default function NotificationsScreen() {
  const navigate = useNavigate();

const [location, setLocation] = useState("Getting location...");

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
        console.error(error);
        setLocation("Location unavailable");
      }
    },
    (error) => {
      console.error(error);
      setLocation("Location unavailable");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
}, []);


  const notifications = [
  "Weather alert: Heavy rain expected tomorrow.",
  "Field A maize moisture level is low.",
  "Fertiliser reminder for Crop Block B.",
  "Expense record has been updated.",
  "Income record has been added.",
  "Notification 6",
  "Notification 7",
  "Notification 8",
  "Notification 9",
  "Notification 10",
  "Notification 11",
  "Notification 12",
  "Notification 13",
  "Notification 14",
  "Notification 15",
  "Notification 16",
  "Notification 17",
  "Notification 18",
  "Notification 19",
  "Notification 20",
];

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

const homeIconStyle = {
  width: "45px",
  height: "45px",
  objectFit: "contain",
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
    position: "relative",
    padding: "22px 30px",
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
    marginBottom: "70px",
  };

  const introTextStyle = {
    fontSize: "18px",
    fontWeight: "800",
    lineHeight: "1.2",
    color: "#000",
    marginBottom: "40px",
  };

  const notificationAreaStyle = {
    height: "280px",
    overflowY: "auto",
    paddingRight: "15px",
  };

  const notificationStyle = {
    marginBottom: "18px",
    fontSize: "18px",
    fontWeight: "700",
    color: "#000",
  };

  return (
    <div style={pageStyle}>
      <div style={deviceStyle}>
        <div style={cameraStyle}></div>

        <div style={screenStyle}>
          {/* Sidebar */}
          <div style={sidebarStyle}>
            <img
              src={cropelleLogo}
              alt="Cropelle Logo"
              style={logoStyle}
            />

            <div style={logoTextStyle}>CROPELLE</div>

            <div
                style={menuItemStyle}
                onClick={() => alert("Location screen coming soon")}
              >
                <img
                  src={locationIcon}
                  alt="Location"
                  style={menuIconStyle}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span style={menuTextStyle}>LOCATION</span>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "#555",
                      fontWeight: "600",
                    }}
                  >
                    {location}
                  </span>
                </div>
              </div>

            <div style={menuItemStyle}>
              <img
                src={notificationsIcon}
                alt="Notifications"
                style={menuIconStyle}
              />
              <span style={menuTextStyle}>NOTIFICATIONS</span>
            </div>

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
            <img
            src={homeIcon}
            alt="Home"
            style={homeIconStyle}
            />
        </button>

        <h1 style={titleStyle}>NOTIFICATIONS</h1>

        <div style={subtitleStyle}>
            DASHBOARD / NOTIFICATIONS
        </div>

        <div style={notificationAreaStyle}>
            {notifications.map((item, index) => (
            <div key={index} style={notificationStyle}>
                • {item}
            </div>
            ))}
        </div>
        </div>
          
        </div>
      </div>
    </div>
  );
}