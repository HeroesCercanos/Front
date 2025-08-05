"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Flame, X, PhoneOutgoing } from "lucide-react";
import { IncidentReportForm } from "../forms/IncidentReportForm";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import useSpeech from "@/helpers/useSpeech"; 

export const ReportFloatingButton = () => {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { userData } = useAuth();

  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminUser = userData?.user?.role === "admin";

  
  const toastAuthText = "¡Atención! Debés iniciar sesión para reportar un incidente.";
  const toastCloseText = "Formulario cerrado.";
  const modalText = `
  Reportar incidente. Completá el siguiente formulario para reportar un incendio o accidente. 
  Llamar al cuartel si es una emergencia.
  `;
  
  const { speak: speakModal } = useSpeech(modalText);
  const { speak: speakCloseToast } = useSpeech(toastCloseText);
  
  if (isAdminRoute || isAdminUser) return null;
  
  // Función para el TTS del toast de autenticación
  const speakAuthToast = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };
  

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
      speakAuthToast(toastAuthText);
      router.push("/login");
      return;
    }
    
    setShowForm((prev) => !prev);
    if (!showForm) { // Si el formulario se va a abrir, lee el contenido
      speakModal();
    }
  };

  const handleClose = (showToast = true) => {
    setShowForm(false);
    if (showToast) {
      toast("Formulario cerrado");
      speakCloseToast(); // Llama al TTS para el toast de cierre
    }
  };

  return (
    <>
      <button
  onClick={handleClick}
 className="cursor-pointer fixed bottom-24 sm:bottom-5 md:bottom-6 right-20 sm:right-24 md:right-32 z-[9999] flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(255,0,0,0.7)] border-2 border-red-600 hover:scale-110 transition-transform duration-200"


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
          onClick={() => handleClose()}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-hide">
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

              <div className="mt-4">
                <a
                  href="tel:100"
                  className="w-full flex items-center justify-center gap-2 bg-white 
                   text-red-600 font-semibold text-lg px-4 py-[10px] rounded-md
                   hover:bg-red-300 transition-colors uppercase"
                  aria-label="Llamar al cuartel más cercano"
                >
                  <PhoneOutgoing className="w-4 h-4" aria-hidden="true" />
                  Llamar al cuartel
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
