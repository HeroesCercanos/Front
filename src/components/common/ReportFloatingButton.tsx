"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flame, X } from "lucide-react";
import { IncidentReportForm } from "../forms/IncidentReportForm";
import { useAuth } from "@/context/AuthContext";

export const ReportFloatingButton = () => {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const { userData } = useAuth();

  const handleClick = () => {
   // Protección desactivada temporalmente hasta conectar con el backend
   // if (!userData) {
   //  router.push("/login");
   //   return;
   // }
    setShowForm((prev) => !prev); 
  };

  const handleClose = () => setShowForm(false);

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(255,0,0,0.7)] border-2 border-red-600 hover:scale-110 transition-transform duration-200"
        aria-label="Reportar incidente"
      >
        {showForm ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Flame className="w-6 h-6 text-red-500" />
        )}
        <span className="hidden sm:inline font-semibold text-base">
          {showForm ? "Cerrar" : "Reportar"}
        </span>
      </button>

      {showForm && (
        <div
          className="fixed inset-0 z-[9998] backdrop-blur-sm bg-black/10 flex justify-center items-center px-4"
          onClick={handleClose}
        >
          <div
            className="bg-white p-4 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <IncidentReportForm />
          </div>
        </div>
      )}
    </>
  );
};
