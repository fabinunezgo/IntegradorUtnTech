import React from "react";

const productos = [
  { name: "Laptop Lenovo", category: "Computadoras y Tablets", sucursal: "Sucursal A" },
  { name: "iPad Pro", category: "Computadoras y Tablets", sucursal: "Sucursal A" },
  { name: "iPhone 15", category: "Celulares", sucursal: "Sucursal B" },
  { name: "Parlante JBL", category: "Audio", sucursal: "Sucursal C" },
  { name: "TV LG 55\"", category: "TV y Proyección", sucursal: "Sucursal D" },
  { name: "Escritorio", category: "Hogar y Oficina", sucursal: "Sucursal E" },
];

export default function Productos({ categoria }) {
  const filtrados = productos.filter((p) => p.category === categoria);

  return (
    <>
      {filtrados.map((p) => (
        <div key={p.name}>
          <h3>{p.name}</h3>
          <p>{p.category}</p>
        </div>
      ))}
    </>
  );
}
