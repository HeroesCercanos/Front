"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import DonationForm from "../forms/DonationsForm";

const DonateButton = () => {
  const { userData } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (userData) {
      setIsModalOpen(true);
     } else {
      router.push("/login");
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="mt-10 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
      >
        QUIERO DONAR
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
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
        </div>
      )}
    </>
  );
 };

export default DonateButton;
