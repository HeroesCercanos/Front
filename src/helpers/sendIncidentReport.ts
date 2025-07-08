import { IncidentReport } from "@/interfaces";

export const sendIncidentReport = async (report: IncidentReport) => {
  try {
    const response = await fetch("/api/incidents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(report),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el reporte");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al enviar el reporte.");
  }
};
