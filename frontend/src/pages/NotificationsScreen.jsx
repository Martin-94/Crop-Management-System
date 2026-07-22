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

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [location, setLocation] = useState("Getting location...");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const isPhone = screenWidth <= 768;
  const isTablet = screenWidth > 768 && screenWidth <= 1024;
  const isDesktop = screenWidth > 1024;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:8000/api/notifications");

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();

      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Notification fetch failed:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "clamp(10px, 2vw, 20px)",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  };

  const deviceStyle = {
    width: "100%",
    maxWidth: "1400px",
    backgroundColor: "#000",
    border: "3px solid #d9d9d9",
    borderRadius: "24px",
    padding: isPhone ? "10px" : "clamp(15px, 2vw, 38px)",
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
    height: isPhone ? "calc(100vh - 40px)" : "670px",
    minHeight: isPhone ? "620px" : "670px",
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

  const contentStyle = {
    flex: 1,
    backgroundColor: "#f7f7f7",
    position: "relative",
    padding: isPhone ? "18px 16px 95px 16px" : "clamp(20px, 2vw, 30px)",
    boxSizing: "border-box",
    overflow: "hidden",
    minWidth: 0,
  };

  const homeButtonStyle = {
    position: "absolute",
    top: isPhone ? "14px" : "20px",
    right: isPhone ? "14px" : "20px",
    width: isPhone ? "46px" : "clamp(55px, 6vw, 75px)",
    height: isPhone ? "46px" : "clamp(55px, 6vw, 75px)",
    backgroundColor: "#176225",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  };

  const homeIconStyle = {
    width: isPhone ? "28px" : "clamp(35px, 5vw, 45px)",
    height: isPhone ? "28px" : "clamp(35px, 5vw, 45px)",
    objectFit: "contain",
  };

  const titleStyle = {
    color: "#176225",
    fontSize: isPhone
      ? "clamp(22px, 6vw, 32px)"
      : isTablet
      ? "clamp(34px, 4vw, 48px)"
      : "clamp(48px, 5vw, 58px)",
    fontWeight: "900",
    lineHeight: "1.1",
    margin: 0,
    paddingRight: isPhone ? "58px" : "95px",
    maxWidth: "100%",
    wordBreak: "normal",
    overflowWrap: "break-word",
    boxSizing: "border-box",
  };

  const subtitleStyle = {
    color: "#176225",
    fontSize: isPhone
      ? "clamp(12px, 3.3vw, 15px)"
      : "clamp(14px, 2vw, 24px)",
    fontWeight: "900",
    marginTop: "8px",
    marginBottom: "10px",
  };

  const locationRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: isPhone ? "18px" : "24px",
    flexWrap: "wrap",
    maxWidth: "100%",
  };

  const locationSmallIconStyle = {
    width: isPhone ? "18px" : "22px",
    height: isPhone ? "18px" : "22px",
    objectFit: "contain",
    flexShrink: 0,
  };

  const locationTextStyle = {
    fontSize: isPhone ? "13px" : "15px",
    fontWeight: "700",
    color: "#555",
    wordBreak: "break-word",
  };

  const notificationAreaStyle = {
    height: isPhone ? "calc(100% - 135px)" : "calc(100% - 145px)",
    overflowY: "auto",
    padding: isPhone ? "10px" : "15px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxSizing: "border-box",
  };

  const notificationStyle = {
    marginBottom: "12px",
    fontSize: "clamp(14px, 2vw, 18px)",
    fontWeight: "700",
    color: "#000",
    padding: "12px",
    backgroundColor: "#f0ece3",
    borderRadius: "12px",
    boxSizing: "border-box",
  };

  const messageTextStyle = {
    marginTop: "6px",
    fontWeight: "500",
    lineHeight: "1.3",
  };

  const emptyTextStyle = {
    fontSize: "15px",
    fontWeight: "700",
    color: "#000",
    margin: 0,
  };

  const bottomNavStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "75px",
    backgroundColor: "#f0ece3",
    borderTop: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 1000,
    padding: "6px 8px",
    boxSizing: "border-box",
  };

  const bottomNavButtonStyle = {
    width: "46px",
    height: "46px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    flexShrink: 0,
  };

  const bottomNavIconStyle = {
    width: "30px",
    height: "30px",
    objectFit: "contain",
  };

  const bottomNavLogoStyle = {
    width: "45px",
    height: "45px",
    objectFit: "contain",
    flexShrink: 0,
  };

  return (
    <div style={pageStyle}>
      <div style={deviceStyle}>
        <div style={cameraStyle}></div>

        <div style={screenStyle}>
          {/* Desktop and tablet sidebar */}
          {!isPhone && (
            <div style={sidebarStyle}>
              <img src={cropelleLogo} alt="Cropelle Logo" style={logoStyle} />

              <div style={logoTextStyle}>CROPELLE</div>

              {/* Keep location in sidebar for tablet/desktop */}
              <div
                style={menuItemStyle}
                              >
                <img src={locationIcon} alt="Location" style={menuIconStyle} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                  }}
                >
                  <span style={menuTextStyle}>LOCATION</span>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "#555",
                      fontWeight: "600",
                      wordBreak: "break-word",
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

          {/* Main Content */}
          <div style={contentStyle}>
            <button
              type="button"
              style={homeButtonStyle}
              onClick={() => navigate("/dashboard")}
            >
              <img src={homeIcon} alt="Home" style={homeIconStyle} />
            </button>

            <h1 style={titleStyle}>NOTIFICATIONS</h1>

            <div style={subtitleStyle}>DASHBOARD / NOTIFICATIONS</div>

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

            <div style={notificationAreaStyle}>
              {loading ? (
                <p style={emptyTextStyle}>Loading notifications...</p>
              ) : notifications.length === 0 ? (
                <p style={emptyTextStyle}>No notifications available.</p>
              ) : (
                notifications.map((notification, index) => (
                  <div
                    key={notification.id || index}
                    style={notificationStyle}
                  >
                    <strong>{notification.title || "Notification"}</strong>

                    <div style={messageTextStyle}>
                      {notification.message || notification}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Mobile bottom nav - location removed here only */}
            {isPhone && (
              <div style={bottomNavStyle}>
                <img
                  src={cropelleLogo}
                  alt="Cropelle"
                  style={bottomNavLogoStyle}
                />

                <button type="button" style={bottomNavButtonStyle}>
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