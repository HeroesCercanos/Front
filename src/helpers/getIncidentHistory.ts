import { API_BASE_URL } from "@/config/api";
import { HistoryEntry } from "@/interfaces/incident.interface";

export const getIncidentHistory = async (/* REMOVED: token param */): Promise<HistoryEntry[]> => {
  // ADDED: credentials so the HttpOnly jwtToken cookie is sent automatically
  const res = await fetch(`${API_BASE_URL}/incident/history`, {
    method:      "GET",
    credentials: "include",  
    // REMOVED: Authorization header with Bearer token
    // headers: { Authorization: Bearer ${token} },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // preserve backend message if any, else fallback
    throw new Error(data.message || "Error al obtener historial");
  }

  return data as HistoryEntry[];
};


/*export const getIncidentHistory = async (token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/incident/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Error al obtener historial");
  return res.json();
};*/
