import React from "react";
import { FaLaptop, FaMobileAlt, FaHeadphones, FaTv, FaHome } from "react-icons/fa";
import "../css/acerca.css";

const iconos = {
  "Computadoras y Tablets": <FaLaptop className="sucursal-icon" />,
  "Celulares": <FaMobileAlt className="sucursal-icon" />,
  "Audio": <FaHeadphones className="sucursal-icon" />,
  "TV y Proyección": <FaTv className="sucursal-icon" />,
  "Hogar y Oficina": <FaHome className="sucursal-icon" />,
};

const sucursales = [
  { name: "Sucursal A", category: "Computadoras y Tablets", info: "Ubicación: Centro | Miembros: Juan, Ana" },
  { name: "Sucursal B", category: "Celulares", info: "Ubicación: Norte | Miembros: Luis, Carla" },
  { name: "Sucursal C", category: "Audio", info: "Ubicación: Sur | Miembros: Marta, Pedro" },
  { name: "Sucursal D", category: "TV y Proyección", info: "Ubicación: Este | Miembros: Elena, Diego" },
  { name: "Sucursal E", category: "Hogar y Oficina", info: "Ubicación: Oeste | Miembros: Sofia, Marco" },
];

export default function Acerca() {
  return (
    <div className="sucursales-grid">
      {sucursales.map((s) => (
        <div key={s.name} className="sucursal-card">
          {iconos[s.category]}
          <h3>{s.category}</h3>
          <h2>{s.name}</h2>
          <p>{s.info}</p>
        </div>
      ))}
    </div>
  );
}