import { API_BASE_URL } from "@/config/api";
import { HistoryEntry } from "@/interfaces/incident.interface";

export const getIncidentHistory = async (): Promise<HistoryEntry[]> => {
  const res = await fetch(`${API_BASE_URL}/incident/history`, {
    method:      "GET",
    credentials: "include",  
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Error al obtener historial");
  }

  return data as HistoryEntry[];
};

