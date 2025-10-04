import React from "react";

const sucursales = [
  { name: "Sucursal A", category: "Computadoras y Tablets", info: "Ubicación: Centro | Miembros: Juan, Ana" },
  { name: "Sucursal B", category: "Celulares", info: "Ubicación: Norte | Miembros: Luis, Carla" },
  { name: "Sucursal C", category: "Audio", info: "Ubicación: Sur | Miembros: Marta, Pedro" },
  { name: "Sucursal D", category: "TV y Proyección", info: "Ubicación: Este | Miembros: Elena, Diego" },
  { name: "Sucursal E", category: "Hogar y Oficina", info: "Ubicación: Oeste | Miembros: Sofia, Marco" },
];

export default function Acerca() {
  return (
    <main>
      {sucursales.map((s) => (
        <div key={s.name} className="sucursal-card">
          <h3>{s.category}</h3>
          <h2>{s.name}</h2>
          <p>{s.info}</p>
        </div>
      ))}
    </main>
  );
}
