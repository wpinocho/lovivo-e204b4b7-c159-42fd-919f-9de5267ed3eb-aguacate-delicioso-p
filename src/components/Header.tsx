import { Leaf, Sparkles } from "lucide-react";

export const Header = () => {
  console.log("Header component rendered");
  
  return (
    <header className="bg-white shadow-sm border-b border-green-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              {/* Fondo con gradiente y efecto glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full blur-sm opacity-75"></div>
              
              {/* Logo principal */}
              <div className="relative bg-gradient-to-br from-green-500 to-green-700 p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
                <div className="text-2xl font-bold text-white">🥑</div>
              </div>
              
              {/* Efecto sparkle */}
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent">
                Aguacates Para Todos
              </span>
              <span className="text-xs text-green-600 font-medium tracking-wider uppercase">
                Premium Fresh
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors font-medium hover:scale-105 transform duration-200">
              Inicio
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors font-medium hover:scale-105 transform duration-200">
              Nuestros Productos
            </a>
            <a href="#cotizador" className="text-gray-600 hover:text-green-600 transition-colors font-medium hover:scale-105 transform duration-200">
              Cotizador
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors font-medium hover:scale-105 transform duration-200">
              Nosotros
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors font-medium hover:scale-105 transform duration-200">
              Contacto
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};