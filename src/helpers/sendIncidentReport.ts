import { API_BASE_URL } from "@/config/api";
import { IncidentReport } from "@/interfaces/incident.interface";

/**
 * Envía un nuevo reporte de incidente.
 * Ahora usamos cookie-based auth: eliminamos el token como parámetro
 * y enviamos la cookie HttpOnly con credentials: 'include'.
 */
export const sendIncidentReport = async (
  /* REMOVED: token parameter */ report: IncidentReport
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/incident`, {
      method:      "POST",
      // ADDED: para que el navegador envíe la cookie jwtToken HTTP-Only
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // REMOVED: Authorization header con Bearer token
        // Authorization: Bearer ${token},
      },
      body: JSON.stringify({
        type:        report.type,
        latitude:    report.location.lat,
        longitude:   report.location.lng,
        description: report.description || "",
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // mostramos el mensaje del backend si existe, o un fallback
      throw new Error(data.message || "Error al enviar el reporte");
    }

    return data;
  } catch (error) {
    console.error("Error enviando reporte:", error);
    alert("Ocurrió un error al enviar el reporte.");
    throw error;
  }
};


/* import { API_BASE_URL } from "@/config/api";
import { IncidentReport } from "@/interfaces/incident.interface";

export const sendIncidentReport = async (
  report: IncidentReport,
  token: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/incident`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: report.type,
        latitude: report.location.lat,
        longitude: report.location.lng,
        description: report.description || "",
      }),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el reporte");
    }

    return await response.json();
  } catch (error) {
    console.error("Error enviando reporte:", error);
    alert("Ocurrió un error al enviar el reporte.");
  }
}; */




