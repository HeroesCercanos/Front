"use client";

import { Flame } from "lucide-react";
import { useState } from "react";

export const ReportButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
   <>
     <button
       className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(255,0,0,0.7)] border-2 border-red-600 hover:scale-110 transition-transform duration-200"
       aria-label="Reportar incidente"
       onClick={() => setShowModal(true)}>
       <Flame className="w-6 h-6 text-red-500" />
       <span className="hidden sm:inline font-semibold text-base">Reportar</span>
      </button>

     {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
         <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl">
          <h2 className="text-xl font-bold mb-4">Reporte de incidente</h2>
          <p className="text-gray-600">Este modal se usará para reportar un incendio o accidente.</p>
          <button
            onClick={() => setShowModal(false)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Cerrar
          </button>
          </div>
        </div>
      )}
    </>
  );
};

