export interface ICampaign {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Need {
  id: number;
  type: string;
  quantity: number;
  status: string;
  quarterId: number;
}

export interface IncidentReport {
  type: "incendio" | "accidente" | string;
  location: {
    lat: number;
    lng: number;
  } | null;
  description?: string; 
  comments?: string;
}



