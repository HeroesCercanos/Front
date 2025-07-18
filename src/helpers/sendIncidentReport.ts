import { API_BASE_URL } from "@/config/api";
import { IncidentReport } from "@/interfaces/incident.interface";

export const sendIncidentReport = async (
  report: IncidentReport,
  token: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {

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
};




