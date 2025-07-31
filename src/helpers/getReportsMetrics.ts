import { API_BASE_URL } from "@/config/api";

export const getReportsMetrics = async () => {
  const token = localStorage.getItem("jwtToken");

  const [totalRes, weeklyRes, monthlyRes, statusRes, typeRes] = await Promise.all([
    fetch(`${API_BASE_URL}/incident/metrics/total`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetch(`${API_BASE_URL}/incident/metrics/weekly`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetch(`${API_BASE_URL}/incident/metrics/monthly`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetch(`${API_BASE_URL}/incident/metrics/status`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    fetch(`${API_BASE_URL}/incident/metrics/type`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  if (!totalRes.ok || !weeklyRes.ok || !monthlyRes.ok || !statusRes.ok || !typeRes.ok) {
    throw new Error("Error al obtener métricas de reportes");
  }

  const [total, weekly, monthly, byStatus, byType] = await Promise.all([
    totalRes.json(),
    weeklyRes.json(),
    monthlyRes.json(),
    statusRes.json(),
    typeRes.json(),
  ]);

  return { total, weekly, monthly, byStatus, byType };
};
