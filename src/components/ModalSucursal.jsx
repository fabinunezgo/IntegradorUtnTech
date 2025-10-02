import React from "react";

export default function ModalSucursal({ sucursal, onClose }) {
  const partes = sucursal.info.split("|");
  const miembros = partes[1].replace("Miembros:", "").split(",").map(m => m.trim());

  return (
    <div>
      <div>
        <button onClick={onClose}>✖</button>
        <h2>{sucursal.name}</h2>
        <p>
          <strong>{partes[0].trim()}</strong><br />
          <strong>Ofrece:</strong> {sucursal.category}
        </p>
        <h3>Trabajadores</h3>
        <div>
          {miembros.map((m) => (
            <div key={m}>
              {m}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
