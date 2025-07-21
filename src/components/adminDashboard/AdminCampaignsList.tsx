"use client";

import { useEffect, useState } from "react";
import { getCampaigns } from "@/helpers/getCampaigns";
import { Pencil, PlusCircle, BookmarkCheck } from "lucide-react";
import Sidebar from "./Sidebar";
import CreateCampaignForm from "../forms/CampaignForm";
import Modal from "../campaign/CampaignModal";

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

  useEffect(() => {
const fetchData = async () => {
  try {
    const res = await fetch("https://heroes-cercanos-back.onrender.com/campaigns");
    const data = await res.json();

    const campaignsWithActiveFlag = data.map((c: any) => ({
      ...c,
      isActive: c.status === true,
    }));

    setCampaigns(campaignsWithActiveFlag);
  } catch (err) {
    console.error(err);
  }
};
fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 flex flex-col w-full px-6 py-10 md:px-12 lg:px-16 bg-white pb-42">
        <section className="max-w-7xl w-full mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase">
              Campañas activas
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
                  Fecha: {campaign.startDate}
                </p>

                <div className="flex gap-4 mt-4 justify-end">
                  <Pencil
                    size={20}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer transition"
                    aria-label="Editar campaña"
                  />
                  <BookmarkCheck
                    size={20}
                    className="text-green-600 hover:text-red-800 cursor-pointer transition"
                    aria-label="Finalizar campaña"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <CreateCampaignForm />
      </Modal>
    </div>
  );
};

export default AdminCampaignList;
