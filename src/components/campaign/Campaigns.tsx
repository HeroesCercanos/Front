"use client";

import React, { useEffect, useState } from "react";
import DonateButton from "@/components/common/DonateButton";
import { getCampaigns } from "@/helpers/getCampaigns";
import CampaignList from "@/components/campaign/CampaignList";
import TTSButton from "@/components/common/TTSButton"; 
import { FaUniversalAccess } from 'react-icons/fa'; 

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
  const [campaignsText, setCampaignsText] = useState<string>(''); 

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

  useEffect(() => {
    if (campaigns.length > 0) {
      const consolidatedText = campaigns.map(campaign => 
        `Campaña: ${campaign.title}. Descripción: ${campaign.description || 'Sin descripción.'}`
      ).join(' ');

      const fullText = `Campañas y donaciones. ${consolidatedText}`;
      setCampaignsText(fullText);
    } else {
      setCampaignsText('Actualmente no hay campañas disponibles.');
    }
  }, [campaigns]);

  return (
    <section
      id="campañas"
      className="w-full px-4 sm:px-8 md:px-16 py-12 bg-gray-100 text-black relative"
    >
      <div className="absolute top-4 right-4">
        <TTSButton 
          text={campaignsText} 
          icon={<FaUniversalAccess size={24} />} 
          ariaLabel="Leer campañas y donaciones"
        />
      </div>

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