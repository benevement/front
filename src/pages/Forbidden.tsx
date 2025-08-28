// pages/Forbidden.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Forbidden: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // retourne à la page d'accueil
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ fontSize: "3rem", color: "#ff4d4f" }}>403</h1>
      <h2>Accès refusé</h2>
      <p>Vous n'avez pas la permission d'accéder à cette page.</p>
      <button
        onClick={handleGoHome}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#1890ff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Retour à l'accueil
      </button>
    </div>
  );
};

export default Forbidden;
