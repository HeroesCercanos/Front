export type IncidentType = "incendio" | "accidente";

export interface IncidentReport {
  type: IncidentType;
  location: {
    lat: number;
    lng: number;
  } | null;
  description?: string;
  comments?: string;
}
