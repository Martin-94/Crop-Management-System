import { useNavigate } from "react-router-dom";
import logo from "../assets/cropelle-logo.png";

function MainScreen() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#050505",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Device Frame */}
      {/* Tablet Frame */}
      <div
        style={{
          width: "1000px",
          maxWidth: "95vw",
          height: "680px",
          backgroundColor: "#050505",
          border: "3px solid #D6D6D6",
          borderRadius: "25px",
          padding: "40px 50px",
          position: "relative",
        }}
      >
        {/* Camera */}
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

        {/* Screen */}
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "2px solid #333",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          {/* Top Section */}
          <div
            style={{
              height: "48%",
              backgroundColor: "#E9E5DC",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="Cropelle Logo"
              style={{
                width: "180px",
                height: "180px",
                objectFit: "contain",
              }}
            />

            <h1
              style={{
                color: "#236B2A",
                fontSize: "52px",
                fontWeight: "bold",
                marginTop: "10px",
                marginBottom: "0",
              }}
            >
              CROPELLE
            </h1>
          </div>

          {/* Bottom Section */}
          <div
            style={{
              height: "52%",
              backgroundColor: "#E7E7E7",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "20px 40px",
              boxSizing: "border-box",

           }}
          >
            <h2
              style={{
                fontSize: "18px",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              🌱 Welcome to CROPELLE
            </h2>

            <p
              style={{
                maxWidth: "700px",
                fontSize: "16px",
                fontWeight: "700",
                lineHeight: "1.4",
                margin: 0,

              }}
            >
              Your all-in-one web app for managing farm activities with ease.
              Keep track of your crops, monitor livestock, and stay organized
              with everything in one place, accessible anytime, from anywhere.
              Whether you're planning, tracking, or reviewing progress, this
              platform helps you stay in control of your farm operations.
            </p>

            <p
              style={{
                marginTop: "15px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Log in to continue or create an account to get started.
            </p>

            <div
              style={{
                marginTop: "auto",
                display: "flex",
                gap: "50px",
              }}
            >
              <button
                onClick={() => navigate("/login")}
                style={{
                  width: "320px",
                  height: "90px",
                  backgroundColor: "#236B2A",
                  color: "#fff",
                  border: "none",
                  fontSize: "28px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                LOGIN
              </button>

              <button
                onClick={() => navigate("/register")}
                style={{
                  width: "320px",
                  height: "90px",
                  backgroundColor: "#236B2A",
                  color: "#fff",
                  border: "none",
                  fontSize: "22px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                CREATE AN
                <br />
                ACCOUNT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;