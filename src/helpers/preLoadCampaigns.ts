import { ICampaign } from "@/interfaces/campaign.interface";


export const preLoadCampaigns: ICampaign[] = [
  {
    id: 1,
    title: "Compra de equipamiento",
    description: "Ayudanos a comprar nuevos cascos y botas para los bomberos.",
    startDate: "2025-07-01",
    endDate: "2025-07-31",
    isActive: true,
  },
  {
    id: 2,
    title: "Reparación del cuartel",
    description: "Estamos juntando fondos para arreglar el techo del cuartel.",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    isActive: false,
  },
  {
    id: 3,
    title: "Capacitación en primeros auxilios",
    description: "Queremos capacitar a todo el personal del cuartel.",
    startDate: "2025-07-10",
    endDate: "2025-08-10",
    isActive: true,
  }
];
