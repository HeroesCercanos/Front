import { API_BASE_URL } from "@/config/api";
import { Report } from "@/interfaces/incident.interface";

export const getIncidentReports = async (): Promise<
  Report[]
> => {
  
  const response = await fetch(`${API_BASE_URL}/incident`, {
    method: "GET",
    credentials: "include", 
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
     throw new Error(payload.message || "Error al obtener los reportes");
  }

  return payload as Report[];
};

