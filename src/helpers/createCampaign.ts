import { API_BASE_URL } from "@/config/api"; // si lo tenés separado


export const createCampaign = async (campaignData: {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
}) => {
  try {
    const res = await fetch(`${API_BASE_URL}/campaigns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Enviar cookies HttpOnly
      body: JSON.stringify(campaignData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Error al crear campaña");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
