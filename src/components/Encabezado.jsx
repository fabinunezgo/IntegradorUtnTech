import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/LogoUtnTech.png";
import { FaUserCircle } from "react-icons/fa"; // icono de perfil

export default function Encabezado() {
  return (
    <header>
      <div className="top-header">
        {/* Logo y título a la izquierda */}
        <div className="logo-titulo">
          <img src={logo} alt="Logo UTN TECH" className="logo-img" />
          <h1 className="titulo">UtnTech</h1>
        </div>

        {/* Buscador y botón de login a la derecha */}
        <div className="buscador-menu">
          <div className="buscador-login">
            <input type="text" placeholder="Buscar..." className="buscador" />
            <Link to="/login" className="btn-login">
              <FaUserCircle /> {/* icono de perfil */}
            </Link>
          </div>

          {/* Menú principal debajo */}
          <nav className="menu-principal">
            <Link to="/">Inicio</Link>
            <Link to="/Servicios">Servicios</Link>
            <Link to="/Acerca">Acerca de</Link>
            <Link to="/Contacto">Contáctanos</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
