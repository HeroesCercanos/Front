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

export interface UserMetrics {
  total: number;
  daily: DailyUser[];
}

export interface DailyUser {
  // acá revisá que esté así:
  date: string;   // ✅ fecha tipo "2025-08-01"
  count: number;  // ✅ cantidad de usuarios
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
