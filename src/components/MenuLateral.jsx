import React from "react";

export default function MenuLateral() {
  const categorias = [
    "Computadoras y Tablets",
    "Celulares",
    "Audio",
    "TV y Proyección",
    "Hogar y Oficina",
  ];

  return (
    <div className="menu-lateral">
      <ul>
        {categorias.map((cat) => (
          <li key={cat}>{cat}</li>
        ))}
      </ul>
    </div>
  );
}
