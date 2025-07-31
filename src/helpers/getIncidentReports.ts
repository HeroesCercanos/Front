import { API_BASE_URL } from "@/config/api";
import { FullIncident } from "@/interfaces/incident.interface";

export const getIncidentReports = async (): Promise<FullIncident[]> => {
  const response = await fetch(`${API_BASE_URL}/incident`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    let errorMessage = "Error desconocido al obtener los reportes";
    try {
      const errorPayload = await response.json();
      if (errorPayload && typeof errorPayload === 'object' && 'message' in errorPayload) {
        errorMessage = errorPayload.message;
      } else {
        errorMessage = `Error ${response.status}: ${response.statusText}`;
      }
    } catch (jsonError) {
        errorMessage = `Error ${response.status}: ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }
  try {
    const payload: FullIncident[] = await response.json();
      if (!Array.isArray(payload)) {
        console.warn("La API de incidentes no devolvió un array, devolviendo array vacío.");
        return [];
    }
    return payload;
  } catch (jsonError) {
    console.error("Error al parsear la respuesta JSON de /incident:", jsonError);
    throw new Error("Respuesta inválida del servidor");
  }
};

