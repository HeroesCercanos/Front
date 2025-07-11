"use client";

import Link from "next/link";
import { LogIn, ChevronDown, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import LogOutButton from "./LogOutButton";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { userData } = useAuth();
  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(null); // Cierra todos los dropdowns
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getDropdownClasses = (menu: string) => {
    const isOpen = openMenu === menu;
    return `
      absolute top-full mt-2 bg-white text-black shadow-lg rounded p-2 space-y-1 z-50 origin-top
      transform transition-all duration-300 ease-in-out
      ${
        isOpen
          ? "scale-y-100 opacity-100"
          : "scale-y-0 opacity-0 pointer-events-none"
      }
    `;
  };

  return (
    <nav
      className="bg-black text-white py-2 px-4 shadow-md"
      role="navigation"
      aria-label="Menú principal"
    >
      <div
        ref={navbarRef}
        className="max-w-7xl mx-auto flex justify-between items-center"
      >
        {" "}
        <ul className="flex gap-8 text-xs md:text-sm font-semibold relative ml-12">
          <li className="relative">
            <button
              onClick={() => toggleMenu("donaciones")}
              className="flex items-center gap-1 hover:text-red-400 transition cursor-pointer"
              aria-haspopup="true"
              aria-expanded={openMenu === "donaciones"}
              aria-controls="menu-donaciones"
            >
              Campañas <ChevronDown className="w-4 h-4" />
            </button>
            <div
              id="menu-donaciones"
              role="menu"
              aria-label="Submenú Donaciones y campañas"
              className={getDropdownClasses("donaciones")}
            >
              <Link
                role="menuitem"
                href="/#campañas"
                scroll={true}
                className="block hover:text-red-400 transition cursor-pointer"
              >
                Campañas activas
              </Link>
            </div>
          </li>

          <li className="relative">
            <button
              onClick={() => toggleMenu("cuartel")}
              className="flex items-center gap-1 hover:text-red-400 transition cursor-pointer"
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
              <Link
                role="menuitem"
                href="/#cuartel"
                scroll={true}
                className="block hover:text-red-400 transition cursor-pointer"
              >
                ¿Dónde estamos?
              </Link>
            </div>
          </li>

          <li className="relative">
            <button
              onClick={() => toggleMenu("info")}
              className="flex items-center gap-1 hover:text-red-400 transition cursor-pointer"
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
              <Link
                role="menuitem"
                href="/#FAQ"
                scroll={true}
                className="block hover:text-red-400 transition cursor-pointer"
              >
                Preguntas frecuentes
              </Link>
              <Link
                role="menuitem"
                href="/#capacitaciones"
                scroll={true}
                className="block hover:text-red-400 transition cursor-pointer"
              >
                Capacitaciones
              </Link>
            </div>
          </li>
        </ul>
        {userData ? (
          <div className="flex items-center gap-4 mr-12">
            <Link
              href="/dashboard"
              aria-label="Ir al dashboard"
              className="hover:text-red-400 transition"
            >
              <User className="w-5 h-5 cursor-pointer" />
            </Link>
            <LogOutButton />
          </div>
        ) : (
          <Link
            href="/login"
            aria-label="Iniciar sesión"
            className="mr-12 hover:text-red-400 transition"
          >
            <LogIn className="w-5 h-5 cursor-pointer" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
