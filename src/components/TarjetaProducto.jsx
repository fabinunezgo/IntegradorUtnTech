import React from "react";
import { FaLaptop, FaMobileAlt, FaHeadphones, FaTv, FaHome, FaShoppingCart } from "react-icons/fa";
import "../css/cards.css";

const categoriaIconos = {
  "Computadoras y Tablets": <FaLaptop className="categoria-icono" />,
  "Celulares": <FaMobileAlt className="categoria-icono" />,
  "Audio": <FaHeadphones className="categoria-icono" />,
  "TV y Proyección": <FaTv className="categoria-icono" />,
  "Hogar y Oficina": <FaHome className="categoria-icono" />,
};

export default function TarjetaProducto({ producto }) {
  return (
    <div className="producto-card">
      {categoriaIconos[producto.categoria]}
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