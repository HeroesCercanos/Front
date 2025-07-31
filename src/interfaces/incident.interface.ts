
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
  id: string; // 
  type: IncidentType; 
  latitude: string; 
  longitude: string; 
  description: string; 
  victimName: string | null; 
  reason: string | null; 
  adminComment: string | null; 
  status: IncidentStatus; 
  createdAt: string;
  user: IncidentReporterInfo; 
  updatedAt?: string; 
  
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


