export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-blue-600">UtnTech</a>
        <nav className="space-x-6">
          <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Inicio</span>
          <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Productos</span>
          <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Sucursales</span>
          <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Acerca de</span>
          <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Contacto</span>
        </nav>
      </div>
    </header>
  );
}
