 
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


export interface FullIncident {
  id: string;
  type: string;
  latitude: string;
  longitude: string;
  description: string;
  victimName: string | null;
  reason: string | null;
  adminComment: string | null;
  status: IncidentStatus; 
  createdAt: string;
  user?: {
    id: string;
    name: string;
  };
}

export interface HistoryEntry {
  id: string; 
  incidentId: string; 
  text: string;
  action: "asistido" | "eliminado";
  comment: string;
  timestamp: string;
  edited: boolean;
  victimName: string | null;
  reason: string | null;
  incidentDescription: string; 
  incidentType: string; 
}
export interface IncidentReporterInfo {
  id: string; 
  name: string; 
  email?: string; 
}

export interface AdminActionDto {
  status: "asistido" | "eliminado";
  victimName?: string;
  reason?: string;
  adminComment?: string;
}


