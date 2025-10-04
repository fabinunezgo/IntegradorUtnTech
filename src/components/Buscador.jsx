export default function Buscador({ onBuscar }) {
  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar productos..."
        onChange={(e) => onBuscar(e.target.value)}
      />
    </div>
  );
}
