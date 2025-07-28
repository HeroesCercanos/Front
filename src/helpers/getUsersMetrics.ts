import { API_BASE_URL } from "@/config/api";

export const getUsersMetrics = async () => {
  try {
    // Total de usuarios
    const totalRes = await fetch(`${API_BASE_URL}/users/stats/total`, {
      credentials: "include",
    });
    const totalData = await totalRes.json();

    // Altas por día (últimos 7 días)
    const dailyRes = await fetch(`${API_BASE_URL}/users/stats/registrations/daily?period=7`, {
      credentials: "include",
    });
    const dailyData = await dailyRes.json();

    return {
      total: totalData.total ?? 0,
      daily: Array.isArray(dailyData) ? dailyData : [],
    };
  } catch (error) {
    console.error("Error obteniendo métricas de usuarios:", error);
    return {
      total: 0,
      daily: [],
    };
  }
};
