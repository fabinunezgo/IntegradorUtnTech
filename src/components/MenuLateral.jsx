import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MenuLateral.css";
import { FaLaptop, FaMobileAlt, FaHeadphones, FaTv, FaHome, FaChevronLeft, FaChevronRight,} from "react-icons/fa";

const categorias = [
  { nombre: "Computadoras y Tablets", icon: <FaLaptop /> },
  { nombre: "Celulares", icon: <FaMobileAlt /> },
  { nombre: "Audio", icon: <FaHeadphones /> },
  { nombre: "TV y Proyección", icon: <FaTv /> },
  { nombre: "Hogar y Oficina", icon: <FaHome /> },
];

export default function MenuLateral() {
  const [abierto, setAbierto] = useState(false);
  const [esMovil, setEsMovil] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const handleCategoriaClick = (categoria) => {
    navigate(`/categoria/${encodeURIComponent(categoria)}`);
  };
  useEffect(() => {
    const handleResize = () => setEsMovil(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`menu-lateral${abierto ? " abierto" : ""}`}
      onMouseEnter={() => !esMovil && setAbierto(true)}
      onMouseLeave={() => !esMovil && setAbierto(false)}
    >
      <div className="menu-lateral-header">
        {!esMovil && (
          <button
            className="menu-lateral-toggle"
            onClick={() => setAbierto(!abierto)}
            title={abierto ? "Colapsar" : "Expandir"}
          >
            {abierto ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        )}
        {abierto && !esMovil && (
          <span className="menu-lateral-logo">UTNTech</span>
        )}
      </div>

      <ul className="menu-lateral-list">
        {categorias.map((cat) => (
          <li
            key={cat.nombre}
            className="menu-lateral-item"
            onClick={() => handleCategoriaClick(cat.nombre)}
          >
            <span className="menu-lateral-icon">{cat.icon}</span>
            {abierto && !esMovil && (
              <span className="menu-lateral-text">{cat.nombre}</span>
            )}
            {esMovil && (
              <span className="menu-lateral-text">{cat.nombre}</span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
