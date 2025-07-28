import { API_BASE_URL } from "@/config/api";

export const getDonationsMetrics = async () => {
  try {
    // Total donado
    const totalRes = await fetch(`${API_BASE_URL}/donations/stats/total`, {
      credentials: "include",
    });
    const totalData = await totalRes.json();

    // Donaciones por semana
    const weeklyRes = await fetch(`${API_BASE_URL}/donations/stats/weekly`, {
      credentials: "include",
    });
    const weeklyData = await weeklyRes.json();

    // Donaciones por mes (últimos 6)
    const monthlyRes = await fetch(`${API_BASE_URL}/donations/stats/monthly?period=6`, {
      credentials: "include",
    });
    const monthlyData = await monthlyRes.json();

    return {
  total: totalData.total ?? 0,
  weekly: Array.isArray(weeklyData) ? weeklyData : [],
  monthly: Array.isArray(monthlyData) ? monthlyData : [],
};

  } catch (error) {
    console.error("Error obteniendo métricas de donaciones:", error);
    return {
      total: 0,
      weekly: [],
      monthly: [],
    };
  }
};
