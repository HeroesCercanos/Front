'use client'

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Header = () => {

  const {userData} = useAuth();

  return (
    <header className="bg-gradient-to-r from-red-700 to-red-500 text-white py-6 px-4 sm:px-8 md:px-16">
      <div className="h-[15vh] min-h-[80px] max-h-[150px] w-full bg-gradient-to-r from-red-700 to-red-500 text-white px-4 md:px-0.5 flex items-center justify-between">
        <div className="flex justify-center gap-4">
          <Link href="/" aria-label="Ir al inicio">
            <img
              src="/logo-heroes.png"
              alt="Logo Héroes"
              className="w-16 h-auto cursor-pointer"
            />
          </Link>
        </div>



        <div className="text-center sm:text-right leading-tight">
          <h1 className="text-3xl sm:text-3xl md:text-4xl font-heading uppercase font-bold tracking-wide">
            HÉROES <br /> CERCANOS
          </h1>
          <p className="text-sm sm:text-base font-sans">
            {userData
              ? `¡Hola, ${userData.user.name}!`
              : "RED DE APOYO Y COMUNIDAD"}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
