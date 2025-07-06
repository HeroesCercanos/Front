"use client";

import { LogIn, ChevronDown } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const getDropdownClasses = (menu: string) => {
    const isOpen = openMenu === menu;
    return `
      absolute top-full mt-2 bg-white text-black shadow-lg rounded p-2 space-y-1 z-50 origin-top
      transform transition-all duration-300 ease-in-out
      ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}
    `;
  };

  return (
    <nav className="bg-black text-white py-2 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <ul className="flex gap-8 text-xs md:text-sm font-semibold relative">
          
          <li className="relative">
            <button
              onClick={() => toggleMenu("donaciones")}
              className="flex items-center gap-1 hover:underline"
            >
              Donaciones y campañas <ChevronDown className="w-4 h-4" />
            </button>
            <div className={getDropdownClasses("donaciones")}>
              <a href="#activas" className="block hover:underline">Campañas activas</a>
              <a href="#campanias" className="block hover:underline">Recursos entregados</a>
            </div>
          </li>

          
          <li className="relative">
            <button
              onClick={() => toggleMenu("cuartel")}
              className="flex items-center gap-1 hover:underline"
            >
              Cuartel <ChevronDown className="w-4 h-4" />
            </button>
            <div className={getDropdownClasses("cuartel")}>
              <a href="#mapa" className="block hover:underline">¿Dónde estamos?</a>
              <a href="#necesidades" className="block hover:underline">Necesidades actuales</a>
            </div>
          </li>

          
          <li className="relative">
            <button
              onClick={() => toggleMenu("info")}
              className="flex items-center gap-1 hover:underline"
            >
              Información <ChevronDown className="w-4 h-4" />
            </button>
            <div className={getDropdownClasses("info")}>
              <a href="#faq" className="block hover:underline">Preguntas frecuentes</a>
              <a href="#capacitaciones" className="block hover:underline">Capacitaciones</a>
            </div>
          </li>
        </ul>

        
        <button aria-label="Iniciar sesión">
          <LogIn className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
