import React, { useState } from "react";
import "../css/MenuLateral.css";
import { FaLaptop, FaMobileAlt, FaHeadphones, FaTv, FaHome } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const categorias = [
  { nombre: "Computadoras y Tablets", icon: <FaLaptop /> },
  { nombre: "Celulares", icon: <FaMobileAlt /> },
  { nombre: "Audio", icon: <FaHeadphones /> },
  { nombre: "TV y Proyección", icon: <FaTv /> },
  { nombre: "Hogar y Oficina", icon: <FaHome /> },
];

export default function MenuLateral() {
  const [abierto, setAbierto] = useState(false);

  return (
    <aside
      className={`menu-lateral${abierto ? " abierto" : ""}`}
      onMouseEnter={() => setAbierto(true)}
      onMouseLeave={() => setAbierto(false)}
    >
      <div className="menu-lateral-header">
        <button
          className="menu-lateral-toggle"
          onClick={() => setAbierto(!abierto)}
          title={abierto ? "Colapsar" : "Expandir"}
        >
        {abierto ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
        {abierto && <span className="menu-lateral-logo">UtnTech</span>}
      </div>
      <ul className="menu-lateral-list">
        {categorias.map((cat) => (
          <li key={cat.nombre} className="menu-lateral-item">
            <span className="menu-lateral-icon">{cat.icon}</span>
            {abierto && <span className="menu-lateral-text">{cat.nombre}</span>}
          </li>
        ))}
      </ul>
    </aside>
  );
}