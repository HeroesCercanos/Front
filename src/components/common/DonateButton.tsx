"use client";

import { ReactNode, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import DonationForm from "../forms/DonationsForm";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import useSpeech from "@/helpers/useSpeech"; 

interface Props {
  children?: ReactNode;
}

export default function DonateButton({ children }: Props) {
  const { userData } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toastTitle = "¡Atención!";
  const toastDescription = "Debés iniciar sesión para hacer una donación.";
  const modalText = "Formulario de donación. Completa los campos para realizar tu contribución. Monto y nombre de la campaña";

  const { speak: speakModal } = useSpeech(modalText);
  const { speak: speakDonateButton } = useSpeech("Quiero donar");

  const speakToast = (title: string, description: string) => {
    if ('speechSynthesis' in window) {
      const fullText = `${title}. ${description}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
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
          <h2 className="text-yellow-700 font-semibold mb-2">{toastTitle}</h2>
          <p className="text-gray-700 text-sm">
            {toastDescription}
          </p>
        </div>
      ));
      
      speakToast(toastTitle, toastDescription);

      setTimeout(() => {
        router.push("/login");
      }, 1000);

      return;
    }

    setIsModalOpen(true);
    speakModal();
  };


  return (
    <>
      {children ? (
        <div onClick={handleClick} className="cursor-pointer">
          {children}
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="mt-10 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 cursor-pointer"
        >
          <p>QUIERO DONAR</p>
        </button>
      )}

      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/30"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-lg p-8 max-w-md w-full relative shadow-lg">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
                aria-label="Cerrar modal"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4 text-center">
                Formulario de donación
              </h3>
              <DonationForm />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}