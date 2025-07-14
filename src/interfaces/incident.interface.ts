// Tipos posibles de incidentes
export type IncidentType = "incendio" | "accidente";

// Lo que el formulario de usuario envía
export interface IncidentReport {
  type: IncidentType;
  location: {
    lat: number;
    lng: number;
  } | null;
  description?: string;
  comments?: string;
}

// Lo que se muestra en AdminReports (resumen visible)
export interface Report {
  id: number;
  text: string;
}

// Historial de acciones del admin
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

// Nuevo: estructura completa del incidente recibido desde el backend
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


/*export type IncidentType = "incendio" | "accidente";

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
}*/
