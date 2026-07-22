import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import homeIcon from "../assets/home.png";
import cropelleLogo from "../assets/cropelle-logo.png";
import locationIcon from "../assets/location.png";
import notificationsIcon from "../assets/notifications.png";
import settingsIcon from "../assets/settings.png";
import profileIcon from "../assets/profile.png";

import thermometerIcon from "../assets/thermometer.png";
import humidityIcon from "../assets/humidity.png";
import uvIcon from "../assets/uv.png";
import pollenIcon from "../assets/pollen.png";
import compassIcon from "../assets/compass.png";
import alertsIcon from "../assets/alerts.png";
import partlyCloudyIcon from "../assets/partlycloudy.png";
import sunnyIcon from "../assets/sunny.png";
import stormIcon from "../assets/storm.png";
import raindropIcon from "../assets/raindrop.png";
import sunriseIcon from "../assets/sun.png";
import sunsetIcon from "../assets/sunset.png";
import lowTempIcon from "../assets/lowtemp.png";
import highTempIcon from "../assets/hightemp.png";
import windyIcon from "../assets/windy.png";

export default function WeatherScreen() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("Cape Town, South Africa");

  const [weatherData, setWeatherData] = useState({
    currentTemp: 10,
    highTemp: 14,
    lowTemp: 3,
    sunrise: "06:10",
    sunset: "18:11",
    uvIndex: 3,
    pollen: 54,
    humidity: 54,
    windSpeed: 24,
    windDirection: "SE",

    hourlyForecast: [
      {
        time: "5 AM",
        icon: partlyCloudyIcon,
        temp: 20,
        windSpeed: 0,
        windDirection: "km/h",
      },
      {
        time: "6 AM",
        icon: partlyCloudyIcon,
        temp: 20,
        windSpeed: 0,
        windDirection: "km/h",
      },
      {
        time: "7 AM",
        icon: partlyCloudyIcon,
        temp: 20,
        windSpeed: 0,
        windDirection: "km/h",
      },
      {
        time: "8 AM",
        icon: partlyCloudyIcon,
        temp: 20,
        windSpeed: 0,
        windDirection: "km/h",
      },
      {
        time: "9 AM",
        icon: partlyCloudyIcon,
        temp: 20,
        windSpeed: 0,
        windDirection: "km/h",
      },
      {
        time: "10 AM",
        icon: partlyCloudyIcon,
        temp: 20,
        windSpeed: 0,
        windDirection: "km/h",
      },
      {
        time: "11 AM",
        icon: partlyCloudyIcon,
        temp: 20,
        windSpeed: 0,
        windDirection: "km/h",
      },
      {
        time: "12 AM",
        icon: partlyCloudyIcon,
        temp: 20,
        windSpeed: 0,
        windDirection: "km/h",
      },
      {
        time: "1 PM",
        icon: partlyCloudyIcon,
        temp: 20,
        windSpeed: 0,
        windDirection: "km/h",
      },
      {
        time: "2 PM",
        icon: partlyCloudyIcon,
        temp: 20,
        windSpeed: 0,
        windDirection: "km/h",
      },
    ],

    weeklyForecast: [
      {
        day: "TODAY",
        icon: partlyCloudyIcon,
        temp: 15,
        rain: "25%",
      },
      {
        day: "MONDAY",
        icon: stormIcon,
        temp: 18,
        rain: "100%",
      },
      {
        day: "TUESDAY",
        icon: sunnyIcon,
        temp: 28,
        rain: "0%",
      },
      {
        day: "WEDNESDAY",
        icon: partlyCloudyIcon,
        temp: 24,
        rain: "15%",
      },
      {
        day: "THURSDAY",
        icon: partlyCloudyIcon,
        temp: 25,
        rain: "25%",
      },
      {
        day: "FRIDAY",
        icon: stormIcon,
        temp: 10,
        rain: "30%",
      },
      {
        day: "SATURDAY",
        icon: sunnyIcon,
        temp: 27,
        rain: "15%",
      },
    ],

    alerts: [
      {
        icon: alertsIcon,
        text: "Heavy rainfall expected at 14:00",
      },
      {
        icon: windyIcon,
        text: "Strong winds 128 km/h today",
      },
      {
        icon: sunnyIcon,
        text: "High UV levels - wear protection",
      },
    ],
  });

  /*
  ============================
  FUTURE BACKEND CONNECTION
  Use this once backend/API is ready.
  Keep mock data above until then.
  ============================

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch("YOUR_BACKEND_WEATHER_API_ENDPOINT");

        const data = await response.json();

        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);
  */

  /*
  Optional: use current GPS location later if needed.

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
      }
    );
  }, []);
  */

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: "#242424",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const deviceStyle = {
    width: "100%",
    maxWidth: "1180px",
    backgroundColor: "#242424",
    border: "3px solid #d9d9d9",
    borderRadius: "2px",
    padding: "0",
    boxSizing: "border-box",
  };

  const topBarStyle = {
    height: "30px",
    backgroundColor: "#242424",
    color: "#8b8b8b",
    fontSize: "18px",
    fontWeight: "700",
    paddingLeft: "6px",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  };

  const screenStyle = {
    height: "670px",
    backgroundColor: "#f3f0e8",
    display: "flex",
    overflow: "hidden",
  };

  const sidebarStyle = {
    width: "310px",
    backgroundColor: "#f0ece3",
    padding: "10px 24px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  };

  const logoStyle = {
    width: "145px",
    height: "145px",
    objectFit: "contain",
    display: "block",
    margin: "0 auto 0 auto",
  };

  const logoTextStyle = {
    color: "#176225",
    fontSize: "36px",
    fontWeight: "900",
    textAlign: "center",
    marginTop: "-8px",
    marginBottom: "42px",
  };

  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "48px",
    cursor: "pointer",
  };

  const menuIconStyle = {
    width: "52px",
    height: "52px",
    objectFit: "contain",
  };

  const menuTextStyle = {
    fontSize: "19px",
    fontWeight: "900",
    color: "#000",
    whiteSpace: "nowrap",
  };

  const contentStyle = {
    flex: 1,
    backgroundColor: "#f2efe7",
    padding: "0 14px 14px 14px",
    position: "relative",
    boxSizing: "border-box",
  };

  const homeButtonStyle = {
    position: "absolute",
    top: "24px",
    right: "18px",
    width: "62px",
    height: "62px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    zIndex: 5,
  };

  const homeIconStyle = {
    width: "58px",
    height: "58px",
    objectFit: "contain",
  };

  const titleStyle = {
    color: "#176225",
    fontSize: "50px",
    fontWeight: "900",
    lineHeight: "0.9",
    margin: "8px 0 0 0",
  };

  const subtitleStyle = {
    color: "#176225",
    fontSize: "22px",
    fontWeight: "900",
    marginTop: "2px",
    marginBottom: "2px",
  };

  const topLayoutStyle = {
    display: "grid",
    gridTemplateColumns: "160px 1fr",
    gap: "10px",
    alignItems: "start",
  };

  const currentTempCardStyle = {
    backgroundColor: "#ece8de",
    height: "150px",
    padding: "8px",
    boxSizing: "border-box",
    borderRight: "4px solid #f2efe7",
  };

  const tempRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

  const hourlyCardStyle = {
    backgroundColor: "#e6dfd1",
    height: "150px",
    padding: "8px",
    boxSizing: "border-box",
  };

  const hourlyTitleStyle = {
    textAlign: "center",
    fontWeight: "900",
    fontSize: "13px",
    marginBottom: "4px",
  };

const hourlyGridStyle = {
  display: "flex",
  gap: "6px",
  overflowX: "auto",
  overflowY: "hidden",
  padding: "4px 2px 8px 2px",
  scrollbarWidth: "thin", // Firefox
};

const hourlyItemStyle = {
  minWidth: "65px",
  padding: "6px 4px",
  backgroundColor: "#c8c0ad", // slightly darker beige
  border: "1px solid #b5ab98",
  borderRadius: "8px",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2px",
  fontSize: "11px",
};

  const lowerLayoutStyle = {
    display: "grid",
    gridTemplateColumns: "160px 1fr",
    gap: "10px",
    marginTop: "10px",
  };

  const leftPanelStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };

  const smallCardStyle = {
    backgroundColor: "#ece8de",
    padding: "5px",
    boxSizing: "border-box",
    minHeight: "58px",
  };

  const twoColumnCardStyle = {
    backgroundColor: "#ece8de",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    minHeight: "68px",
  };

  const miniBoxStyle = {
    padding: "5px",
    boxSizing: "border-box",
    borderRight: "2px solid #f2efe7",
    fontSize: "11px",
  };

  const miniTitleStyle = {
    fontSize: "10px",
    color: "#555",
    fontWeight: "800",
  };

  const weeklyCardStyle = {
    backgroundColor: "#e6dfd1",
    minHeight: "422px",
    padding: "18px 34px",
    boxSizing: "border-box",
  };

  const weeklyTitleStyle = {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "900",
    marginBottom: "26px",
  };

  const weeklyRowStyle = {
    display: "grid",
    gridTemplateColumns: "160px 70px 70px 90px",
    alignItems: "center",
    marginBottom: "17px",
    fontSize: "14px",
    fontWeight: "900",
  };

  return (
    <div style={pageStyle}>
      <div style={deviceStyle}>
        <div style={topBarStyle}>Desktop Weather</div>

        <div style={screenStyle}>
          {/* Sidebar */}
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
                }}
              >
                <span style={menuTextStyle}>LOCATION</span>

                <span
                  style={{
                    fontSize: "12px",
                    color: "#555",
                    fontWeight: "700",
                    maxWidth: "180px",
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

            <div style={menuItemStyle} onClick={() => navigate("/settings")}>
              <img src={settingsIcon} alt="Settings" style={menuIconStyle} />
              <span style={menuTextStyle}>SETTINGS</span>
            </div>

            <div style={menuItemStyle} onClick={() => navigate("/profile")}>
              <img src={profileIcon} alt="Profile" style={menuIconStyle} />
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

            <h1 style={titleStyle}>WEATHER</h1>
            <div style={subtitleStyle}>DASHBOARD / WEATHER</div>

            {/* Top section: current temp + hourly */}
            <div style={topLayoutStyle}>
              <div style={currentTempCardStyle}>
                <div style={tempRowStyle}>
                  <img
                    src={thermometerIcon}
                    alt="Temperature"
                    style={{ width: "25px", height: "47px" }}
                  />
                  <div
                    style={{
                      fontSize: "42px",
                      fontWeight: "900",
                      lineHeight: "1",
                    }}
                  >
                    {weatherData.currentTemp}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    marginTop: "8px",
                    paddingLeft: "20px",
                    fontWeight: "900",
                    fontSize: "15px",
                  }}
                >
                  <span>
                    <img
                      src={highTempIcon}
                      alt="High"
                      style={{ width: "12px", verticalAlign: "middle" }}
                    />{" "}
                    {weatherData.highTemp}
                  </span>

                  <span>
                    <img
                      src={lowTempIcon}
                      alt="Low"
                      style={{ width: "12px", verticalAlign: "middle" }}
                    />{" "}
                    {weatherData.lowTemp}
                  </span>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    marginTop: "5px",
                    fontWeight: "900",
                    fontSize: "12px",
                  }}
                >
                  Feels like 7
                </div>
              </div>

              <div style={hourlyCardStyle}>
                <div style={hourlyTitleStyle}>HOURLY FORECAST</div>

                <div style={hourlyGridStyle}>
                  {weatherData.hourlyForecast.map((hour, index) => (
                    <div key={index} style={hourlyItemStyle}>
                      <div>{hour.time}</div>

                      <img
                        src={hour.icon}
                        alt="Hourly weather"
                        style={{
                          width: "32px",
                          height: "32px",
                          objectFit: "contain",
                          marginTop: "3px",
                        }}
                      />

                      <div>{hour.temp}</div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "2px",
                        }}
                      >
                        <img
                          src={windyIcon}
                          alt="Wind"
                          style={{ width: "12px", height: "12px" }}
                        />
                        <span>{hour.windSpeed}</span>
                      </div>

                      <div>{hour.windDirection}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lower section */}
            <div style={lowerLayoutStyle}>
              {/* Left info column */}
              <div style={leftPanelStyle}>
                <div style={smallCardStyle}>
                  <div style={{ fontSize: "12px", fontWeight: "800" }}>
                    SUNRISE: {weatherData.sunrise}
                  </div>

                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "800",
                      marginTop: "7px",
                    }}
                  >
                    SUNSET: {weatherData.sunset}
                    <img
                      src={sunsetIcon}
                      alt="Sunset"
                      style={{
                        width: "48px",
                        height: "30px",
                        float: "right",
                        marginRight: "6px",
                      }}
                    />
                  </div>
                </div>

                <div style={twoColumnCardStyle}>
                  <div style={miniBoxStyle}>
                    <div style={miniTitleStyle}>UV INDEX</div>
                    <img
                      src={uvIcon}
                      alt="UV"
                      style={{
                        width: "38px",
                        display: "block",
                        margin: "2px auto",
                      }}
                    />
                    <div
                      style={{
                        textAlign: "center",
                        fontWeight: "900",
                        marginTop: "-25px",
                        fontSize: "12px",
                      }}
                    >
                      {weatherData.uvIndex}
                    </div>
                  </div>

                  <div style={{ ...miniBoxStyle, borderRight: "none" }}>
                    <div style={miniTitleStyle}>POLLEN</div>
                    <img
                      src={pollenIcon}
                      alt="Pollen"
                      style={{ width: "32px", float: "left" }}
                    />

                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "800",
                        marginLeft: "34px",
                      }}
                    >
                      54%
                    </div>
                  </div>
                </div>

                <div style={smallCardStyle}>
                  <div style={miniTitleStyle}>HUMIDITY</div>
                  <img
                    src={humidityIcon}
                    alt="Humidity"
                    style={{
                      width: "115px",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                </div>

                <div style={smallCardStyle}>
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: "500",
                      marginBottom: "-4px",
                    }}
                  >
                    WIND
                  </div>

                  <img
                    src={compassIcon}
                    alt="Compass"
                    style={{
                      width: "60px",
                      height: "60px",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                </div>

                <div
                  style={{
                    ...smallCardStyle,
                    minHeight: "90px",
                    padding: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "20px",
                      fontWeight: "500",
                      marginBottom: "4px",
                    }}
                  >
                    <img
                      src={alertsIcon}
                      alt="Alerts"
                      style={{ width: "22px", height: "22px" }}
                    />
                    ALERTS
                  </div>

                  {weatherData.alerts.map((alert, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "9px",
                        marginBottom: "3px",
                        fontWeight: "700",
                      }}
                    >
                      <img
                        src={alert.icon}
                        alt="Alert"
                        style={{
                          width: "13px",
                          height: "13px",
                          objectFit: "contain",
                        }}
                      />
                      <span>{alert.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly forecast */}
              <div style={weeklyCardStyle}>
                <div style={weeklyTitleStyle}>WEEKLY FORECAST</div>

                {weatherData.weeklyForecast.map((day, index) => (
                  <div key={index} style={weeklyRowStyle}>
                    <div>{day.day}</div>

                    <img
                      src={day.icon}
                      alt={`${day.day} weather`}
                      style={{
                        width: "32px",
                        height: "32px",
                        objectFit: "contain",
                      }}
                    />

                    <div>{day.temp}</div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <img
                        src={raindropIcon}
                        alt="Rain"
                        style={{
                          width: "18px",
                          height: "26px",
                          objectFit: "contain",
                        }}
                      />
                      <span>{day.rain}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}