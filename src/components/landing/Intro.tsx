import React from "react";

const PresentationSection = () => {
  return (
    <section className="w-full px-4 md:px-16 py-12 bg-gray-300 text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase">
            Red de apoyo y ayuda comunitaria - Al servicio de nuestros bomberos voluntarios
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            Héroes Cercanos nace como una solución solidaria y accesible para
            que cualquier ciudadano pueda colaborar con donaciones de forma sencilla, directa y transparente.
          </p>
        </div>

        <div className="flex flex-col md:items-end text-center">
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Monte Caseros
          </h3>
          <p className="text-lg text-red-700 mb-2 font-bold md:text-xl">
            Corrientes - Argentina
          </p>
          <img
            src="/mapa-ciudad.png"
            alt="Ubicación Monte Caseros"
            className="w-full max-w-[300px] h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default PresentationSection;
