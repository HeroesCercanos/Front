"use client";

import { Flame } from "lucide-react";

export const ReportButton = () => {
  return (
    <button
  className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(255,0,0,0.7)] border-2 border-red-600 hover:scale-110 transition-transform duration-200"
  aria-label="Reportar incidente"
  onClick={() => console.log("Abrir modal para reportar incidente")}
>
  <Flame className="w-6 h-6 text-red-500" />
  <span className="hidden sm:inline font-semibold text-base">Reportar</span>
</button>

  );
};
