import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/LogoUtnTech.png";
import { FaUserCircle } from "react-icons/fa";
import Buscador from "./Buscador";
import "../css/encabezado.css";

export default function Encabezado({ onBuscar }) {
  const handleBuscar = (valor) => {
    if (onBuscar) onBuscar(valor);
  };

  return (
    <header className="encabezado">
      <div className="top-header">
        <div className="logo-buscador">
          <div className="logo-titulo">
            <img src={logo} alt="Logo UTN TECH" className="logo-img" />
            <h1 className="titulo encabezado-titulo">UTNTech</h1>
          </div>

          <div className="buscador-menu">
            <Buscador onBuscar={handleBuscar} />
            <Link to="/login" className="btn-login">
              <FaUserCircle className="icono-login" />
            </Link>
          </div>
        </div>
        <nav className="menu-principal">
          <Link to="/" className="menu-link">Inicio</Link>
          <Link to="/Servicios" className="menu-link">Servicios</Link>
          <Link to="/Acerca" className="menu-link">Acerca de</Link>
          <Link to="/Contacto" className="menu-link">Contáctanos</Link>
        </nav>
      </div>
    </header>
  );
}
