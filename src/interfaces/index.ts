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


