export interface WeeklyDonation {
  date: string;
  total: number;
  count?: number;
}

export interface MonthlyDonation {
  month: string;
  total: number;
  count?: number;
}

export interface DonationMetrics {
  total: number;
  weekly: WeeklyDonation[];
  monthly: MonthlyDonation[];
}

export interface DailyUser {
  semana: string;
  altas: number;
}

export interface UserMetrics {
  total: number;
  daily: DailyUser[];
}

export interface WeeklyReport {
  week: string;
  count: number;
}

export interface MonthlyReport {
  month: string;
  count: number;
}

export interface StatusReport {
  status: string;
  count: number;
}

export interface TypeReport {
  type: string;
  count: number;
}

export interface ReportMetrics {
  total: number;
  weekly: WeeklyReport[];
  monthly: MonthlyReport[];
  byStatus: StatusReport[];
  byType: TypeReport[];
}
