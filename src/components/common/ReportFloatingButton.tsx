"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Flame, X } from "lucide-react";
import { IncidentReportForm } from "../forms/IncidentReportForm";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export const ReportFloatingButton = () => {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { userData } = useAuth();

  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminUser = userData?.user?.role === "admin";

  if (isAdminRoute || isAdminUser) return null;

  const handleClick = () => {
    if (!userData) {
      toast.custom((t) => (
        <div
          className={`bg-white border border-yellow-300 rounded-xl shadow-lg p-4 w-[90%] max-w-md ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <h2 className="text-yellow-700 font-semibold mb-2">¡Atención!</h2>
          <p className="text-gray-700 text-sm">
            Debés iniciar sesión para reportar un incidente.
          </p>
        </div>
      ));
      router.push("/login");
      return;
    }

    setShowForm((prev) => !prev);
  };

  // Modificado: el parámetro indica si debe mostrar el toast o no
  const handleClose = (showToast = true) => {
    setShowForm(false);
    if (showToast) {
      toast("Formulario cerrado");
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="cursor-pointer fixed bottom-6 right-6 z-[9999] flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(255,0,0,0.7)] border-2 border-red-600 hover:scale-110 transition-transform duration-200"
        aria-label={showForm ? "Cerrar formulario de reporte" : "Reportar incidente"}
      >
        {showForm ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Flame className="w-6 h-6 text-red-500 cursor-pointer" />
        )}
        <span className="hidden sm:inline font-semibold text-base" aria-hidden="true">
          {showForm ? "Cerrar" : "Reportar"}
        </span>
      </button>

      {showForm && (
        <div
          className="fixed inset-0 z-[9998] backdrop-blur-sm bg-black/10 flex justify-center items-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          onClick={() => handleClose()} // cierre por click en fondo
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-hide">
              {/* Título + botón X */}
              <div className="flex justify-between items-start mb-4">
                <h2 id="modal-title" className="text-xl font-bold">
                  Reportar incidente
                </h2>
                <button
                  type="button"
                  onClick={() => handleClose()}
                  className="text-gray-500 hover:text-red-600 text-xl cursor-pointer"
                  aria-label="Cerrar formulario"
                >
                  &times;
                </button>
              </div>

              <p id="modal-desc" className="text-sm text-gray-600 mb-4">
                Completá el siguiente formulario para reportar un incendio o accidente.
              </p>

              
              <IncidentReportForm onClose={handleClose} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};



