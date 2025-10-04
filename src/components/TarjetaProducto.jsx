import React from "react";

export default function TarjetaProducto({ producto }) {
  return (
    <div className="producto-card">
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>₡{producto.precioUnitario}</p>
      <p>{producto.categoria}</p>
    </div>
  );
}
