// Tipos para el sistema de filtros

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface Location {
  id: string;
  name: string;
  displayName: string;
}

export interface FilterState {
  dateRange: DateRange;
  selectedLocation: Location | null;
}

export interface SalesData {
  id: string;
  date: Date;
  locationId: string;
  amount: number;
  items: string[];
}

export interface KPIData {
  totalSales: number;
  averageTicket: number;
  changePercentage: number;
  isPositive: boolean;
}

// Tipos de presets de fecha
export type DatePreset = 'today' | 'last7days' | 'last30days' | 'thismonth' | 'custom';

export const DATE_PRESETS: Record<DatePreset, string> = {
  today: 'Hoy',
  last7days: 'Últimos 7 días',
  last30days: 'Últimos 30 días',
  thismonth: 'Este mes',
  custom: 'Personalizado'
};