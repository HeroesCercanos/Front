import { API_BASE_URL } from "@/config/api"; // si lo tenés separado


export const getCampaigns = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/campaigns`, {
      cache: "no-store", 
    });

    if (!res.ok) {
      throw new Error(`Error al obtener campañas: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al obtener campañas:", error);
    throw error;
  }
};
