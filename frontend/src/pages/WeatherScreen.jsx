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
import uvIcon from "../assets/UV_index.png";
import pollenIcon from "../assets/pollen.png";
import compassIcon from "../assets/compass.png";
import alertsIcon from "../assets/alerts.png";
import partlyCloudyIcon from "../assets/partlycloudy.png";
import sunnyIcon from "../assets/sunny.png";
import stormIcon from "../assets/storm.png";
import raindropIcon from "../assets/raindrop.png";
import lowTempIcon from "../assets/lowtemp.png";
import highTempIcon from "../assets/hightemp.png";
import windyIcon from "../assets/windy.png";

export default function WeatherScreen() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("Getting location...");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pollenAnimationStep, setPollenAnimationStep] = useState(0);

  const isPhone = screenWidth <= 768;
  const isCompactLayout = screenWidth <= 1024;

  const [weatherData] = useState({
    currentTemp: 10,
    highTemp: 14,
    lowTemp: 3,
    feelsLike: 7,

    sunrise: "06:10",
    sunset: "18:11",

    uvIndex: 5,
    pollen: 54,
    humidity: 54,

    windSpeed: 80,
    windDirection: "E",

    hourlyForecast: [
      { time: "00:00", icon: partlyCloudyIcon, temp: 16, windSpeed: 8, windDirection: "N" },
      { time: "01:00", icon: partlyCloudyIcon, temp: 15, windSpeed: 8, windDirection: "N" },
      { time: "02:00", icon: partlyCloudyIcon, temp: 15, windSpeed: 9, windDirection: "N" },
      { time: "03:00", icon: partlyCloudyIcon, temp: 15, windSpeed: 9, windDirection: "NW" },
      { time: "04:00", icon: partlyCloudyIcon, temp: 14, windSpeed: 10, windDirection: "NW" },
      { time: "05:00", icon: partlyCloudyIcon, temp: 14, windSpeed: 10, windDirection: "NW" },
      { time: "06:00", icon: sunnyIcon, temp: 15, windSpeed: 11, windDirection: "W" },
      { time: "07:00", icon: sunnyIcon, temp: 16, windSpeed: 12, windDirection: "W" },
      { time: "08:00", icon: sunnyIcon, temp: 18, windSpeed: 12, windDirection: "W" },
      { time: "09:00", icon: sunnyIcon, temp: 20, windSpeed: 13, windDirection: "SW" },
      { time: "10:00", icon: sunnyIcon, temp: 22, windSpeed: 14, windDirection: "SW" },
      { time: "11:00", icon: sunnyIcon, temp: 24, windSpeed: 14, windDirection: "SW" },
      { time: "12:00", icon: sunnyIcon, temp: 25, windSpeed: 15, windDirection: "S" },
      { time: "13:00", icon: sunnyIcon, temp: 26, windSpeed: 15, windDirection: "S" },
      { time: "14:00", icon: sunnyIcon, temp: 27, windSpeed: 16, windDirection: "SE" },
      { time: "15:00", icon: partlyCloudyIcon, temp: 27, windSpeed: 16, windDirection: "SE" },
      { time: "16:00", icon: partlyCloudyIcon, temp: 26, windSpeed: 17, windDirection: "SE" },
      { time: "17:00", icon: partlyCloudyIcon, temp: 24, windSpeed: 18, windDirection: "E" },
      { time: "18:00", icon: partlyCloudyIcon, temp: 22, windSpeed: 16, windDirection: "E" },
      { time: "19:00", icon: stormIcon, temp: 20, windSpeed: 15, windDirection: "NE" },
      { time: "20:00", icon: stormIcon, temp: 18, windSpeed: 14, windDirection: "NE" },
      { time: "21:00", icon: partlyCloudyIcon, temp: 17, windSpeed: 12, windDirection: "N" },
      { time: "22:00", icon: partlyCloudyIcon, temp: 16, windSpeed: 10, windDirection: "N" },
      { time: "23:00", icon: partlyCloudyIcon, temp: 15, windSpeed: 9, windDirection: "N" },
    ],

    weeklyForecast: [
      { day: "TODAY", date: "23 Jul", icon: partlyCloudyIcon, temp: 15, rain: "25%" },
      { day: "MON", date: "24 Jul", icon: stormIcon, temp: 18, rain: "100%" },
      { day: "TUE", date: "25 Jul", icon: sunnyIcon, temp: 28, rain: "0%" },
      { day: "WED", date: "26 Jul", icon: partlyCloudyIcon, temp: 24, rain: "15%" },
      { day: "THU", date: "27 Jul", icon: partlyCloudyIcon, temp: 25, rain: "25%" },
      { day: "FRI", date: "28 Jul", icon: stormIcon, temp: 10, rain: "30%" },
      { day: "SAT", date: "29 Jul", icon: sunnyIcon, temp: 27, rain: "15%" },
    ],

    alerts: [
      { icon: alertsIcon, text: "Heavy rainfall expected at 14:00" },
      { icon: windyIcon, text: "Strong winds today" },
      { icon: sunnyIcon, text: "High UV levels" },
    ],
  });

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const pollenTimer = setInterval(() => {
      setPollenAnimationStep((previousStep) => {
        if (previousStep === 0) return 1;
        if (previousStep === 1) return 2;
        return 0;
      });
    }, 850);

    return () => {
      clearInterval(pollenTimer);
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

  const clampValue = (value, min, max) => {
    return Math.min(Math.max(Number(value) || 0, min), max);
  };

  const getWindBearingFromDirection = (direction) => {
    const directionMap = {
      N: 0,
      NNE: 22.5,
      NE: 45,
      ENE: 67.5,
      E: 90,
      ESE: 112.5,
      SE: 135,
      SSE: 157.5,
      S: 180,
      SSW: 202.5,
      SW: 225,
      WSW: 247.5,
      W: 270,
      WNW: 292.5,
      NW: 315,
      NNW: 337.5,
    };

    return directionMap[String(direction || "").toUpperCase()] ?? 0;
  };

  const getWindRotation = () => {
    return getWindBearingFromDirection(weatherData.windDirection);
  };

  const getHumidityRotation = () => {
    const humidity = clampValue(weatherData.humidity, 0, 100);
    return (humidity / 100) * 140 - 70;
  };

  const getUVRotation = () => {
    const uv = clampValue(weatherData.uvIndex, 0, 11);
    return (uv / 11) * 140 - 70;
  };

  const parseTimeToMinutes = (timeString) => {
    if (!timeString || typeof timeString !== "string") return 0;

    const [hours, minutes] = timeString.split(":").map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) return 0;

    return hours * 60 + minutes;
  };

  const getCurrentMinutes = () => {
    return currentTime.getHours() * 60 + currentTime.getMinutes();
  };

  const getSunProgress = () => {
    const sunriseMinutes = parseTimeToMinutes(weatherData.sunrise);
    const sunsetMinutes = parseTimeToMinutes(weatherData.sunset);
    const nowMinutes = getCurrentMinutes();

    if (sunsetMinutes <= sunriseMinutes) return 0;

    const progress =
      (nowMinutes - sunriseMinutes) / (sunsetMinutes - sunriseMinutes);

    return clampValue(progress, 0, 1);
  };

  const getSunPositionStyle = () => {
    const progress = getSunProgress();

    const startX = 20;
    const startY = 58;
    const controlX = 100;
    const controlY = 12;
    const endX = 180;
    const endY = 58;
    const t = progress;

    const x =
      (1 - t) * (1 - t) * startX +
      2 * (1 - t) * t * controlX +
      t * t * endX;

    const y =
      (1 - t) * (1 - t) * startY +
      2 * (1 - t) * t * controlY +
      t * t * endY;

    return {
      left: `${(x / 200) * 100}%`,
      top: `${(y / 70) * 100}%`,
    };
  };

  const getUVLevel = (uvIndex) => {
    const uv = Number(uvIndex) || 0;

    if (uv <= 2) return "LOW";
    if (uv <= 5) return "MODERATE";
    if (uv <= 7) return "HIGH";
    if (uv <= 10) return "VERY HIGH";
    return "EXTREME";
  };

  const getUVColor = (uvIndex) => {
    const uv = Number(uvIndex) || 0;

    if (uv <= 2) return "#2f9e44";
    if (uv <= 5) return "#f59f00";
    if (uv <= 7) return "#f76707";
    if (uv <= 10) return "#ff2938";
    return "#862e9c";
  };

  const getPollenAnimationAmount = () => {
    const pollen = Number(weatherData.pollen) || 0;

    if (pollen < 25) return 2;
    if (pollen < 50) return 3;
    if (pollen < 75) return 4;
    return 5;
  };

  const getPollenTransform = () => {
    const movement = getPollenAnimationAmount();

    if (pollenAnimationStep === 1) {
      return `translateY(-${movement}px) rotate(-4deg) scale(1.04)`;
    }

    if (pollenAnimationStep === 2) {
      return `translateY(${movement / 2}px) rotate(4deg) scale(1)`;
    }

    return "translateY(0px) rotate(0deg) scale(1)";
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
    width: "260px",
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
    fontSize: "clamp(22px, 3vw, 34px)",
    fontWeight: "900",
    textAlign: "center",
    marginBottom: "28px",
  };

  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "clamp(12px, 2vw, 18px)",
    marginBottom: "clamp(28px, 5vw, 50px)",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "14px",
    boxSizing: "border-box",
  };

  const menuIconStyle = {
    width: "clamp(32px, 4vw, 42px)",
    height: "clamp(32px, 4vw, 42px)",
    objectFit: "contain",
    flexShrink: 0,
  };

  const menuTextStyle = {
    fontSize: "clamp(14px, 2vw, 18px)",
    fontWeight: "800",
    color: "#000",
    whiteSpace: "nowrap",
  };

  const sidebarLocationTextStyle = {
    fontSize: "12px",
    color: "#555",
    fontWeight: "600",
    maxWidth: "170px",
    wordBreak: "break-word",
  };

  const contentStyle = {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: isCompactLayout ? "10px 12px 75px 12px" : "clamp(18px, 2vw, 28px)",
    position: "relative",
    boxSizing: "border-box",
    overflowY: "auto",
    overflowX: "hidden",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
  };

  const topContentStyle = {
    flexShrink: 0,
  };

  const homeButtonStyle = {
    position: "absolute",
    top: isCompactLayout ? "10px" : "20px",
    right: isCompactLayout ? "10px" : "20px",
    width: isCompactLayout ? "38px" : "clamp(55px, 6vw, 70px)",
    height: isCompactLayout ? "38px" : "clamp(55px, 6vw, 70px)",
    backgroundColor: "#176225",
    border: "none",
    borderRadius: isCompactLayout ? "12px" : "16px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    zIndex: 10,
  };

  const homeIconStyle = {
    width: isCompactLayout ? "22px" : "clamp(35px, 5vw, 42px)",
    height: isCompactLayout ? "22px" : "clamp(35px, 5vw, 42px)",
    objectFit: "contain",
  };

  const titleStyle = {
    color: "#176225",
    fontSize: isCompactLayout
      ? "clamp(22px, 6vw, 30px)"
      : "clamp(42px, 5vw, 54px)",
    fontWeight: "900",
    lineHeight: "1.05",
    margin: 0,
    paddingRight: isCompactLayout ? "48px" : "95px",
    maxWidth: "100%",
    overflowWrap: "break-word",
    boxSizing: "border-box",
  };

  const subtitleStyle = {
    color: "#176225",
    fontSize: isCompactLayout
      ? "clamp(10px, 3vw, 13px)"
      : "clamp(16px, 2vw, 22px)",
    fontWeight: "900",
    marginTop: isCompactLayout ? "4px" : "8px",
    marginBottom: isCompactLayout ? "8px" : "14px",
  };

  const locationRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: isCompactLayout ? "10px" : "14px",
    flexWrap: "wrap",
    maxWidth: "100%",
  };

  const locationSmallIconStyle = {
    width: isCompactLayout ? "15px" : "18px",
    height: isCompactLayout ? "15px" : "18px",
    objectFit: "contain",
    flexShrink: 0,
  };

  const locationTextStyle = {
    fontSize: isCompactLayout ? "11px" : "13px",
    fontWeight: "700",
    color: "#555",
    wordBreak: "break-word",
  };

  const desktopDashboardStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
    minWidth: 0,
  };

  const desktopTopRowStyle = {
    display: "grid",
    gridTemplateColumns: "220px minmax(0, 1fr)",
    gap: "12px",
    alignItems: "stretch",
    width: "100%",
    minWidth: 0,
  };

  const compactDashboardStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    minWidth: 0,
  };

  const compactTopRowStyle = {
    display: "grid",
    gridTemplateColumns: isPhone ? "42% 58%" : "1fr 1fr",
    gap: "8px",
    width: "100%",
    minWidth: 0,
    alignItems: "stretch",
  };

  const twoColumnRowStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: isCompactLayout ? "10px" : "12px",
    width: "100%",
    minWidth: 0,
  };

  const cardStyle = {
    backgroundColor: "#ece8de",
    borderRadius: "12px",
    padding: isCompactLayout ? "8px" : "12px",
    boxSizing: "border-box",
    minWidth: 0,
  };

  const currentTempCardStyle = {
    ...cardStyle,
    minHeight: isCompactLayout ? "130px" : "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflow: "hidden",
  };

  const temperatureTopRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: isCompactLayout ? "4px" : "8px",
    minWidth: 0,
  };

  const temperatureNumberStyle = {
    fontSize: isCompactLayout ? "28px" : "42px",
    fontWeight: "900",
    lineHeight: "1",
    color: "#000",
    whiteSpace: "nowrap",
  };

  const degreeTextStyle = {
    fontSize: isCompactLayout ? "14px" : "21px",
    fontWeight: "900",
    whiteSpace: "nowrap",
  };

  const currentWeatherIconStyle = {
    width: isCompactLayout ? "24px" : "44px",
    height: isCompactLayout ? "24px" : "44px",
    objectFit: "contain",
    marginLeft: "auto",
    flexShrink: 0,
  };

  const tempIndicatorIconStyle = {
    width: isCompactLayout ? "14px" : "20px",
    height: isCompactLayout ? "14px" : "20px",
    objectFit: "contain",
    verticalAlign: "middle",
  };

  const highLowRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: isCompactLayout ? "10px" : "18px",
    marginTop: "8px",
    fontWeight: "900",
    fontSize: isCompactLayout ? "11px" : "14px",
  };

  const feelsLikeStyle = {
    textAlign: "center",
    marginTop: "6px",
    fontWeight: "900",
    fontSize: isCompactLayout ? "10px" : "12px",
  };

  const smallTitleStyle = {
    fontSize: isCompactLayout ? "10px" : "11px",
    color: "#555",
    fontWeight: "900",
    marginBottom: "4px",
    textAlign: "center",
  };

  const sunriseSunsetCardStyle = {
    ...cardStyle,
    minHeight: isCompactLayout ? "130px" : "155px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: isCompactLayout ? "8px" : "10px",
  };

  const sunArcWrapperStyle = {
  position: "relative",
  width: isPhone
    ? "78%"
    : isCompactLayout
    ? "300px"
    : "350px",
  height: isPhone
    ? "58px"
    : isCompactLayout
    ? "70px"
    : "90px",
  margin: "0 auto",
  maxWidth: "100%",
};

  const sunArcSvgStyle = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
    zIndex: 2,
  };

  const movingSunIconStyle = {
    position: "absolute",
    ...getSunPositionStyle(),
    width: isCompactLayout ? "16px" : "20px",
    height: isCompactLayout ? "16px" : "20px",
    objectFit: "contain",
    transform: "translate(-50%, -50%)",
    transition: "left 0.4s ease, top 0.4s ease",
    zIndex: 5,
    pointerEvents: "none",
  };

  const sunTimesRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
    fontWeight: "900",
    color: "#000000",
  };

  const sunTimeTextStyle = {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1.05",
  };

  const sunTimeLabelStyle = {
    fontSize: isCompactLayout ? "8px" : "9px",
    color: "#555",
    fontWeight: "900",
  };

  const sunTimeValueStyle = {
    fontSize: isCompactLayout ? "11px" : "13px",
    color: "#000000",
    fontWeight: "900",
  };

  const weatherIconStyle = {
    width: isCompactLayout ? "48px" : "68px",
    height: isCompactLayout ? "48px" : "68px",
    objectFit: "contain",
    flexShrink: 0,
  };

  const pollenIconAnimatedStyle = {
    ...weatherIconStyle,
    transform: getPollenTransform(),
    transition: "transform 0.85s ease-in-out",
  };

  const miniMetricCardStyle = {
    ...cardStyle,
    minHeight: isCompactLayout ? "112px" : "132px",
    textAlign: "center",
  };

  const uvGaugeWrapperStyle = {
    position: "relative",
    width: isCompactLayout ? "56px" : "74px",
    height: isCompactLayout ? "56px" : "74px",
    margin: "0 auto 3px",
  };

  const uvIconImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  };

  const uvNeedleStyle = {
    position: "absolute",
    left: "50%",
    bottom: isCompactLayout ? "16px" : "21px",
    width: isCompactLayout ? "2px" : "3px",
    height: isCompactLayout ? "18px" : "25px",
    backgroundColor: "#000000",
    borderRadius: "10px",
    transformOrigin: "50% 100%",
    transform: `translateX(-50%) rotate(${getUVRotation()}deg)`,
    transition: "transform 0.4s ease",
    zIndex: 3,
  };

  const uvNeedlePivotStyle = {
    position: "absolute",
    left: "50%",
    bottom: isCompactLayout ? "14px" : "18px",
    width: isCompactLayout ? "7px" : "9px",
    height: isCompactLayout ? "7px" : "9px",
    backgroundColor: "#000000",
    borderRadius: "50%",
    transform: "translateX(-50%)",
    zIndex: 4,
  };

  const uvValueStyle = {
    fontSize: isCompactLayout ? "17px" : "19px",
    fontWeight: "900",
    color: getUVColor(weatherData.uvIndex),
    lineHeight: "1",
    marginTop: "2px",
  };

  const humidityCardStyle = {
    ...cardStyle,
    textAlign: "center",
    minHeight: isCompactLayout ? "112px" : "132px",
  };

  const humidityGaugeWrapperStyle = {
    position: "relative",
    width: isCompactLayout ? "95px" : "120px",
    height: isCompactLayout ? "48px" : "65px",
    margin: "0 auto",
  };

  const humidityImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  };

  const humidityNeedleStyle = {
    position: "absolute",
    left: "50%",
    bottom: isCompactLayout ? "6px" : "8px",
    width: isCompactLayout ? "2px" : "3px",
    height: isCompactLayout ? "19px" : "24px",
    backgroundColor: "#000000",
    borderRadius: "10px",
    transformOrigin: "50% 100%",
    transform: `translateX(-50%) rotate(${getHumidityRotation()}deg)`,
    transition: "transform 0.4s ease",
    zIndex: 3,
  };

  const humidityPivotStyle = {
    position: "absolute",
    left: "50%",
    bottom: isCompactLayout ? "4px" : "6px",
    width: isCompactLayout ? "7px" : "9px",
    height: isCompactLayout ? "7px" : "9px",
    backgroundColor: "#000000",
    borderRadius: "50%",
    transform: "translateX(-50%)",
    zIndex: 4,
  };

  const humidityValueStyle = {
    fontSize: isCompactLayout ? "12px" : "13px",
    fontWeight: "900",
    marginTop: "1px",
  };

  const windCardStyle = {
    ...cardStyle,
    textAlign: "center",
    minHeight: isCompactLayout ? "112px" : "132px",
  };

  const compassImageStyle = {
    width: isCompactLayout ? "58px" : "92px",
    height: isCompactLayout ? "58px" : "92px",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
    transform: `rotate(${getWindRotation()}deg)`,
    transition: "transform 0.4s ease",
  };

  const windTextStyle = {
    fontSize: isCompactLayout ? "14px" : "18px",
    fontWeight: "900",
    marginTop: "4px",
    lineHeight: "1.2",
  };

  const alertsCardStyle = {
    ...cardStyle,
    minHeight: isCompactLayout ? "130px" : "132px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "hidden",
  };

  const alertsTitleStyle = {
    display: "flex",
    alignItems: "center",
    gap: isCompactLayout ? "5px" : "8px",
    fontSize: isCompactLayout ? "14px" : "18px",
    fontWeight: "900",
    marginBottom: "6px",
    whiteSpace: "nowrap",
  };

  const alertRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: isCompactLayout ? "5px" : "7px",
    fontSize: isPhone ? "7px" : isCompactLayout ? "9px" : "10px",
    fontWeight: "700",
    marginBottom: isPhone ? "5px" : "4px",
    lineHeight: "1.12",
    minWidth: 0,
  };

  const alertTextStyle = {
    minWidth: 0,
    overflowWrap: "break-word",
  };

  const alertIconStyle = {
    width: isCompactLayout ? "13px" : "20px",
    height: isCompactLayout ? "13px" : "20px",
    objectFit: "contain",
    flexShrink: 0,
  };

  const hourlyCardStyle = {
    ...cardStyle,
    backgroundColor: "#e6dfd1",
    minWidth: 0,
    flexShrink: 0,
  };

  const sectionHeadingStyle = {
    textAlign: "center",
    fontSize: isCompactLayout ? "18px" : "18px",
    fontWeight: "900",
    marginBottom: "8px",
  };

  const hourlyScrollStyle = {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    overflowY: "hidden",
    padding: "5px 4px 10px 4px",
    maxWidth: "100%",
    scrollbarWidth: "thin",
    WebkitOverflowScrolling: "touch",
    scrollSnapType: "x mandatory",
  };

  const hourlyItemStyle = {
    minWidth: isCompactLayout ? "72px" : "90px",
    backgroundColor: "#c8c0ad",
    border: "1px solid #b5ab98",
    borderRadius: "10px",
    padding: "7px 5px",
    boxSizing: "border-box",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    fontSize: isCompactLayout ? "10px" : "11px",
    fontWeight: "800",
    scrollSnapAlign: "start",
  };

  const hourlyWeatherIconStyle = {
    width: isCompactLayout ? "30px" : "44px",
    height: isCompactLayout ? "30px" : "44px",
    objectFit: "contain",
  };

  const hourlyWindIconStyle = {
    width: isCompactLayout ? "13px" : "16px",
    height: isCompactLayout ? "13px" : "16px",
    objectFit: "contain",
  };

  const weeklyCardStyle = {
    ...cardStyle,
    backgroundColor: "#e6dfd1",
    overflow: "hidden",
    minHeight: isCompactLayout ? "245px" : "310px",
    display: "flex",
    flexDirection: "column",
  };

  const weeklyListStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 0,
  };

  const weeklyRowStyle = {
    display: "grid",
    gridTemplateColumns: isCompactLayout
      ? "70px 32px 45px 58px"
      : "120px 44px 70px 90px",
    alignItems: "center",
    gap: isCompactLayout ? "8px" : "12px",
    fontSize: isCompactLayout ? "12px" : "14px",
    fontWeight: "900",
    minHeight: isCompactLayout ? "34px" : "42px",
  };

  const weeklyDayCellStyle = {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1.05",
    minWidth: 0,
  };

  const weeklyDayTextStyle = {
    fontSize: isCompactLayout ? "12px" : "15px",
    fontWeight: "900",
    color: "#000",
    whiteSpace: "nowrap",
  };

  const weeklyDateTextStyle = {
    fontSize: isCompactLayout ? "8px" : "10px",
    fontWeight: "800",
    color: "#666",
    marginTop: "3px",
    whiteSpace: "nowrap",
  };

  const weeklyWeatherIconStyle = {
    width: isCompactLayout ? "30px" : "42px",
    height: isCompactLayout ? "30px" : "42px",
    objectFit: "contain",
    justifySelf: "center",
  };

  const weeklyTempStyle = {
    fontSize: isCompactLayout ? "11px" : "13px",
    fontWeight: "900",
    textAlign: "center",
    whiteSpace: "nowrap",
  };

  const weeklyRainContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: isCompactLayout ? "5px" : "8px",
    minWidth: 0,
  };

  const weeklyRainIconStyle = {
    width: isCompactLayout ? "13px" : "16px",
    height: isCompactLayout ? "18px" : "22px",
    objectFit: "contain",
    flexShrink: 0,
  };

  const weeklyRainTextStyle = {
    fontSize: isCompactLayout ? "10px" : "12px",
    fontWeight: "900",
    whiteSpace: "nowrap",
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
    zIndex: 9999,
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
    width: "28px",
    height: "28px",
    objectFit: "contain",
  };

  const bottomNavLogoStyle = {
    width: "40px",
    height: "40px",
    objectFit: "contain",
    flexShrink: 0,
  };

  const renderCurrentTempCard = () => (
    <div style={currentTempCardStyle}>
      <div style={temperatureTopRowStyle}>
        <img
          src={thermometerIcon}
          alt="Temperature"
          style={{
            width: isCompactLayout ? "18px" : "25px",
            height: isCompactLayout ? "34px" : "46px",
            objectFit: "contain",
            flexShrink: 0,
          }}
        />

        <div style={temperatureNumberStyle}>{weatherData.currentTemp}</div>

        <span style={degreeTextStyle}>°C</span>

        <img
          src={partlyCloudyIcon}
          alt="Current weather"
          style={currentWeatherIconStyle}
        />
      </div>

      <div style={highLowRowStyle}>
        <span>
          <img src={highTempIcon} alt="High" style={tempIndicatorIconStyle} />{" "}
          {weatherData.highTemp}
        </span>

        <span>
          <img src={lowTempIcon} alt="Low" style={tempIndicatorIconStyle} />{" "}
          {weatherData.lowTemp}
        </span>
      </div>

      <div style={feelsLikeStyle}>
        Feels like {weatherData.feelsLike}
        <span
          style={{
            fontSize: isCompactLayout ? "10px" : "21px",
            fontWeight: "900",
          }}
        >
          °C
        </span>
      </div>
    </div>
  );

  const renderSunriseSunsetCard = () => (
    <div style={sunriseSunsetCardStyle}>
      <div style={smallTitleStyle}>SUNRISE / SUNSET</div>

      <div style={sunArcWrapperStyle}>
        <svg
          viewBox="0 0 200 70"
          preserveAspectRatio="none"
          style={sunArcSvgStyle}
        >
          <path
            d="M20 58 Q100 12 180 58"
            stroke="#000000"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />

          <line
            x1="20"
            y1="58"
            x2="180"
            y2="58"
            stroke="#000000"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          <circle cx="20" cy="58" r="3.5" fill="#000000" />
          <circle cx="180" cy="58" r="3.5" fill="#000000" />
        </svg>

        <img src={sunnyIcon} alt="Sun position" style={movingSunIconStyle} />
      </div>

      <div style={sunTimesRowStyle}>
        <div style={sunTimeTextStyle}>
          <span style={sunTimeLabelStyle}>SUNRISE</span>
          <span style={sunTimeValueStyle}>{weatherData.sunrise}</span>
        </div>

        <div
          style={{
            ...sunTimeTextStyle,
            textAlign: "right",
          }}
        >
          <span style={sunTimeLabelStyle}>SUNSET</span>
          <span style={sunTimeValueStyle}>{weatherData.sunset}</span>
        </div>
      </div>
    </div>
  );

  const renderUvCard = () => (
    <div style={miniMetricCardStyle}>
      <div style={smallTitleStyle}>UV INDEX</div>

      <div style={uvGaugeWrapperStyle}>
        <img src={uvIcon} alt="UV Index" style={uvIconImageStyle} />
        <div style={uvNeedleStyle}></div>
        <div style={uvNeedlePivotStyle}></div>
      </div>

      <div style={uvValueStyle}>{weatherData.uvIndex}</div>

      <div
        style={{
          fontSize: "8px",
          fontWeight: "900",
          color: getUVColor(weatherData.uvIndex),
        }}
      >
        {getUVLevel(weatherData.uvIndex)}
      </div>
    </div>
  );

  const renderPollenCard = () => (
    <div style={miniMetricCardStyle}>
      <div style={smallTitleStyle}>POLLEN</div>

      <img src={pollenIcon} alt="Pollen" style={pollenIconAnimatedStyle} />

      <div
        style={{
          fontSize: isCompactLayout ? "18px" : "24px",
          fontWeight: "900",
          lineHeight: "1",
          marginTop: "4px",
        }}
      >
        {weatherData.pollen}%
      </div>
    </div>
  );

  const renderHumidityCard = () => (
    <div style={humidityCardStyle}>
      <div style={smallTitleStyle}>HUMIDITY</div>

      <div style={humidityGaugeWrapperStyle}>
        <img src={humidityIcon} alt="Humidity" style={humidityImageStyle} />
        <div style={humidityNeedleStyle}></div>
        <div style={humidityPivotStyle}></div>
      </div>

      <div style={humidityValueStyle}>{weatherData.humidity}%</div>
    </div>
  );

  const renderWindCard = () => (
    <div style={windCardStyle}>
      <div style={smallTitleStyle}>WIND DIRECTION</div>

      <img src={compassIcon} alt="Wind Compass" style={compassImageStyle} />

      <div style={windTextStyle}>{weatherData.windSpeed} km/h</div>
      <div style={windTextStyle}>{weatherData.windDirection}</div>
    </div>
  );

  const renderAlertsCard = () => (
    <div style={alertsCardStyle}>
      <div style={alertsTitleStyle}>
        <img src={alertsIcon} alt="Alerts" style={alertIconStyle} />
        ALERTS
      </div>

      {weatherData.alerts.map((alert, index) => (
        <div key={index} style={alertRowStyle}>
          <img src={alert.icon} alt="Alert" style={alertIconStyle} />
          <span style={alertTextStyle}>{alert.text}</span>
        </div>
      ))}
    </div>
  );

  const renderHourlyForecastCard = () => (
    <div style={hourlyCardStyle}>
      <div style={sectionHeadingStyle}>HOURLY FORECAST</div>

      <div style={hourlyScrollStyle}>
        {weatherData.hourlyForecast.map((hour, index) => (
          <div key={index} style={hourlyItemStyle}>
            <div>{hour.time}</div>

            <img
              src={hour.icon}
              alt="Hourly weather"
              style={hourlyWeatherIconStyle}
            />

            <div>{hour.temp}°</div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "3px",
              }}
            >
              <img src={windyIcon} alt="Wind" style={hourlyWindIconStyle} />
              <span>{hour.windSpeed}</span>
            </div>

            <div>{hour.windDirection}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWeeklyForecastCard = () => (
    <div style={weeklyCardStyle}>
      <div style={sectionHeadingStyle}>WEEKLY FORECAST</div>

      <div style={weeklyListStyle}>
        {weatherData.weeklyForecast.map((day, index) => (
          <div key={index} style={weeklyRowStyle}>
            <div style={weeklyDayCellStyle}>
              <span style={weeklyDayTextStyle}>{day.day}</span>
              <span style={weeklyDateTextStyle}>{day.date}</span>
            </div>

            <img
              src={day.icon}
              alt={`${day.day} weather`}
              style={weeklyWeatherIconStyle}
            />

            <div style={weeklyTempStyle}>{day.temp}°</div>

            <div style={weeklyRainContainerStyle}>
              <img src={raindropIcon} alt="Rain" style={weeklyRainIconStyle} />
              <span style={weeklyRainTextStyle}>{day.rain}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={pageStyle}>
      <div style={deviceStyle}>
        <div style={cameraStyle}></div>

        <div style={screenStyle}>
          {!isCompactLayout && (
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

              <h1 style={titleStyle}>WEATHER</h1>

              <div style={subtitleStyle}>DASHBOARD / WEATHER</div>

              {isCompactLayout && (
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

            {isCompactLayout ? (
              <div style={compactDashboardStyle}>
                <div style={compactTopRowStyle}>
                  {renderCurrentTempCard()}
                  {renderAlertsCard()}
                </div>

                {renderHourlyForecastCard()}
                {renderWeeklyForecastCard()}
                {renderSunriseSunsetCard()}

                <div style={twoColumnRowStyle}>
                  {renderUvCard()}
                  {renderPollenCard()}
                </div>

                <div style={twoColumnRowStyle}>
                  {renderHumidityCard()}
                  {renderWindCard()}
                </div>
              </div>
            ) : (
              <div style={desktopDashboardStyle}>
                <div style={desktopTopRowStyle}>
                  {renderCurrentTempCard()}
                  {renderHourlyForecastCard()}
                </div>

                {renderWeeklyForecastCard()}
                {renderSunriseSunsetCard()}

                <div style={twoColumnRowStyle}>
                  {renderUvCard()}
                  {renderPollenCard()}
                </div>

                <div style={twoColumnRowStyle}>
                  {renderHumidityCard()}
                  {renderWindCard()}
                </div>
              </div>
            )}
          </div>

          {isCompactLayout && (
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
  );
}