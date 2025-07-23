"use client";

import { useEffect, useState } from "react";
import { Pencil, PlusCircle, BookmarkCheck } from "lucide-react";
import Sidebar from "./Sidebar";
import CreateCampaignForm from "../forms/CampaignForm";
import Modal from "../campaign/CampaignModal";
import { API_BASE_URL } from "@/config/api";

type Campaign = {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: string;
  isActive: boolean;
};

const AdminCampaignList = () => {
  const [showModal, setShowModal] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/campaigns`);
      const data = await res.json();

      const campaignsWithActiveFlag = data.map((c: any) => {
        const now = new Date();
        const end = new Date(c.endDate);
        return {
          ...c,
          isActive: now <= end,
        };
      });

      setCampaigns(campaignsWithActiveFlag);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleFinishCampaign = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/campaigns/${id}/finish`, {
        method: "PATCH",
      });

      if (!res.ok) {
        throw new Error("No se pudo finalizar la campaña.");
      }

      fetchCampaigns();
    } catch (error) {
      console.error("Error al finalizar campaña:", error);
    }
  };

  const handleEditClick = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 flex flex-col w-full px-6 py-10 md:px-12 lg:px-16 bg-white pb-28">
        <section className="max-w-7xl w-full mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase">
              Campañas
            </h2>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              <PlusCircle size={18} />
              Crear campaña
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-gray-100 p-6 rounded-lg shadow-inner drop-shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {campaign.title}
                  </h3>
                </div>
                <p className="text-gray-700 text-sm mb-2">
                  {campaign.description}
                </p>
                <p className="text-xs text-gray-500">
                  Desde {campaign.startDate} hasta {campaign.endDate}
                </p>
                <p
                  className={`text-xs font-semibold mt-2 ${
                    campaign.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {campaign.isActive ? "Activa" : "Finalizada"}
                </p>

                <div className="flex gap-4 mt-4 justify-end">
                  <Pencil
                    size={20}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer transition"
                    aria-label="Editar campaña"
                    onClick={() => handleEditClick(campaign)}
                  />
                  <BookmarkCheck
                    size={20}
                    className="text-green-600 hover:text-red-800 cursor-pointer transition"
                    aria-label="Finalizar campaña"
                    onClick={() => handleFinishCampaign(campaign.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <CreateCampaignForm
          onClose={() => setShowModal(false)}
          refreshCampaigns={fetchCampaigns}
        />
      </Modal>
    </div>
  );
};

export default AdminCampaignList;
