import { API_BASE_URL } from "@/config/api";
import { IncidentReport } from "@/interfaces/incident.interface";

export const sendIncidentReport = async (
 report: IncidentReport
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/incident`, {
      method:      "POST",
     
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
 
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
    
      throw new Error(data.message || "Error al enviar el reporte");
    }

    return data;
  } catch (error) {
    console.error("Error enviando reporte:", error);
    alert("Ocurrió un error al enviar el reporte.");
    throw error;
  }
};



