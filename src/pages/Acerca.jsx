import React, { useState } from "react";
import { FaLaptop, FaMobileAlt, FaHeadphones, FaTv, FaHome, FaEnvelope, FaPhone, FaTimes } from "react-icons/fa";
import "../css/acerca.css";

const iconos = {
  "Computadoras y Tablets": <FaLaptop className="sucursal-icon azul" />,
  "Celulares": <FaMobileAlt className="sucursal-icon azul" />,
  "Audio": <FaHeadphones className="sucursal-icon azul" />,
  "TV y Proyección": <FaTv className="sucursal-icon azul" />,
  "Hogar y Oficina": <FaHome className="sucursal-icon azul" />,
};

const sucursales = [
  { 
    id: "a",
    name: "Sucursal A", 
    category: "Computadoras y Tablets", 
    descripcion: "Especializada en Computadoras y Tablets de las mejores marcas.", 
    miembros: [
      { nombre:"Carlos David Gonzalez Obando", rol:"Virtualización y Data Center", correo:"cagonzalezob@est.utn.ac.cr", telefono:"89414812" },
      { nombre:"Emmanuel Sanchez Rojas", rol:"Gestión de Identidades y Servicios de Red Básicos", correo:"emsanchezroj@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Johel Mejias Matarrita", rol:"Comunicaciones y Conectividad", correo:"jomejiasma@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Erik Daniel Warnke Vargas", rol:"Comunicaciones y Conectividad", correo:"erwarnkeva@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Carlos Matias Zuñiga Carazo", rol:"Servicios Corporativos y Aplicaciones", correo:"cazunigaca@est.utn.ac.cr", telefono:"88887777" },
    ]
  },
  { 
    id: "b",
    name: "Sucursal B", 
    category: "Celulares", 
    descripcion: "Especializada en venta de celulares y accesorios.", 
    miembros: [
      { nombre:"Dashly Valeria Obando Somarribas", rol:"Virtualización y Data Center", correo:"daobandoso@est.utn.ac.cr", telefono:"89414812" },
      { nombre:"Zulay Johanna Rojas Cordero", rol:"Servicios Corporativos y Aplicaciones", correo:"zurojasco@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Daniel Josue Delgado Alvarado", rol:"Virtualización y Data Center", correo:"dadelgadoal@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Ricardo Felipe Muñoz Rojas", rol:"Gestión de Identidades y Servicios de Red Básicos", correo:"rimunozro@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Dering Esteban Salazar Salguero", rol:"Comunicaciones y Conectividad", correo:"desalazarsa@est.utn.ac.cr", telefono:"88887777" },
    ]
    },
  { 
    id: "c",
    name: "Sucursal C", 
    category: "Audio", 
    descripcion: "Especializada en Audio Profesional.", 
    miembros: [
      { nombre:"Gerald Andres Alfaro Solorzano", rol:"Virtualización y Data Center", correo:"gealfaros@est.utn.ac.cr", telefono:"89414812" },
      { nombre:"Kristy Daniela Alvarado Gutierrez", rol:"Gestión de Identidades y Servicios de Red Básicos", correo:"kralvaradogu@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Lesly Judith Araya Mora", rol:"Comunicaciones y Conectividad", correo:"lesarayamor@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Linsey Fabiana Núñez González", rol:"Servicios Corporativos y Aplicaciones", correo:"linunezgo@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Thyfanny Maryel Martinez Gomez", rol:"Gestión de Identidades y Servicios de Red Básicos", correo:"thmartinezgo@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Andres Jesus Gutierrez Herrera", rol:"Virtualización y Data Center", correo:"andresjesusgut424@gmail.com", telefono:"88887777" },
    ]
  },
  { 
    id: "d",
    name: "Sucursal D", 
    category: "TV y Proyección", 
    descripcion: "Venta y configuración de sistemas de TV y Proyección.", 
    miembros: [
      { nombre:"Ibisay Daniela Gutierrez Alvarado", rol:"Servicios Corporativos y Aplicaciones", correo:"ibgutierrezal@est.utn.ac.cr", telefono:"89414812" },
      { nombre:"Fernando Jose Bolivar Brenes", rol:"Servicios Corporativos y Aplicaciones", correo:"febolivarbr@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Derek Gonzalez Barquero", rol:"Virtualización y Data Center", correo:"degonzalezba@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Dylan Andres Segura Sevilla", rol:"Virtualización y Data Center", correo:"dysegurase@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Christofer Hernandez Garcia", rol:"Comunicaciones y Conectividad", correo:"chhernandezga@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Anthony Jafet Conejo Rodriguez", rol:"Gestión de Identidades y Servicios de Red Básicos", correo:"anconejoro@est.utn.ac.cr", telefono:"88887777" },
    ]
  },
  { 
    id: "e",
    name: "Sucursal E", 
    category: "Hogar y Oficina", 
    descripcion: "Artículos para Oficina y Gaming.", 
    miembros: [
      { nombre:"Isaac Alonso Sibaja Mora", rol:"Virtualización y Data Center", correo:"issibajamo@est.utn.ac.cr", telefono:"89414812" },
      { nombre:"Andrey Rugama Rodriguez", rol:"Virtualización y Data Center", correo:"anrugamaro@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Esteban Arturo Quiros Alfaro", rol:"Gestión de Identidades y Servicios de Red Básicos", correo:"esquirosa@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Wendy Maria Martinez Lopez", rol:"Servicios Corporativos y Aplicaciones", correo:"wemartinezlo@est.utn.ac.cr", telefono:"88887777" },
      { nombre:"Fiorella Jimenez Alvarado", rol:"Comunicaciones y Conectividad", correo:"fijimenezal@est.utn.ac.cr", telefono:"88887777" },
    ]
  }
];

export default function Acerca() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);

  const abrirModal = (sucursal) => {
    setSucursalSeleccionada(sucursal);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setSucursalSeleccionada(null);
  };

  return (
    <div className="acerca-container">
      <h2>Acerca de Nuestras Sucursales</h2>
      <div className="linea-amarilla-acerca"></div> 
      <div className="sucursales-grid">
        {sucursales.map((s) => (
          <div key={s.id} className="sucursal-card" onClick={() => abrirModal(s)}>
            {iconos[s.category]}
            <h3 className="categoria">{s.category}</h3>
            <h2 className="nombre-sucursal">{s.name}</h2>
          </div>
        ))}
      </div>

{/* Modal */}
{modalOpen && sucursalSeleccionada && (
  <div className="modal-backdrop" onClick={cerrarModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button onClick={cerrarModal} className="modal-close">
      <FaTimes />
      </button>

      {/* Sucursal */}
      <h2 className="modal-titulo">{sucursalSeleccionada.name}</h2>
      <div className="linea-amarilla"></div>
      <p className="descripcion">{sucursalSeleccionada.descripcion}</p>

      {/* Miembros */}
      <h3 className="modal-titulo miembros-titulo">Miembros</h3>
      <div className="miembros-lista izquierda">
        {sucursalSeleccionada.miembros.map((m, i) => (
          <div key={i} className="miembro-card">
            <p className="miembro-nombre">{m.nombre}</p>
            <p className="miembro-rol">{m.rol}</p>
            <p className="contacto"><FaEnvelope /> {m.correo}</p>
            <p className="contacto"><FaPhone /> {m.telefono}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
    </div>
  );
}
