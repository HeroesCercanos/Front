"use client";

import React from "react";
import CampaignList from "@/components/campaign/CampaignList";
import { preLoadCampaigns } from "@/helpers/preLoadCampaigns";
import DonateButton from "@/components/common/DonateButton";

const Campaigns = () => {
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

        <DonateButton />
      </div>
    </section>
  );
};

export default Campaigns;
