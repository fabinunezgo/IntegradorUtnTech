import React from "react";
import { sucursales, productos } from "../data";

function Main({ view, setModalSucursal }) {
  const renderCards = () => {
    if (view === "inicio") {
      return sucursales.map((s) => (
        <div
          key={s.name}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 text-center cursor-pointer flex flex-col items-center gap-2"
          onClick={() => setModalSucursal(s)}
        >
          <img src={s.icon} alt={s.category} className="mx-auto w-20 h-20" />
          <h3 className="text-xl font-semibold text-blue-600">{s.name}</h3>
          <p className="text-gray-600">{s.category}</p>
        </div>
      ));
    } else {
      const filtered = productos.filter((p) => p.category === view);
      return filtered.map((p) => (
        <div
          key={p.name}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 text-center cursor-pointer flex flex-col items-center gap-2"
          onClick={() => alert(`Producto: ${p.name}\nCategoría: ${p.category}\nSucursal: ${p.sucursal}`)}
        >
          <h3 className="text-xl font-semibold text-blue-600">{p.name}</h3>
          <p className="text-gray-600">{p.category}</p>
        </div>
      ));
    }
  };

  return (
    <main className="flex-1 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {renderCards()}
    </main>
  );
}

export default Main;
