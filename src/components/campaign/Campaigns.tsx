"use client";

import React, { useEffect, useState } from "react";
import DonateButton from "@/components/common/DonateButton";
import { getCampaigns } from "@/helpers/getCampaigns";
import CampaignList from "@/components/campaign/CampaignList"; // asegurate que este sea el componente correcto

type Campaign = {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: string;
};

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Error al cargar campañas:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section
      id="campañas"
      className="w-full px-4 sm:px-8 md:px-16 py-12 bg-gray-100 text-black"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase text-center mb-8">
          Campañas y donaciones
        </h2>

        <CampaignList campaigns={campaigns} />

        <DonateButton />
      </div>
    </section>
  );
};

export default Campaigns;
