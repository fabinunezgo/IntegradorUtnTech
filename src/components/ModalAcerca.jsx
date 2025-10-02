import React from "react";

export default function ModalAcerca({ onClose }) {
  return (
    <div>
      <div>
        <button onClick={onClose}>✖</button>
        <h2>Acerca de UtnTech</h2>
        <p>
          Somos un equipo de desarrolladores de la Universidad Técnica Nacional que ha creado una plataforma web dinámica para la gestión de productos tecnológicos y sucursales.
          Nuestro objetivo es ofrecer una solución intuitiva y eficiente para mostrar productos, filtrar categorías y gestionar información de las sucursales de forma clara y sencilla.
        </p>
      </div>
    </div>
  );
}
