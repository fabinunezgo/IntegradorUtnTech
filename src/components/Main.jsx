import React from "react";
import { sucursales, productos } from "../data";

function Main({ view, setModalSucursal }) {
  const renderCards = () => {
    if (view === "inicio") {
      return sucursales.map((s) => (
        <div
          key={s.name}
          onClick={() => setModalSucursal(s)}
        >
          <img src={s.icon} alt={s.category} />
          <h3>{s.name}</h3>
          <p>{s.category}</p>
        </div>
      ));
    } else {
      const filtered = productos.filter((p) => p.category === view);
      return filtered.map((p) => (
        <div
          key={p.name}
          onClick={() => alert(`Producto: ${p.name}\nCategoría: ${p.category}\nSucursal: ${p.sucursal}`)}
        >
          <h3>{p.name}</h3>
          <p>{p.category}</p>
        </div>
      ));
    }
  };

  return <main>{renderCards()}</main>;
}

export default Main;
