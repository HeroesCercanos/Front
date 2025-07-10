"use client";

import { preLoadCampaigns } from "@/helpers/preLoadCampaigns";
import { Pencil, Trash2 } from "lucide-react";
import Sidebar from "./Sidebar";

const AdminCampaignList = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <section className="w-full mt-6 ml-6 mr-6 ">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Campañas activas
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preLoadCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-gray-100 p-6 rounded-lg shadow-inner drop-shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{campaign.title}</h3>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                {campaign.description}
              </p>
              <p className="text-xs text-gray-500">
                Fecha: {campaign.startDate}
              </p>
              {/*  // TODO: Agregar funcionalidad con el CRUD de campañas del back
               */}{" "}
              <div className="flex gap-4 mt-4 justify-end">
              <Pencil
                size={20}
                className="text-blue-600 hover:text-blue-800 cursor-pointer transition"
                aria-label="Editar campaña"
                onClick={() => {
                  // TODO: lógica de edición
                }}
              />
              <Trash2
                size={20}
                className="text-red-600 hover:text-red-800 cursor-pointer transition"
                aria-label="Eliminar campaña"
                onClick={() => {
                  // TODO: lógica de eliminación
                }}
              />
            </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminCampaignList;
