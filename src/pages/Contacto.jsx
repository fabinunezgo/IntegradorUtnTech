import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import "./../css/contacto.css";

export default function Contacto() {
  return (
    <div className="contacto-page">
      <h2>Contáctanos</h2>
      <div className="linea-amarilla"></div>

      <p className="contacto-texto">
        Si deseas más información sobre nuestros servicios o tienes alguna consulta,
        no dudes en comunicarte con nosotros. ¡Estamos para ayudarte!
      </p>

      <div className="contacto-cards">
        <div className="contacto-card">
          <h3><FaEnvelope className="contacto-icon" /> Correo Electrónico</h3>
          <p>contacto@utntech.com</p>
        </div>

        <div className="contacto-card">
          <h3><FaPhone className="contacto-icon" /> Teléfono</h3>
          <p>+506 1234 5678</p>
        </div>
      </div>
    </div>
  );
}
