
export type IncidentType = "incendio" | "accidente";
export type IncidentStatus = "activo" | "asistido" | "eliminado";



export interface IncidentReport {
  type: "accidente" | "incendio",
  location: {
    lat: number;
    lng: number;
  };
  description?: string;
}


export interface Report {
  description: string;
  createdAt: string;
  id: number;
  text: string;
  status: string;
}


export interface HistoryEntry {
  id: number;
  text: string;
  action: "asistido" | "eliminado";
  comment: string;
  timestamp: string;
  edited?: boolean;
  victimName?: string; 
  reason?: string;
}


export interface FullIncident {
  id: number;
  incidentType: IncidentType;
  latitude: number;
  longitude: number;
  locationDetail?: string;
  commentaries?: string;
  reporterId: number;
  createdAt: string;
  updatedAt?: string;
  action?: "asistido" | "eliminado";
  adminCommentary?: string;
}

export interface AdminActionDto {
  status: "asistido" | "eliminado";
  victimName?: string;
  reason?: string;
  adminComment?: string;
}


