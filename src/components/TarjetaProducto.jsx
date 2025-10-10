import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "../css/cards.css";

export default function TarjetaProducto({ producto }) {
  return (
    <div className="producto-card">
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>₡{producto.precioUnitario}</p>
      <p>{producto.categoria}</p>
      <button className="btn-comprar">
        <FaShoppingCart className="icono-carrito" /> Comprar
      </button>
    </div>
  );
}