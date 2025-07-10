// src/components/campaigns/CampaignCard.tsx
import { ICampaign } from "@/interfaces/campaign.interface";
import React from "react";


interface Props {
  campaign: ICampaign;
}

const CampaignCard: React.FC<Props> = ({ campaign }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 w-full max-w-xs bg-white">
      <h3 className="text-lg font-heading font-bold mb-2">{campaign.title}</h3>
      <p className="text-sm font-sans text-gray-700 mb-2">{campaign.description}</p>
      <p className="text-xs text-gray-500">Desde {campaign.startDate} hasta {campaign.endDate}</p>
      <span className={`text-xs font-semibold ${campaign.isActive ? "text-green-600" : "text-red-600"}`}>
        {campaign.isActive ? "Activa" : "Finalizada"}
      </span>
    </div>
  );
};

export default CampaignCard;
