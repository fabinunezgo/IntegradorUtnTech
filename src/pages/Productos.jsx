const productos = [
  {name: "Laptop Lenovo", category: "Computadoras y Tablets", sucursal: "Sucursal A"},
  {name: "iPad Pro", category: "Computadoras y Tablets", sucursal: "Sucursal A"},
  {name: "iPhone 15", category: "Celulares", sucursal: "Sucursal B"},
  {name: "Parlante JBL", category: "Audio", sucursal: "Sucursal C"},
  {name: "TV LG 55\"", category: "TV y Proyección", sucursal: "Sucursal D"},
  {name: "Escritorio", category: "Hogar y Oficina", sucursal: "Sucursal E"},
];

export default function Productos({ categoria }) {
  const filtrados = productos.filter((p) => p.category === categoria);

  return (
    <>
      {filtrados.map((p) => (
        <div
          key={p.name}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 text-center flex flex-col items-center gap-2"
        >
          <h3 className="text-xl font-semibold text-blue-600">{p.name}</h3>
          <p className="text-gray-600">{p.category}</p>
        </div>
      ))}
    </>
  );
}
