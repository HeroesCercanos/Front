export interface ICampaign {
  id: string;
  title: string;
  description?: string; // <--- opcional
  startDate: string;
  endDate: string;
  status: string;
  isActive?: boolean;
  campaignToEdit?: ICampaign | null;
}
