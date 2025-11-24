import { DateRange } from '../types/filters';

export function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export function formatDateRange(dateRange: DateRange | null | undefined): string {
  if (!dateRange || (!dateRange.startDate && !dateRange.endDate)) {
    return 'Seleccionar rango de fechas';
  }

  const start = dateRange.startDate ? formatDate(dateRange.startDate) : 'Inicio';
  const end = dateRange.endDate ? formatDate(dateRange.endDate) : 'Fin';

  return `${start} - ${end}`;
}

export function isValidDate(date: any): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}
