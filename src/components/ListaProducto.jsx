import React from "react";
import TarjetaProducto from "./TarjetaProducto";

export default function ListaProducto({ productos }) {
  if (!productos || productos.length === 0) {
    return <p>No se encontraron productos.</p>;
  }

  return (
    <div className="cards-grid-filas">
      {productos.map((p) => (
        <TarjetaProducto key={p.idProducto} producto={p} />
      ))}
    </div>
  );
}
