import React from "react";

const sucursales = [
  { name: "Sucursal A", category: "Computadoras y Tablets", info: "Ubicación: Centro | Miembros: Juan, Ana", icon:"https://img.icons8.com/ios-filled/100/laptop.png" },
  { name: "Sucursal B", category: "Celulares", info: "Ubicación: Norte | Miembros: Luis, Carla", icon:"https://img.icons8.com/ios-filled/100/smartphone.png" },
  { name: "Sucursal C", category: "Audio", info: "Ubicación: Sur | Miembros: Marta, Pedro", icon:"https://img.icons8.com/ios-filled/100/headphones.png" },
  { name: "Sucursal D", category: "TV y Proyección", info: "Ubicación: Este | Miembros: Elena, Diego", icon:"https://img.icons8.com/ios-filled/100/tv.png" },
  { name: "Sucursal E", category: "Hogar y Oficina", info: "Ubicación: Oeste | Miembros: Sofia, Marco", icon:"https://img.icons8.com/ios-filled/100/office.png" },
];

export default function Inicio({ setModalSucursal }) {
  return (
    <>
      {sucursales.map((s) => (
        <div key={s.name} onClick={() => setModalSucursal(s)}>
          <img src={s.icon} alt={s.category} />
          <h3>{s.name}</h3>
          <p>{s.category}</p>
        </div>
      ))}
    </>
  );
}
