import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/LogoUtnTech.png";

export default function Encabezado() {
  return (
    <header>
      <div className="top-header">
        <div className="logo-titulo">
          <img src={logo} alt="Logo UTN TECH" className="logo-img" />
          <h1 className="titulo">UTNTech</h1>
        </div>

        <div className="buscador-menu">
          <input type="text" placeholder="Buscar..." className="buscador" />
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
