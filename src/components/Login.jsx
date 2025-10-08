import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaArrowLeft } from "react-icons/fa";


export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Usuarios de prueba
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
      <button className="btn-volver" onClick={() => navigate("/")}>
        <FaArrowLeft />
      </button>

      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        {error && <p className="error">{error}</p>}

        <div className="input-icon">
          <FaUser className="icon" />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        <div className="input-icon">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
