export default function ModalAcerca({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">✖</button>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Acerca de UtnTech</h2>
        <p className="text-gray-700">
          Somos un equipo de desarrolladores de la Universidad Técnica Nacional que ha creado una plataforma web dinámica para la gestión de productos tecnológicos y sucursales.
          Nuestro objetivo es ofrecer una solución intuitiva y eficiente para mostrar productos, filtrar categorías y gestionar información de las sucursales de forma clara y sencilla.
        </p>
      </div>
    </div>
  );
}
