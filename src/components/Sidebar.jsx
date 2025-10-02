import React from "react";

export default function Sidebar({ setView, setShowAcerca }) {
  const opciones = [
    "inicio",
    "Computadoras y Tablets",
    "Celulares",
    "Audio",
    "TV y Proyección",
    "Hogar y Oficina",
    "acerca",
  ];

  return (
    <aside>
      <h3>Menú</h3>
      <ul>
        {opciones.map((op) => (
          <li key={op}>
            <button onClick={() => (op === "acerca" ? setShowAcerca(true) : setView(op))}>
              {op}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
