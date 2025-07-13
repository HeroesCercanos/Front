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

export interface Report {
  id: number;
  text: string;
}

export interface HistoryEntry {
  id: number;
  text: string;
  action: "asistido" | "eliminado";
  comment: string;
  timestamp: string;
  edited?: boolean;
  victimName?: string; 
  reason?: string
}
