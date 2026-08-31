import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import cropelleLogo from "../assets/cropelle-logo.png";
import emailIcon from "../assets/email.png";

export default function ForgotPasswordScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    try {
      /*
      =====================================
      FUTURE RESET PASSWORD API CALL
      =====================================

      const response = await fetch(
        "https://your-api-url/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setEmailSent(true);
      } else {
        alert(data.message || "Unable to send reset link.");
      }

      =====================================
      END RESET PASSWORD API CALL
      =====================================
      */

      // TEMPORARY RESET PASSWORD LOGIC
      console.log("Reset password requested for:", email);

      setEmailSent(true);
    } catch (error) {
      console.error("Reset Password Error:", error);
      alert("Unable to send the password reset link.");
    }
  };

  const handleReturnToLogin = () => {
    navigate("/");
  };

  return (
    <div style={pageStyle}>
      <div style={deviceStyle}>
        <div style={cameraStyle} />

        <div style={containerStyle}>
          {/* LEFT PANEL */}
          <div style={leftPanelStyle}>
           <img src={cropelleLogo} alt="Cropelle Logo" style={logoStyle} />

            <h2 style={brandTextStyle}>CROPELLE</h2>
          </div>

          {/* RIGHT PANEL */}
          <div style={rightPanelStyle}>
            <h1 style={titleStyle}>FORGOT PASSWORD?</h1>

            <div style={cardStyle}>
              {!emailSent ? (
                <>
                  {/* EMAIL IMAGE */}
                  <img src={emailIcon} alt="Email Icon" style={emailIconStyle} />

                  {/* TEXT BELOW EMAIL IMAGE */}
                  <p style={descriptionStyle}>
                    Enter your email address and we will send you a password
                    reset link.
                  </p>

                  <form onSubmit={handleResetPassword}>
                    <div style={inputWrapperStyle}>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        style={inputStyle}
                        autoComplete="email"
                        required
                      />
                    </div>

                    <button type="submit" style={resetButtonStyle}>
                      SEND RESET LINK
                    </button>
                  </form>

                  <button
                    type="button"
                    onClick={handleReturnToLogin}
                    style={backButtonStyle}
                  >
                    Back to Login
                  </button>
                </>
              ) : (
                <>
                  <div style={successIconStyle} aria-hidden="true">
                    ✓
                  </div>

                  <h3 style={successTitleStyle}>
                    Email Sent Successfully
                  </h3>

                  <p style={successTextStyle}>
                    We sent a password reset link to:
                  </p>

                  <p style={submittedEmailStyle}>{email}</p>

                  <p style={successTextStyle}>
                    Please check your inbox and spam folder.
                  </p>

                  <button
                    type="button"
                    onClick={handleReturnToLogin}
                    style={resetButtonStyle}
                  >
                    RETURN TO LOGIN
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =====================================
   STYLES
===================================== */

const pageStyle = {
  minHeight: "100vh",
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: "#000000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const deviceStyle = {
  width: "100%",
  maxWidth: "1100px",
  boxSizing: "border-box",
  backgroundColor: "#000000",
  border: "3px solid #D9D9D9",
  borderRadius: "24px",
  padding: "clamp(14px, 2vw, 30px)",
  position: "relative",
};

const cameraStyle = {
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: "#061D1F",
  border: "2px solid #111111",
  position: "absolute",
  top: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 2,
};

const containerStyle = {
  width: "100%",
  minHeight: "580px",
  boxSizing: "border-box",
  backgroundColor: "#FFFFFF",
  display: "flex",
  overflow: "hidden",
  border: "2px solid #222222",
  borderRadius: "12px",
};

const leftPanelStyle = {
  width: "36%",
  minWidth: "180px",
  boxSizing: "border-box",
  backgroundColor: "#F0ECE3",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 20px",
};

const logoStyle = {
  width: "clamp(100px, 15vw, 165px)",
  height: "clamp(100px, 15vw, 165px)",
  objectFit: "contain",
  display: "block",
};

const brandTextStyle = {
  color: "#176225",
  fontSize: "clamp(20px, 3vw, 32px)",
  fontWeight: "900",
  marginTop: "4px",
  marginBottom: "0",
  textAlign: "center",
};

const rightPanelStyle = {
  flex: 1,
  boxSizing: "border-box",
  backgroundColor: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "75px 30px 40px",
};

const titleStyle = {
  color: "#176225",
  fontSize: "clamp(28px, 4vw, 42px)",
  fontWeight: "900",
  marginTop: "0",
  marginBottom: "28px",
  textAlign: "center",
};

const cardStyle = {
  width: "100%",
  maxWidth: "450px",
  boxSizing: "border-box",
  backgroundColor: "#F7F7F7",
  padding: "35px",
  borderRadius: "6px",
  boxShadow: "0 3px 12px rgba(0, 0, 0, 0.12)",
  textAlign: "center",
};

const emailIconStyle = {
  width: "120px",
  height: "120px",
  objectFit: "contain",
  display: "block",
  margin: "0 auto 15px",
};

const descriptionStyle = {
  color: "#666666",
  fontSize: "14px",
  lineHeight: "1.5",
  textAlign: "center",
  marginTop: "0",
  marginBottom: "25px",
};

const inputWrapperStyle = {
  width: "100%",
  height: "46px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#EFEFEF",
  border: "1px solid #DDDDDD",
  borderRadius: "3px",
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  border: "none",
  backgroundColor: "transparent",
  padding: "0 12px",
  outline: "none",
  color: "#111111",
  fontSize: "13px",
};

const resetButtonStyle = {
  width: "100%",
  height: "45px",
  border: "none",
  borderRadius: "3px",
  backgroundColor: "#176225",
  color: "#FFFFFF",
  fontWeight: "900",
  cursor: "pointer",
  marginTop: "10px",
};

const backButtonStyle = {
  backgroundColor: "transparent",
  border: "none",
  color: "#176225",
  fontWeight: "700",
  cursor: "pointer",
  marginTop: "20px",
};

const successIconStyle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: "#176225",
  color: "#FFFFFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "42px",
  fontWeight: "700",
  margin: "0 auto 15px",
};

const successTitleStyle = {
  color: "#176225",
  marginTop: "0",
  marginBottom: "15px",
};

const successTextStyle = {
  color: "#666666",
  lineHeight: "1.5",
  marginTop: "0",
  marginBottom: "12px",
};

const submittedEmailStyle = {
  color: "#176225",
  fontWeight: "700",
  overflowWrap: "anywhere",
  marginTop: "0",
  marginBottom: "20px",
};