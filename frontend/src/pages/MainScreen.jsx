import { useNavigate } from "react-router-dom";
import logo from "../assets/cropelle-logo.png";
import useScreenSize from "../hooks/useScreenSize";

const DEVICE_WIDTH_DESKTOP = "1180px";

export default function MainScreen() {
  const navigate = useNavigate();

  const { isPhone, isTablet, isDesktop } = useScreenSize();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#050505",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isPhone ? "10px" : isTablet ? "15px" : "20px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* DEVICE */}
      <div
        style={{
          width: "100%",
          maxWidth: DEVICE_WIDTH_DESKTOP,
          backgroundColor: "#050505",
          border: "3px solid #d6d6d6",
          borderRadius: "25px",
          padding: isPhone ? "10px" : isTablet ? "20px" : "35px",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* CAMERA */}
        <div
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            backgroundColor: "#111",
            border: "2px solid #183442",
            position: "absolute",
            top: "15px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        {/* SCREEN */}
        <div
          style={{
            width: "100%",
            minHeight: isPhone ? "auto" : isTablet ? "650px" : "700px",
            backgroundColor: "#fff",
            overflow: "hidden",
            borderRadius: "12px",
          }}
        >
          {/* TOP SECTION */}
          <div
            style={{
              backgroundColor: "#e9e5dc",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: isPhone
                ? "25px 15px"
                : isTablet
                ? "40px 20px"
                : "50px",
            }}
          >
            <img
              src={logo}
              alt="Cropelle Logo"
              style={{
                width: isPhone
                  ? "120px"
                  : isTablet
                  ? "150px"
                  : "180px",
                height: "auto",
              }}
            />

            <h1
              style={{
                color: "#236b2a",
                fontSize: isPhone
                  ? "36px"
                  : isTablet
                  ? "46px"
                  : "56px",
                fontWeight: "800",
                marginTop: "10px",
                marginBottom: 0,
              }}
            >
              CROPELLE
            </h1>
          </div>

          {/* BOTTOM SECTION */}
          <div
            style={{
              backgroundColor: "#e7e7e7",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: isPhone
                ? "25px 20px"
                : isTablet
                ? "35px 25px"
                : "40px",
            }}
          >
            <h2
              style={{
                fontSize: isPhone
                  ? "20px"
                  : isTablet
                  ? "24px"
                  : "28px",
                marginBottom: "15px",
              }}
            >
              🌱 Welcome to CROPELLE
            </h2>

            <p
              style={{
                maxWidth: "700px",
                fontSize: isPhone
                  ? "14px"
                  : isTablet
                  ? "16px"
                  : "18px",
                fontWeight: "700",
                lineHeight: "1.6",
              }}
            >
              Your all-in-one web app for managing farm activities with ease.
              Keep track of your crops, monitor livestock, and stay organized
              with everything in one place.
            </p>

            <p
              style={{
                marginTop: "15px",
                fontSize: isPhone
                  ? "14px"
                  : isTablet
                  ? "16px"
                  : "18px",
                fontWeight: "700",
              }}
            >
              Log in to continue or create an account to get started.
            </p>

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: isPhone ? "column" : "row",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <button
                onClick={() => navigate("/login")}
                style={{
                  width: isPhone ? "100%" : "320px",
                  maxWidth: "320px",
                  height: isPhone ? "60px" : "70px",
                  backgroundColor: "#236b2a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "16px",
                  fontSize: isPhone
                    ? "20px"
                    : isTablet
                    ? "24px"
                    : "28px",
                  fontWeight: "800",
                  cursor: "pointer",
                }}
              >
                LOGIN
              </button>

              <button
                onClick={() => navigate("/register")}
                style={{
                  width: isPhone ? "100%" : "320px",
                  maxWidth: "320px",
                  height: isPhone ? "60px" : "70px",
                  backgroundColor: "#236b2a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "16px",
                  fontSize: isPhone
                    ? "16px"
                    : isTablet
                    ? "20px"
                    : "22px",
                  fontWeight: "800",
                  cursor: "pointer",
                }}
              >
                CREATE AN ACCOUNT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}