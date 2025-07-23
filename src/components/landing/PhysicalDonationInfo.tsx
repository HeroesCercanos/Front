"use client";
import { MapPin, Phone, Shirt, Utensils, Hammer } from "lucide-react";
import Link from "next/link";

export const PhysicalDonationInfo = () => {
  return (
    <section
      className="bg-[#fff8e7] border border-yellow-400 rounded-2xl p-6 shadow-lg max-w-3xl mx-auto my-12"
      aria-labelledby="titulo-donaciones-fisicas"
    >
      <h2 id="titulo-donaciones-fisicas" className="text-2xl font-bold text-[#b20000] mb-4 text-center">
        ¿Cómo hacer una donación de insumos?
      </h2>

      <p className="text-base text-[#3a2c1a] mb-4 text-center">
        Actualmente podés acercar tus donaciones directamente al siguiente cuartel:
      </p>

      <div className="bg-white rounded-xl p-4 border border-yellow-300 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <MapPin className="text-yellow-600 w-6 h-6" aria-hidden="true" />
          <div>
            <p className="text-[#3a2c1a] font-semibold">Monte Caseros, Corrientes</p>
            <p className="text-sm text-[#3a2c1a]">Colón 643</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
          <Phone className="text-yellow-600 w-6 h-6" aria-hidden="true" />
          <p className="text-sm text-[#3a2c1a]">
            Teléfono: <a href="tel:+543775422207" className="underline hover:text-yellow-700">(03775) 422207</a>
          </p>
        </div>
      </div>

      <p className="text-[#3a2c1a] font-medium mb-3">¿Qué podés donar?</p>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[#3a2c1a] mb-6">
        <li className="flex items-center gap-2">
          <Shirt className="w-5 h-5 text-yellow-700" aria-hidden="true" />
          <span>Ropa en buen estado</span>
        </li>
        <li className="flex items-center gap-2">
          <Utensils className="w-5 h-5 text-yellow-700" aria-hidden="true" />
          <span>Alimentos no perecederos</span>
        </li>
        <li className="flex items-center gap-2">
          <Hammer className="w-5 h-5 text-yellow-700" aria-hidden="true" />
          <span>Herramientas manuales</span>
        </li>
      </ul>

      <div className="text-center">
        <Link
          href="/mapa"
          className="inline-block bg-[#b20000] hover:bg-red-800 text-white py-2 px-4 rounded-full transition-colors"
        >
          Ver en el mapa
        </Link>
      </div>
    </section>
  );
};
