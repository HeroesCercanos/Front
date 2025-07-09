"use client";

import React, { useState } from "react";
import CampaignList from "@/components/campaign/CampaignList";
import { preLoadCampaigns } from "@/helpers/preLoadCampaigns";
import DonationForm from "../forms/DonationsForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Campaigns = () => {
  const { userData } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDonateClick = () => {
    if (userData) {
      setIsModalOpen(true);
    } else {
      router.push("/login");
    }
  };

  return (
    <section
      id="campañas"
      className="w-full px-4 md:px-16 py-12 bg-gray-100 text-black"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold uppercase text-center mb-8">
          Campañas y donaciones
        </h2>

        <CampaignList campaigns={preLoadCampaigns} />

        <button
          onClick={handleDonateClick}
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
      </div>
    </section>
  );
};

export default Campaigns;
