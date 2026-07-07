import React from "react";
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

export default function DashboardScreen() {
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
    height: "670px",
    backgroundColor: "#fff",
    border: "2px solid #222",
    display: "flex",
    boxSizing: "border-box",
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
    letterSpacing: "1px",
    marginTop: "-4px",
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

  const mainContentStyle = {
  flex: 1,
  width: "100%",
  backgroundColor: "#fff",
  padding: "28px 32px 34px 32px",
  boxSizing: "border-box",
  position: "relative",
};

  const logoutButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "30px",
    width: "76px",
    height: "70px",
    backgroundColor: "#155f22",
    border: "none",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };


  const welcomeStyle = {
    textAlign: "center",
    fontSize: "23px",
    fontWeight: "800",
    lineHeight: "1.25",
    color: "#000",
    marginBottom: "36px",
    paddingRight: "105px",
  };

const cardsGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
  width: "100%",
};

const cardStyle = {
  width: "100%",
  minWidth: 0,
  height: "230px",
  backgroundColor: "#155f22",
  color: "#fff",
  padding: "20px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const cardTopRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  height: "90px",
};

const cardIconStyle = {
  width: "80px",
  height: "80px",
  objectFit: "contain",
};

const weatherIconStyle = {
  width: "80px",
  height: "80px",
  objectFit: "contain",
};

  const cardTitleStyle = {
    fontSize: "36px",
    fontWeight: "900",
    color: "#fff",
    margin: 0,
  };

  const cropsTextStyle = {
  fontSize: "18px",
  fontWeight: "800",
  textAlign: "center",
  lineHeight: "1.15",
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const weatherDetailsStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  fontSize: "16px",
  fontWeight: "800",
  lineHeight: "1.6",
  marginTop: "20px",
};

  const addCardTitleStyle = {
  fontSize: "30px",
  fontWeight: "900",
  color: "#fff",
  margin: 0,
  lineHeight: "1.1",
};
  const moneyRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginTop: "42px",
  };

  const moneyIconStyle = {
    width: "72px",
    height: "72px",
    objectFit: "contain",
  };

  const moneyTextStyle = {
    fontSize: "23px",
    fontWeight: "900",
    color: "#fff",
  };

  return (
    <div style={pageStyle}>
      <div style={deviceStyle}>
        {/* Device camera */}
        <div style={cameraStyle}></div>

        <div style={screenStyle}>
          {/* Sidebar navigation */}
          <div style={sidebarStyle}>
            {/* Cropelle logo */}
            <img src={cropelleLogo} alt="Cropelle Logo" style={logoStyle} />
            <div style={logoTextStyle}>CROPELLE</div>

            {/* Location navigation item */}
            <div
              style={menuItemStyle}
              onClick={() => alert("Location screen coming soon")}
            >
              <img src={locationIcon} alt="Location" style={menuIconStyle} />
              <span style={menuTextStyle}>LOCATION</span>
            </div>

            {/* Notifications navigation item */}
            <div
              style={menuItemStyle}
              onClick={() => alert("Notifications screen coming soon")}
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
              onClick={() => alert("Settings screen coming soon")}
            >
              <img src={settingsIcon} alt="Settings" style={menuIconStyle} />
              <span style={menuTextStyle}>SETTINGS</span>
            </div>

            {/* Profile navigation item */}
            <div
              style={{
                ...menuItemStyle,
                marginBottom: 0,
              }}
              onClick={() => alert("Profile screen coming soon")}
            >
              <img src={profileIcon} alt="Profile" style={menuIconStyle} />
              <span style={menuTextStyle}>PROFILE</span>
            </div>
          </div>

          {/* Main dashboard content */}
          <div style={mainContentStyle}>
            {/* Logout button */}
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

            {/* Dashboard cards */}
            <div style={cardsGridStyle}>
              {/* Crops card */}
              <div style={cardStyle}
              onClick={() => alert("Crops screen coming soon")}>
                <div style={cardTopRowStyle}>
                  <img src={cropsIcon} alt="Crops" style={cardIconStyle} />
                  <h2 style={cardTitleStyle}>CROPS</h2>
                </div>
                    
                <div style={cropsTextStyle}>
                  displays the crop that needs
                  <br />
                  water immediately
                </div>
              </div>

              {/* Weather card */}
              <div style={cardStyle}
              onClick={() => alert("Weather screen coming soon")}>
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
                    24/06/2026
                    <br />
                    Wednesday
                  </div>

                  <div>
                    High:
                    <br />
                    Low:
                  </div>
                </div>
              </div>

              {/* Add crops card */}
              <div style={cardStyle}
              onClick={() => alert("Add Crops screen coming soon")}>
                <div style={cardTopRowStyle}>
                  <img src={cropsIcon} alt="Add Crops" style={cardIconStyle} />

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
              <div style={cardStyle}
              onClick={() => alert("Add Expense screen coming soon")}>
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
                  <img src={expenseIcon} alt="Expense" style={moneyIconStyle} />
                  <span style={moneyTextStyle}>Expenses: R___</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}