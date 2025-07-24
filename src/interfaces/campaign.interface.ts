export interface ICampaign {
  id: string;
  title: string;
  description?: string; 
  startDate: string;
  endDate: string;
  status: string;
  isActive?: boolean;
  campaignToEdit?: ICampaign | null;
}
