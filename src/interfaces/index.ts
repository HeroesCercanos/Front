export interface ICampaign {
  title: string;
  description: string;
  startDate: string;
  id: number;
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

export interface ILoginProps {
  email: string;
  password: string;
}

export interface ILoginErrors {
  email?: string;
  password?: string;
}


