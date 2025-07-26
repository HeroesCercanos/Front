import React from "react";
import CampaignCard from "./CampaignCard";
import { ICampaign } from "@/interfaces/campaign.interface";

interface Props {
  campaigns: ICampaign[];
}

const CampaignList: React.FC<Props> = ({ campaigns }) => {
  return (
    <section className="py-8 px-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
      {campaigns.map((camp, i) => (
        <CampaignCard key={camp.id} campaign={camp} index={i} />
      ))}
    </section>
  );
};

export default CampaignList;
