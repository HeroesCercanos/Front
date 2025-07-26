import { ICampaign } from "@/interfaces/campaign.interface";
import React, { useState } from "react";
import CampaignModal from "./CampaignModal";
import { FaRegHeart } from "react-icons/fa";
import CampaignDetailModal from "./CampaignDetailModal";

interface Props {
  campaign: ICampaign;
  index?: number;
}

const phrases = [
   "¡Tu ayuda puede hacer la diferencia!",
  "Cada aporte acerca más a nuestros héroes.",
  "Sumate a esta causa solidaria 💪",
  "Un pequeño gesto puede salvar vidas.",
  "Estás a un clic de ayudar",
  "¡Gracias por estar cerca de quienes nos cuidan!",
  "Juntos llegamos más lejos 🫶",
  "Apoyar es también ser parte del equipo 🚒",
  "Tu solidaridad enciende esperanza 🔥",
  "Ellos nos cuidan, ¡hoy podés cuidarlos vos!",
  "Un acto de amor puede ser un gran cambio",
  "Cada donación es un paso hacia la seguridad",
  "Con tu ayuda, todo es posible 💫",
  "No hace falta ser bombero para salvar una vida",
  "Tu compromiso vale oro 🔥",

];

const CampaignCard: React.FC<Props> = ({ campaign, index = 0 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!campaign.isActive) return null;

const phrase = phrases[Math.floor(Math.random() * phrases.length)];

  return (
    <div className="border rounded-lg shadow-md p-4 w-full max-w-xs bg-white hover:shadow-lg transition">
      <div className="flex items-center gap-2 mb-2 text-sm text-black-600 font-medium">
        <FaRegHeart className="text-orange-500" />
        <span>{phrase}</span>
      </div>

      <h3 className="text-lg font-heading font-bold mb-2">{campaign.title}</h3>

      <p className="text-xs text-gray-500 mb-2">
        Finaliza el {campaign.endDate}
        <br/>¡Aún estás a tiempo!
      </p>

      {/* Botones verticales */}
      <div className="flex flex-col gap-2 w-fit">

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-xl hover:bg-red-700 transition inline-block"
        >
          Ver más
        </button>
      </div>

      {isModalOpen && (
        <CampaignDetailModal
          campaign={campaign}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CampaignCard;
