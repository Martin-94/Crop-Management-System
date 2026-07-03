import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h1>Login Screen</h1>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            width: "200px",
            height: "50px",
            backgroundColor: "#1f6b2e",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}

