import { API_BASE_URL } from "@/config/api";

export const getTotalDonations = async (): Promise<number> => {
  try {
    const res = await fetch(`${API_BASE_URL}/donations/stats/total`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("No se pudo obtener el total");

    const data = await res.json();
    return data.total || 0;
  } catch (error) {
    return 0;
  }
};
