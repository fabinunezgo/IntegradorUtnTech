import React from "react";
import "./../css/servicios.css"; 

export default function Servicios() {
  return (
    <div className="servicios-container">
      <h2 className="servicios-titulo">Servicios que ofrecemos</h2>
      <div className="servicios-linea"></div>

      <div className="servicios-lista">
        <div className="servicio-item">
          <h3>Venta de Computadoras y Tablets</h3>
          <p>Ofrecemos equipos de las mejores marcas, configuraciones personalizadas y asesoría técnica.</p>
        </div>

        <div className="servicio-item">
          <h3>Venta de Celulares</h3>
          <p>Encuentra los últimos modelos con garantía, accesorios y soporte técnico especializado.</p>
        </div>

        <div className="servicio-item">
          <h3>Audio y Sonido Profesional</h3>
          <p>Equipos de alta fidelidad, altavoces, micrófonos y soluciones para eventos o estudios.</p>
        </div>

        <div className="servicio-item">
          <h3>TV y Proyección</h3>
          <p>Pantallas, proyectores y sistemas multimedia para el hogar o la oficina.</p>
        </div>

        <div className="servicio-item">
          <h3>Artículos para Oficina y Gaming</h3>
          <p>Ofrecemos sillas ergonómicas, escritorios gamer y accesorios diseñados para comodidad y estilo.</p>
        </div>
      </div>
    </div>
  );
}