"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { userData } = useAuth();

  return (
    <header className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-6 sm:px-6 md:px-8 lg:px-16 gap-2 sm:gap-0">
        
        <Link href="/" aria-label="Ir al inicio">
          <img
            src="/logo-heroes.png"
            alt="Logo Héroes"
            className="w-16 h-auto sm:w-20 md:w-24 cursor-pointer"
          />
        </Link>

        <div className="text-center sm:text-right leading-tight">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading uppercase font-bold tracking-wide">
            HÉROES <br className="hidden sm:block" /> CERCANOS
          </h1>
          <p className="text-xs sm:text-sm md:text-base">
            {userData
              ? userData.user.role === "admin"
                ? "ADMINISTRADOR"
                : `¡Hola, ${userData.user.name}!`
              : "RED DE APOYO Y COMUNIDAD"}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
