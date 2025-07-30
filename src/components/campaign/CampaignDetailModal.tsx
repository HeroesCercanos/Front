
import { ICampaign } from "@/interfaces/campaign.interface";
import { FaRegHeart } from "react-icons/fa";
import { X } from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import {
  FaWhatsapp
} from "react-icons/fa";
import DonateButton from "../common/DonateButton";

interface Props {
  campaign: ICampaign;
  onClose: () => void;
}

const CampaignDetailModal: React.FC<Props> = ({ campaign, onClose }) => {
  const campaignUrl = ("https://heroes-cercanos-front.onrender.com/#campaigns");

   const today = new Date();
  const end = new Date(campaign.endDate);
  const diffMs = end.getTime() - today.getTime();
  const daysLeft = Math.max(Math.ceil(diffMs / (1000 * 60 * 60 * 24)), 0);

  const message = `📣 *${campaign.title}*\n\n${
    campaign.description ?? ""
  }\n\n⏳ Finaliza en *${daysLeft}* día${daysLeft !== 1 ? "s" : ""}! Aún estás a tiempo de ayudar 🚒❤️\n${campaignUrl}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
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
          Desde <strong>{campaign.startDate}</strong> hasta{" "}
          <strong>{campaign.endDate}</strong>
        </p>

        {campaign.description && (
          <p className="text-sm text-gray-800 mt-4 mb-4">{campaign.description}</p>
        )}

        {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
          message
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-2 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
        aria-label="Compartir en WhatsApp"
      >
        <FaWhatsapp className="w-5 h-5" /> Compartir por WhatsApp
      </a>

        <div className="flex justify-center">
        <p className="text-sm text-gray-600 mb-1 text-center">
          <br />
          Para donar por esta camapaña, podes hacer click en el botón "QUIERO
          DONAR" indicando "{campaign.title}"
        </p>
        <DonateButton/>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailModal;
