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

  const [formData, setFormData] = useState(() => {
  const savedProfile =
    localStorage.getItem("cropelleProfile");

  return savedProfile
    ? JSON.parse(savedProfile)
    : {
        name: "",
        surname: "",
        farmName: "",
        phone: "",
        address: "",
        cropType: "",
        language: "",
      };
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
    setFormData({
      name: "",
      surname: "",
      farmName: "",
      phone: "",
      address: "",
      cropType: "",
      language: "",
    });
  }
};

const handleSave = () => {
  localStorage.setItem(
    "cropelleProfile",
    JSON.stringify(formData)
  );

  alert("Profile saved successfully");
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
  };

  const contentStyle = {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: "22px 30px",
    position: "relative",
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
  };

  const titleStyle = {
    color: "#176225",
    fontSize: "58px",
    fontWeight: "900",
    margin: 0,
    lineHeight: 1,
  };

  const subtitleStyle = {
    color: "#176225",
    fontSize: "24px",
    fontWeight: "900",
    marginBottom: "25px",
  };

  const sectionTitleStyle = {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "20px",
  };

  const inputStyle = {
    width: "100%",
    height: "38px",
    backgroundColor: "#ece8df",
    border: "none",
    padding: "8px",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: "18px",
    fontWeight: "600",
    width: "150px",
  };

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
    gap: "15px",
  };

  const saveButtonStyle = {
    backgroundColor: "#176225",
    color: "#fff",
    border: "none",
    width: "180px",
    height: "55px",
    fontSize: "22px",
    fontWeight: "800",
    cursor: "pointer",
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

            <div style={{ ...menuItemStyle, marginBottom: 0 }}>
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
              style={homeButtonStyle}
              onClick={() => navigate("/dashboard")}
            >
              <img
                src={homeIcon}
                alt="Home"
                style={homeIconStyle}
              />
            </button>

            <h1 style={titleStyle}>PROFILE</h1>

            <div style={subtitleStyle}>
              DASHBOARD / PROFILE
            </div>

            <div
              style={{
                display: "flex",
                gap: "40px",
              }}
            >
              {/* Personal Details */}

              <div style={{ flex: 1 }}>
                <div style={sectionTitleStyle}>
                  PERSONAL DETAILS:
                </div>

                <div style={rowStyle}>
                  <label style={labelStyle}>NAME:</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div style={rowStyle}>
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

              {/* Divider */}

              <div
                style={{
                  width: "2px",
                  background: "#333",
                }}
              />

              {/* Farm Details */}

              <div style={{ flex: 1 }}>
                <div style={sectionTitleStyle}>
                  FARM DETAILS:
                </div>

                <div style={rowStyle}>
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

            <hr
              style={{
                margin: "25px 0",
                border: "1px solid #333",
              }}
            />

            <div
              style={{
                display: "flex",
                gap: "40px",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={rowStyle}>
                  <label style={labelStyle}>
                    PHONE NUMBER:
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div style={rowStyle}>
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

              <div style={{ flex: 1 }}>
                <div style={rowStyle}>
                  <label style={labelStyle}>
                    TYPES OF CROPS:
                  </label>

                  <select
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="">
                      Select Crop
                    </option>
                    <option value="Maize">Maize</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Soybeans">Soybeans</option>
                  </select>
                </div>

                <div style={rowStyle}>
                  <label style={labelStyle}>
                    LANGUAGE:
                  </label>

                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="">
                      Select Language
                    </option>
                    <option value="English">
                      English
                    </option>
                    <option value="Afrikaans">
                      Afrikaans
                    </option>
                    <option value="Zulu">Zulu</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "35px",
                marginTop: "80px",
              }}
            >
              <button
                style={saveButtonStyle}
                onClick={handleSave}
                >
                SAVE
                </button>

              <button
                style={saveButtonStyle}
                onClick={handleCancel}
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