import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaArrowLeft } from "react-icons/fa";
import "../css/login.css";
import { loginUser, getUsers } from "../js/api";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const sucursalMap = {
  "Sucursal A": 7,
  "Sucursal B": 3,
  "Sucursal C": 4,
  "Sucursal D": 5,
  "Sucursal E": 6
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ Correo: correo, Contraseña: password });
      console.log("Respuesta del login:", res);

      if (res.success && res.data?.token) {
        const usuariosRes = await getUsers();
        const lista = usuariosRes.data;
        const datosUsuario = lista.find((u) => u.Correo === correo);

        const nombreSucursal = datosUsuario?.Nombre || "Sucursal desconocida";
        const idSucursal = sucursalMap[nombreSucursal] || null;

        const usuario = {
          correo,
          sucursal: nombreSucursal,
          rol: datosUsuario?.Rol || "usuario",
          IdSucursal: idSucursal
        };

        sessionStorage.setItem("usuario", JSON.stringify(usuario));
        sessionStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error en login:", err);
      setError("Error de conexión o credenciales inválidas");
    }
  };

  return (
    <div className="login-page">
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
