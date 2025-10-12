import React from "react";
import "../css/encabezado.css"; // para que tome los estilos

export default function Buscador({ onBuscar }) {
  return (
    <div className="buscador-contenedor">
      <input
        type="text"
        placeholder="Buscar productos..."
        className="buscador-input"
        onChange={(e) => onBuscar(e.target.value)}
      />
    </div>
  );
}
