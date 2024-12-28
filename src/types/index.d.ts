export interface DashboardData {
  id: string;
  title: string;
  value: number;
  trend: 'up' | 'down';
  percentage: number;
}

export interface DashboardCardProps {
  data: DashboardData;
}