import { IncidentReport } from "@/interfaces/incident.interface";

export const validateIncidentReport = (report: IncidentReport): string | null => {
  if (!report.type || (report.type !== "incendio" && report.type !== "accidente")) {
    return "Debe seleccionar un tipo de incidente válido.";
  }

  if (!report.location && !report.description) {
    return "Debe marcar una ubicación en el mapa o escribir una descripción.";
  }

  return null;
};

