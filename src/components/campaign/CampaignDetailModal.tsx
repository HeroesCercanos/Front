import React from "react";
import { ICampaign } from "@/interfaces/campaign.interface";
import { FaRegHeart } from "react-icons/fa";
import { X } from "lucide-react"; 

interface Props {
  campaign: ICampaign;
  onClose: () => void;
}

const CampaignDetailModal: React.FC<Props> = ({ campaign, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative border-1">
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 text-red-600 font-semibold mb-3">
          <FaRegHeart className="text-orange-500" />
          <span>Gracias por interesarte</span>
        </div>

        <h2 className="text-xl font-heading font-bold mb-2">
          {campaign.title}
        </h2>

        <p className="text-sm text-gray-600 mb-1">
          Desde <strong>{campaign.startDate}</strong> hasta <strong>{campaign.endDate}</strong>
        </p>

        {campaign.description && (
          <p className="text-sm text-gray-800 mt-4">
            {campaign.description}
          </p>

          
        )}

         <p className="text-sm text-gray-600 mb-1">
          <br/>Para donar por esta camapaña, podes hacer click en el botón "QUIERO DONAR"
        </p>

      </div>
    </div>
  );
};

export default CampaignDetailModal;
