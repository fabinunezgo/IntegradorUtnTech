import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaArrowLeft } from "react-icons/fa";
import "../css/login.css";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  
  const usuarios = [
    { correo: "juan@sucursal1.com", password: "1234", sucursal: "Sucursal A" },
    { correo: "ana@sucursal2.com", password: "1234", sucursal: "Sucursal B" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarioValido = usuarios.find(
      (u) => u.correo === correo && u.password === password
    );

    if (usuarioValido) {
      sessionStorage.setItem("usuario", JSON.stringify(usuarioValido));
      navigate("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page">
      {/* Botón de volver */}
      <button className="login-btn-volver" onClick={() => navigate("/")}>
        <FaArrowLeft className="login-icon-volver" />
      </button>

      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-titulo">Iniciar sesión</h2>
        {error && <p className="login-error">{error}</p>}

        <div className="login-input-icon">
          <FaUser className="login-icon" />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="login-input"
          />
        </div>

        <div className="login-input-icon">
          <FaLock className="login-icon" />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </div>

        <button type="submit" className="login-btn-ingresar">Ingresar</button>
      </form>
    </div>
  );
}