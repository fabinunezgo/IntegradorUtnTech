export default function ModalSucursal({ sucursal, onClose }) {
  const partes = sucursal.info.split("|");
  const miembros = partes[1].replace("Miembros:", "").split(",").map(m => m.trim());

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">✖</button>
        <h2 className="text-2xl font-bold text-blue-600 mb-2">{sucursal.name}</h2>
        <p className="text-gray-600 mb-4">
          <strong>{partes[0].trim()}</strong><br />
          <strong>Ofrece:</strong> {sucursal.category}
        </p>
        <h3 className="text-lg font-semibold mb-2">Trabajadores</h3>
        <div className="grid gap-2">
          {miembros.map((m) => (
            <div key={m} className="bg-blue-50 p-2 rounded text-gray-700">
              {m}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
