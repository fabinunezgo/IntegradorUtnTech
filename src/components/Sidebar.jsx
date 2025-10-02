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
    <aside className="w-64 bg-white p-6 rounded-2xl shadow-md">
      <h3 className="font-semibold text-lg mb-4">Menú</h3>
      <ul className="space-y-2">
        {opciones.map((op) => (
          <li key={op}>
            <button
              className="w-full text-left px-2 py-1 rounded hover:bg-blue-100"
              onClick={() => (op === "acerca" ? setShowAcerca(true) : setView(op))}
            >
              {op}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
