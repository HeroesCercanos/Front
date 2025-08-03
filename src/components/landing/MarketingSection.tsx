"use client";

import React from "react";
import MarketingCarousel from "./MarketingCarousel";
import TTSButton from "@/components/common/TTSButton";
import { FaUniversalAccess } from 'react-icons/fa'; 

const slides = [
  { image: "/bomberos.png", alt: "Nuestros bomberos"},
  { image: "/capacitacion.png", alt: "Bomberos capacitandose"},
  { image: "/comunidad.png", alt: "Bomberos ayudando a los vecinos"},
  { image: "/incendio3.png", alt: "Bomberos en servicio"},
  { image: "/incendio4.png", alt: "En Monte Caseros"},
  { image: "/incendio5.png", alt: "Apagando el incendio"},
  { image: "/incendio6.png", alt: "Se trabajó con 5 unidades"},
  { image: "/incendio7.png", alt: "Incendio de campo"},
  { image: "/incendio8.png", alt: "Ruta 129"},
  { image: "/incendio9.png", alt: "Incendio de vehículo"},
  { image: "/incendio10.png", alt: "Incendio de banquina"},
  { image: "/incendio11.png", alt: "Incendio de automóvil"},
  { image: "/incendio12.png", alt: "Accidente en ruta 14"},
  { image: "/incendio13.png", alt: "Principio de incendio en hospital"},
  { image: "/incendio14.png", alt: "Bomberos en servicio"},
  { image: "/Niños.png", alt: "Bomberos con los niños"},
  { image: "/rescate.png", alt: "Bomberos rescatando"},
  { image: "/rescate2.png", alt: "animales perdidos"},
];

const MarketingSection: React.FC = () => {
  const allText = `
    Más que apagar incendios. Los bomberos voluntarios son personas comunes con una decisión extraordinaria:
    invertir su tiempo en formarse, capacitarse y estar al servicio de la comunidad. Ser bombero voluntario no es un trabajo. Es una forma de vivir.
    Carrusel de imágenes: 
    ${slides.map(slide => slide.alt).join(', ')}.
  `;

  return (
    <section className="py-16 bg-gray-50 relative"> 
      <div className="absolute top-4 right-4">
        <TTSButton 
          text={allText} 
          icon={<FaUniversalAccess size={24} />} 
          ariaLabel="Leer toda la sección de marketing"
        />
      </div>

      <div className="container mx-auto px-4 space-y-2">
        <h2 className="text-4xl font-bold text-red-700 text-center">
          Más que apagar incendios
        </h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Los bomberos voluntarios son personas comunes con una decisión extraordinaria: <br/> 
          invertir su tiempo en formarse, capacitarse y estar al servicio de la comunidad. <br/>
          Ser bombero voluntario no es un trabajo. <strong>Es una forma de vivir.</strong>
        </p>

        <MarketingCarousel slides={slides} intervalMs={4000}/>
      </div>
    </section>
  );
};

export default MarketingSection;