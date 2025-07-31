'use client'

import React from "react";
import TTSButton from "@/components/common/TTSButton"; 
import { FaUniversalAccess } from 'react-icons/fa'; 

const PresentationSection = () => {
  const sectionText = `
    Red de apoyo y ayuda comunitaria – Al servicio de nuestros bomberos voluntarios.
    Héroes Cercanos nace como una solución solidaria y accesible para que cualquier ciudadano pueda colaborar con donaciones de forma sencilla, directa y transparente.
    Ubicación: Monte Caseros, Corrientes – Argentina.
  `;

  return (
    <section className="relative w-full px-4 sm:px-6 md:px-16 py-12 bg-gray-300 text-black">
      <div className="absolute top-4 right-4">
        <TTSButton 
          text={sectionText} 
          icon={<FaUniversalAccess size={24} />} 
          ariaLabel="Leer toda la sección de presentación"
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 uppercase">
            Red de apoyo y ayuda comunitaria – Al servicio de nuestros bomberos voluntarios
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            Héroes Cercanos nace como una solución solidaria y accesible para
            que cualquier ciudadano pueda colaborar con donaciones de forma sencilla, directa y transparente.
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1">
            Monte Caseros
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-red-700 font-bold mb-4">
            Corrientes – Argentina
          </p>
          <img
            src="/mapa-ciudad.png"
            alt="Ubicación Monte Caseros"
            className="w-full max-w-[280px] sm:max-w-[300px] h-auto rounded-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default PresentationSection;