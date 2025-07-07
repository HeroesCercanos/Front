"use client";

import { Flame } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

const MapSelector = dynamic(() => import("./MapSelector").then((mod) => mod.MapSelector), {
  ssr: false,
});


export const ReportButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [ubicacionCoords, setUbicacionCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [ubicacionTexto, setUbicacionTexto] = useState("");

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(255,0,0,0.7)] border-2 border-red-600 hover:scale-110 transition-transform duration-200"
        aria-label="Reportar incidente"
        onClick={() => setShowModal(true)}
      >
        <Flame className="w-6 h-6 text-red-500" />
        <span className="hidden sm:inline font-semibold text-base">Reportar</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl relative">
            <h2 className="text-xl font-bold mb-4 text-red-600">Reportar incidente</h2>

            <form className="flex flex-col gap-4">
              
              <div>
                <label className="block text-sm font-semibold mb-1">Tipo de incidente</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option value="">Seleccionar</option>
                  <option value="incendio">Incendio</option>
                  <option value="accidente">Accidente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Ubicación</label>
                <MapSelector onLocationSelect={(coords) => setUbicacionCoords(coords)} />


                {ubicacionCoords && (
                  <p className="text-sm text-gray-600 mt-2">
                    Lat: {ubicacionCoords.lat.toFixed(4)} - Lng: {ubicacionCoords.lng.toFixed(4)}
                  </p>
                )}
                <input
                  type="text"
                  placeholder="(Opcional) Describí la ubicación: calle, referencia, etc."
                  className="mt-3 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={ubicacionTexto}
                  onChange={(e) => setUbicacionTexto(e.target.value)}
                />
              </div>

            
              <div>
                <label className="block text-sm font-semibold mb-1">Descripción</label>
                <textarea
                  rows={3}
                  placeholder="Descripción breve del incidente..."
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>

              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const confirmar = window.confirm("¿Estás segura de enviar el reporte?");
                    if (confirmar) {
                      alert("Gracias por dar aviso, enviaremos personal de bomberos a verificar.");
                      setShowModal(false);
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
