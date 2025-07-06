import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-red-700 to-red-500 text-white py-6 px-4 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex justify-center sm:justify-start">
          <img
            src="/logo-heroes.png"
            alt="Logo Héroes"
            className="w-20 sm:w-16 md:w-20 h-auto"
          />
        </div>

        
        <div className="text-center sm:text-right leading-tight">
          <h1 className="text-3xl sm:text-3xl md:text-4xl font-heading uppercase font-bold tracking-wide">
            HÉROES <br /> CERCANOS
          </h1>
          <p className="text-sm sm:text-base font-sans">
            RED DE APOYO Y COMUNIDAD
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
