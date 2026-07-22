import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import cropelleLogo from "../assets/cropelle-logo.png";
import locationIcon from "../assets/location.png";
import notificationsIcon from "../assets/notifications.png";
import settingsIcon from "../assets/settings.png";
import profileIcon from "../assets/profile.png";
import cropsIcon from "../assets/crops.png";
import weatherIcon from "../assets/weather.png";
import incomeIcon from "../assets/income.png";
import expenseIcon from "../assets/expense.png";
import logoutIcon from "../assets/logout.png";

import useScreenSize from "../hooks/useScreenSize";

const DEVICE_WIDTH_DESKTOP = "1180px";

export default function DashboardScreen() {
  const navigate = useNavigate();

  const { isPhone, isTablet, isDesktop } = useScreenSize();

  const [location, setLocation] = useState("Getting location...");

  const today = new Date();

  const currentDate = today.toLocaleDateString("en-GB");

  const currentDay = today.toLocaleDateString("en-GB", {
    weekday: "long",
  });

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

  const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "clamp(8px, 2vw, 20px)",
  boxSizing: "border-box",
  fontFamily: "Arial, sans-serif",
};

  const deviceStyle = {
  width: "100%",
  maxWidth: DEVICE_WIDTH_DESKTOP,
  backgroundColor: "#000",
  border: "3px solid #d9d9d9",
  borderRadius: "24px",
  padding: "clamp(10px, 2vw, 38px)",
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
  minHeight: "670px",
  width: "100%",
  backgroundColor: "#fff",
  border: "2px solid #222",
  display: "flex",
  flexDirection: isDesktop ? "row" : "column",
  boxSizing: "border-box",
  overflowX: "hidden",
  overflowY: "auto",
  borderRadius: "12px",
};

  const sidebarStyle = {
  width: "clamp(240px, 25vw, 340px)",
  backgroundColor: "#f0ece3",
  padding: "clamp(12px, 2vw, 25px)",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
};

  const tabletTopNavStyle = {
    width: "100%",
    backgroundColor: "#f0ece3",
    padding: "14px 18px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "14px",
  };

  const tabletLogoBoxStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
  };

  const logoStyle = {
  width: "clamp(90px, 10vw, 145px)",
  height: "clamp(90px, 10vw, 145px)",
  objectFit: "contain",
  display: "block",
  margin: "0 auto",
};

  const tabletLogoStyle = {
    width: "55px",
    height: "55px",
    objectFit: "contain",
  };

  const logoTextStyle = {
  color: "#176225",
  fontSize: "clamp(22px, 3vw, 36px)",
  fontWeight: "900",
  textAlign: "center",
  letterSpacing: "1px",
  marginTop: "-4px",
  marginBottom: "28px",
};

  const tabletLogoTextStyle = {
    color: "#176225",
    fontSize: "24px",
    fontWeight: "900",
    letterSpacing: "1px",
  };

  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "55px",
    cursor: "pointer",
  };

  const menuIconStyle = {
  width: "clamp(36px, 4vw, 58px)",
  height: "clamp(36px, 4vw, 58px)",
  objectFit: "contain",
};

  const menuTextStyle = {
  fontSize: "clamp(14px, 1.5vw, 20px)",
  fontWeight: "800",
  color: "#000",
};
  const tabletNavButtonStyle = {
    width: "48px",
    height: "48px",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    flexShrink: 0,
  };

  const tabletNavIconStyle = {
    width: "30px",
    height: "30px",
    objectFit: "contain",
  };

  const mainContentStyle = {
  flex: 1,
  width: "100%",
  backgroundColor: "#fff",
  padding: "clamp(15px, 2vw, 32px)",
  paddingBottom: isPhone ? "95px" : "34px",
  boxSizing: "border-box",
  position: "relative",
};


  const logoutButtonStyle = {
  position: "absolute",
  top: "1rem",
  right: "2rem",
  width: "clamp(55px, 5vw, 76px)",
  height: "clamp(55px, 5vw, 70px)",
  backgroundColor: "#155f22",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

  const welcomeStyle = {
  textAlign: "center",
  fontSize: "clamp(14px, 2vw, 23px)",
  fontWeight: "800",
  lineHeight: "1.4",
  color: "#000",
  marginBottom: "clamp(20px, 3vw, 36px)",
  paddingRight: isDesktop ? "105px" : "0",
  maxWidth: "100%",
};

  const mobileLocationStyle = {
    display: isDesktop ? "none" : "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#f0ece3",
    borderRadius: "12px",
    boxSizing: "border-box",
    width: "100%",
  };

  const cardsGridStyle = {
  display: "grid",
  gridTemplateColumns:
    isPhone
      ? "1fr"
      : "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "clamp(14px, 2vw, 20px)",
  width: "100%",
};

  const cardStyle = {
  width: "100%",
  minWidth: 0,
  minHeight: "clamp(170px, 28vw, 230px)",
  backgroundColor: "#155f22",
  color: "#fff",
  padding: "clamp(16px, 2vw, 20px)",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  cursor: "pointer",
  borderRadius: "16px",
  overflow: "hidden",
};

  const cardTopRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: isPhone ? "12px" : isTablet ? "16px" : "20px",
    minHeight: isPhone ? "65px" : isTablet ? "78px" : "90px",
  };

  const cardIconStyle = {
  width: "clamp(50px, 6vw, 80px)",
  height: "clamp(50px, 6vw, 80px)",
  objectFit: "contain",
  flexShrink: 0,
};

  const weatherIconStyle = {
  width: "clamp(50px, 6vw, 80px)",
  height: "clamp(50px, 6vw, 80px)",
  objectFit: "contain",
  flexShrink: 0,
};

  const cardTitleStyle = {
  fontSize: "clamp(22px, 3vw, 36px)",
  fontWeight: "900",
  color: "#fff",
  margin: 0,
};

  const cropsTextStyle = {
  fontSize: "clamp(14px, 2vw, 18px)",
  fontWeight: "800",
  textAlign: "center",
  lineHeight: "1.3",
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

 const weatherDetailsStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  fontSize: "clamp(13px, 1.8vw, 16px)",
  fontWeight: "800",
  lineHeight: "1.5",
};

  const addCardTitleStyle = {
  fontSize: "clamp(20px, 3vw, 30px)",
  fontWeight: "900",
  color: "#fff",
  margin: 0,
  lineHeight: "1.1",
};

  const moneyRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: isPhone ? "12px" : isTablet ? "18px" : "24px",
    marginTop: isPhone ? "12px" : isTablet ? "22px" : "42px",
  };

  const moneyIconStyle = {
  width: "clamp(42px, 5vw, 72px)",
  height: "clamp(42px, 5vw, 72px)",
  objectFit: "contain",
};

 const moneyTextStyle = {
  fontSize: "clamp(14px, 2vw, 23px)",
  fontWeight: "900",
  color: "#fff",
};


  const bottomNavStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: "75px",
    backgroundColor: "#f0ece3",
    borderTop: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 1000,
    padding: "6px 8px",
    boxSizing: "border-box",
  };

  const bottomNavLogoStyle = {
  width: "clamp(42px, 8vw, 52px)",
  height: "clamp(42px, 8vw, 52px)",
  objectFit: "contain",
};

  const bottomNavButtonStyle = {
    width: "46px",
    height: "46px",
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
  width: "clamp(24px, 5vw, 30px)",
  height: "clamp(24px, 5vw, 30px)",
  objectFit: "contain",
};

  return (
    <div style={pageStyle}>
      <div style={deviceStyle}>
        {/* Device camera */}
        <div style={cameraStyle}></div>

        <div style={screenStyle}>
          {/* Desktop sidebar navigation */}
          {isDesktop && (
            <div style={sidebarStyle}>
              <img src={cropelleLogo} alt="Cropelle Logo" style={logoStyle} />

              <div style={logoTextStyle}>CROPELLE</div>

              <div style={menuItemStyle}>
                <img src={locationIcon} alt="Location" style={menuIconStyle} />

                <div>
                  <span style={menuTextStyle}>LOCATION</span>
                  <br />
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
                <img
                  src={settingsIcon}
                  alt="Settings"
                  style={menuIconStyle}
                />
                <span style={menuTextStyle}>SETTINGS</span>
              </div>

              <div style={menuItemStyle} onClick={() => navigate("/profile")}>
                <img src={profileIcon} alt="Profile" style={menuIconStyle} />
                <span style={menuTextStyle}>PROFILE</span>
              </div>
            </div>
          )}

          {/* Tablet top navigation */}
          {isTablet && (
            <div style={tabletTopNavStyle}>
              <div style={tabletLogoBoxStyle}>
                <img
                  src={cropelleLogo}
                  alt="Cropelle"
                  style={tabletLogoStyle}
                />
                <span style={tabletLogoTextStyle}>CROPELLE</span>
              </div>

              <button
                type="button"
                onClick={() => navigate("/notifications")}
                style={tabletNavButtonStyle}
              >
                <img
                  src={notificationsIcon}
                  alt="Notifications"
                  style={tabletNavIconStyle}
                />
              </button>

              <button
                type="button"
                onClick={() => navigate("/settings")}
                style={tabletNavButtonStyle}
              >
                <img
                  src={settingsIcon}
                  alt="Settings"
                  style={tabletNavIconStyle}
                />
              </button>

              <button
                type="button"
                onClick={() => navigate("/profile")}
                style={tabletNavButtonStyle}
              >
                <img
                  src={profileIcon}
                  alt="Profile"
                  style={tabletNavIconStyle}
                />
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                style={tabletNavButtonStyle}
              >
                <img
                  src={logoutIcon}
                  alt="Logout"
                  style={tabletNavIconStyle}
                />
              </button>
            </div>
          )}

          {/* Main dashboard content */}
          <div style={mainContentStyle}>
            {/* Desktop logout button */}
            {isDesktop && (
              <button
                type="button"
                style={logoutButtonStyle}
                onClick={() => navigate("/")}
              >
                <img
                  src={logoutIcon}
                  alt="Logout"
                  style={{
                    width: "52px",
                    height: "52px",
                    objectFit: "contain",
                  }}
                />
              </button>
            )}

            {/* Welcome message */}
            <div style={welcomeStyle}>
              Welcome back, username 👋
              <br />
              Great to see you again. Your journey
              <br />
              starts here, take a look around and pick
              <br />
              up right where you left off.
            </div>

            {/* Phone and tablet location card */}
            {!isDesktop && (
              <div style={mobileLocationStyle}>
                <img
                  src={locationIcon}
                  alt="Location"
                  style={{
                    width: isPhone ? "28px" : "32px",
                    height: isPhone ? "28px" : "32px",
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />

                <span
                  style={{
                    fontSize: isPhone ? "13px" : "15px",
                    fontWeight: "700",
                    color: "#000",
                    textAlign: "center",
                    wordBreak: "break-word",
                  }}
                >
                  {location}
                </span>
              </div>
            )}

            {/* Dashboard cards */}
            <div style={cardsGridStyle}>
              {/* Crops card */}
              <div
                style={cardStyle}
                onClick={() => alert("Crops screen coming soon")}
              >
                <div style={cardTopRowStyle}>
                  <img src={cropsIcon} alt="Crops" style={cardIconStyle} />
                  <h2 style={cardTitleStyle}>CROPS</h2>
                </div>

                <div style={cropsTextStyle}>
                  Crop: Maize
                  <br />
                  Water Level: Low
                  <br />
                  Irrigate Today
                </div>
              </div>

              {/* Weather card */}
              <div style={cardStyle} onClick={() => navigate("/weather")}>
                <div style={cardTopRowStyle}>
                  <img
                    src={weatherIcon}
                    alt="Weather"
                    style={weatherIconStyle}
                  />
                  <h2 style={cardTitleStyle}>WEATHER</h2>
                </div>

                <div style={weatherDetailsStyle}>
                  <div>
                    {currentDate}
                    <br />
                    {currentDay}
                  </div>

                  <div>
                    High:
                    <br />
                    Low:
                  </div>
                </div>
              </div>

              {/* Add crops card */}
              <div
                style={cardStyle}
                onClick={() => alert("Add Crops screen coming soon")}
              >
                <div style={cardTopRowStyle}>
                  <img
                    src={cropsIcon}
                    alt="Add Crops"
                    style={cardIconStyle}
                  />

                  <h2 style={addCardTitleStyle}>
                    ADD
                    <br />
                    CROPS
                  </h2>
                </div>

                <div style={moneyRowStyle}>
                  <img src={incomeIcon} alt="Income" style={moneyIconStyle} />
                  <span style={moneyTextStyle}>Income: R___</span>
                </div>
              </div>

              {/* Add expenses card */}
              <div
                style={cardStyle}
                onClick={() => alert("Add Expense screen coming soon")}
              >
                <div style={cardTopRowStyle}>
                  <img
                    src={expenseIcon}
                    alt="Expenses"
                    style={cardIconStyle}
                  />

                  <h2 style={addCardTitleStyle}>
                    ADD
                    <br />
                    EXPENSES
                  </h2>
                </div>

                <div style={moneyRowStyle}>
                  <img
                    src={expenseIcon}
                    alt="Expense"
                    style={moneyIconStyle}
                  />
                  <span style={moneyTextStyle}>Expenses: R___</span>
                </div>
              </div>
            </div>

            {/* Phone bottom navigation */}
            {isPhone && (
              <div style={bottomNavStyle}>
                <img
                  src={cropelleLogo}
                  alt="Cropelle"
                  style={bottomNavLogoStyle}
                />

                <button
                  type="button"
                  onClick={() => navigate("/notifications")}
                  style={bottomNavButtonStyle}
                >
                  <img
                    src={notificationsIcon}
                    alt="Notifications"
                    style={bottomNavIconStyle}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/settings")}
                  style={bottomNavButtonStyle}
                >
                  <img
                    src={settingsIcon}
                    alt="Settings"
                    style={bottomNavIconStyle}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  style={bottomNavButtonStyle}
                >
                  <img
                    src={profileIcon}
                    alt="Profile"
                    style={bottomNavIconStyle}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  style={bottomNavButtonStyle}
                >
                  <img
                    src={logoutIcon}
                    alt="Logout"
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