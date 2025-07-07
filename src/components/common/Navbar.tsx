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
    <nav
      className="bg-black text-white py-2 px-4 shadow-md"
      role="navigation"
      aria-label="Menú principal"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <ul className="flex gap-8 text-xs md:text-sm font-semibold relative ml-12">
          <li className="relative">
            <button
              onClick={() => toggleMenu("donaciones")}
              className="flex items-center gap-1 hover:underline cursor-pointer"
              aria-haspopup="true"
              aria-expanded={openMenu === "donaciones"}
              aria-controls="menu-donaciones"
            >
              Donaciones y campañas <ChevronDown className="w-4 h-4" />
            </button>
            <div
              id="menu-donaciones"
              role="menu"
              aria-label="Submenú Donaciones y campañas"
              className={getDropdownClasses("donaciones")}
            >
              <a role="menuitem" href="#campañas" className="block hover:underline cursor-pointer">
                Ver campañas
              </a>
              <a role="menuitem" href="#campanias" className="block hover:underline cursor-pointer">
                Recursos entregados
              </a>
            </div>
          </li>

          <li className="relative">
            <button
              onClick={() => toggleMenu("cuartel")}
              className="flex items-center gap-1 hover:underline cursor-pointer"
              aria-haspopup="true"
              aria-expanded={openMenu === "cuartel"}
              aria-controls="menu-cuartel"
            >
              Cuartel <ChevronDown className="w-4 h-4" />
            </button>
            <div
              id="menu-cuartel"
              role="menu"
              aria-label="Submenú Cuartel"
              className={getDropdownClasses("cuartel")}
            >
              <a role="menuitem" href="#cuartel" className="block hover:underline cursor-pointer">
                ¿Dónde estamos?
              </a>
              <a role="menuitem" href="#necesidades" className="block hover:underline cursor-pointer">
                Necesidades actuales
              </a>
            </div>
          </li>

          <li className="relative">
            <button
              onClick={() => toggleMenu("info")}
              className="flex items-center gap-1 hover:underline cursor-pointer"
              aria-haspopup="true"
              aria-expanded={openMenu === "info"}
              aria-controls="menu-info"
            >
              Información <ChevronDown className="w-4 h-4" />
            </button>
            <div
              id="menu-info"
              role="menu"
              aria-label="Submenú Información"
              className={getDropdownClasses("info")}
            >
              <a role="menuitem" href="#faq" className="block hover:underline cursor-pointer">
                Preguntas frecuentes
              </a>
              <a role="menuitem" href="#capacitaciones" className="block hover:underline cursor-pointer">
                Capacitaciones
              </a>
            </div>
          </li>
        </ul>

        <button aria-label="Iniciar sesión">
          <LogIn className="w-5 h-5 mr-12 cursor-pointer" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
