// src/components/MarketingSection.tsx
"use client";

import React from "react";
import MarketingCarousel from "./MarketingCarousel";

const slides = [
  { image: "/bomberos.png", alt: "Nuestros bomberos"},
  { image: "/capacitacion.png", alt: "Bomberos capacitandose"},
  { image: "/carrera.png", alt: "Bomberos en las carreras"},
  { image: "/comunidad.png", alt: "Bomberos ayudando a los vecinos"},
  { image: "/incendio1.png", alt: "Bomberos en servicio"},
  { image: "/incendio3.png", alt: "Bomberos en servicio"},
  { image: "/incendio4.png", alt: "Bomberos en servicio"},
  { image: "/incendio5.png", alt: "Bomberos en servicio"},
  { image: "/incendio6.png", alt: "Bomberos en servicio"},
  { image: "/incendio7.png", alt: "Bomberos en servicio"},
  { image: "/incendio8.png", alt: "Bomberos en servicio"},
  { image: "/incendio9.png", alt: "Bomberos en servicio"},
  { image: "/incendio10.png", alt: "Bomberos en servicio"},
  { image: "/incendio11.png", alt: "Bomberos en servicio"},
  { image: "/incendio12.png", alt: "Bomberos en servicio"},
  { image: "/incendio13.png", alt: "Bomberos en servicio"},
  { image: "/incendio14.png", alt: "Bomberos en servicio"},
  { image: "/Niños.png", alt: "Bomberos con los niños"},
  { image: "/rescate.png", alt: "Bomberos rescatistas"},
  { image: "/rescate2.png", alt: "Bomberos rescatistas"},
];

const MarketingSection: React.FC = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4 space-y-2">
      <h2 className="text-4xl font-bold text-red-700 text-center">
        Más que apagar incendios
      </h2>
      <p className="text-center text-gray-700 max-w-2xl mx-auto leading-relaxed">
        Los bomberos voluntarios son personas comunes con una decisión extraordinaria: <br/> 
        invertir su tiempo en formarse, capacitarse y estar al servicio de la comunidad. <br/>
        Ser bombero voluntario no es un trabajo. <strong>Es una forma de vivir.</strong>
      </p>

      <MarketingCarousel slides={slides} intervalMs={4000} visibleCount={3}/>
    </div>
  </section>
);

export default MarketingSection;
