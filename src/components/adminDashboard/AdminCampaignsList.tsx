"use client";

import { useEffect, useState } from "react";
import { Pencil, PlusCircle, SquareX, Trash2, RotateCcw } from "lucide-react";
import Sidebar from "./Sidebar";
import CreateCampaignForm from "../forms/CampaignForm";
import Modal from "../campaign/CampaignModal";
import { API_BASE_URL } from "@/config/api";
import toast from "react-hot-toast";

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

      const campaignsWithActiveFlag = data.map((c: any) => ({
        ...c,
        isActive: c.isActive,
      }));

      setCampaigns(campaignsWithActiveFlag);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const [pulsingId, setPulsingId] = useState<string | null>(null);

  const handleFinishCampaign = async (id: string) => {
    try {
      setPulsingId(id);
      const res = await fetch(`${API_BASE_URL}/campaigns/${id}/finish`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("No se pudo finalizar la campaña.");
      }

      await fetchCampaigns();
      toast.success("La campaña fue finalizada con éxito.");
    } catch (error) {
      console.error("Error al finalizar campaña:", error);
      toast.error("Ocurrió un error al finalizar la campaña.");
    } finally {
      setTimeout(() => setPulsingId(null), 1000);
    }
  };

  const handleEditClick = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setShowModal(true);
  };

  const handleDeleteCampaign = (campaign: Campaign) => {
    toast.custom((t) => (
      <div
        className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 w-[90%] max-w-md ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          ¿Eliminar campaña?
        </h2>
        <p className="text-gray-600 mb-4">
          Vas a eliminar <strong>{campaign.title}</strong>. Esta acción no se
          puede deshacer.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={async () => {
              toast.dismiss(t.id);

              try {
                const res = await fetch(
                  `${API_BASE_URL}/campaigns/${campaign.id}`,
                  {
                    method: "DELETE",
                    credentials: "include",
                  }
                );

                if (!res.ok) throw new Error("Error al eliminar");

                toast.success("Campaña eliminada con éxito.");
                fetchCampaigns();
              } catch (err) {
                console.error(err);
                toast.error("Error al eliminar campaña.");
              }
            }}
            className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Sí, eliminar
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    ));
  };

  const handleReactivateCampaign = async (id: string) => {
    try {
      setPulsingId(id);
      const res = await fetch(`${API_BASE_URL}/campaigns/${id}/reactivate`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) throw new Error("No se pudo reactivar la campaña.");

      await fetchCampaigns();
      toast.success("La campaña fue reactivada con éxito.");
    } catch (error) {
      console.error("Error al reactivar campaña:", error);
      toast.error("Ocurrió un error al reactivar la campaña.");
    } finally {
      setTimeout(() => setPulsingId(null), 1000);
    }
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
              onClick={() => {
                setEditingCampaign(null);
                setShowModal(true);
              }}
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
                className="bg-gray-100 p-6 rounded-lg shadow-inner drop-shadow-lg flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {campaign.title}
                  </h3>
                </div>

                <div className="flex-grow">
                  <p className="text-gray-700 text-sm mb-2 break-words line-clamp-5">
                    {campaign.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    Desde {campaign.startDate} hasta {campaign.endDate}
                  </p>
                </div>

                <p
                  className={`text-xs font-semibold mt-2 ${
                    campaign.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {campaign.isActive ? "Activa" : "Finalizada"}
                </p>

                {/* Línea divisoria + íconos abajo */}
                <div className="flex gap-4 mt-auto pt-4 justify-end border-t border-gray-300">
                  <span title="Editar campaña">
                    <Pencil
                      size={20}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer transition"
                      aria-label="Editar campaña"
                      onClick={() => handleEditClick(campaign)}
                    />
                  </span>

                  {campaign.isActive ? (
                    <span title="Finalizar campaña">
                      <SquareX
                        size={20}
                        className={`text-green-600 hover:text-red-800 cursor-pointer transition ${
                          pulsingId === campaign.id ? "animate-pulse" : ""
                        }`}
                        aria-label="Finalizar campaña"
                        onClick={() => handleFinishCampaign(campaign.id)}
                      />
                    </span>
                  ) : (
                    <span title="Reactivar campaña">
                      <RotateCcw
                        size={20}
                        className={`text-orange-600 hover:text-green-700 cursor-pointer transition ${
                          pulsingId === campaign.id ? "animate-pulse" : ""
                        }`}
                        aria-label="Reactivar campaña"
                        onClick={() => handleReactivateCampaign(campaign.id)}
                      />
                    </span>
                  )}

                  <span title="Eliminar campaña">
                    <Trash2
                      size={20}
                      className="text-red-600 hover:text-red-800 cursor-pointer transition"
                      aria-label="Eliminar campaña"
                      onClick={() => handleDeleteCampaign(campaign)}
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingCampaign(null);
        }}
      >
        <CreateCampaignForm
          onClose={() => {
            setShowModal(false);
            setEditingCampaign(null);
          }}
          refreshCampaigns={fetchCampaigns}
          campaignToEdit={editingCampaign}
        />
      </Modal>
    </div>
  );
};

export default AdminCampaignList;
