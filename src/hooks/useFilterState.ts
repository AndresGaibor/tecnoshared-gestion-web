import { useState, useMemo } from 'react';
import { DateRange, DatePreset, Location, FilterState } from '../types/filters';

// Presets de fechas por defecto
const DEFAULT_PRESETS: DatePreset[] = [
  { id: 'last7days', label: 'Últimos 7 días', startDate: new Date(Date.now() - 6 * 86400000), endDate: new Date() },
  { id: 'last30days', label: 'Últimos 30 días', startDate: new Date(Date.now() - 29 * 86400000), endDate: new Date() },
  { id: 'thisMonth', label: 'Este mes', startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1), endDate: new Date() }
];

interface UseFilterStateReturn {
  dateRange: DateRange;
  selectedLocation: Location | null;
  selectedPreset: DatePreset | null;
  setDateRange: (dateRange: DateRange) => void;
  setSelectedLocation: (location: Location | null) => void;
  setSelectedPreset: (preset: DatePreset | null) => void;
  resetFilters: () => void;
  isFiltered: boolean;
  presets: DatePreset[];
}

export function useFilterState(initialFilters?: Partial<FilterState>): UseFilterStateReturn {
  // Estado inicial seguro con valores por defecto
  const [filters, setFilters] = useState<FilterState>({
    dateRange: initialFilters?.dateRange || DEFAULT_PRESETS[1], // Últimos 30 días por defecto
    selectedLocation: initialFilters?.selectedLocation || null,
    selectedPreset: initialFilters?.selectedPreset || DEFAULT_PRESETS[1],
    ...initialFilters
  });

  const setDateRange = (dateRange: DateRange) => {
    setFilters(prev => ({ ...prev, dateRange, selectedPreset: null }));
  };

  const setSelectedLocation = (selectedLocation: Location | null) => {
    setFilters(prev => ({ ...prev, selectedLocation }));
  };

  const setSelectedPreset = (selectedPreset: DatePreset | null) => {
    if (selectedPreset) {
      setFilters(prev => ({
        ...prev,
        dateRange: selectedPreset,
        selectedPreset
      }));
    }
  };

  const resetFilters = () => {
    const defaultPreset = DEFAULT_PRESETS[1]; // Últimos 30 días
    setFilters({
      dateRange: defaultPreset,
      selectedLocation: null,
      selectedPreset: defaultPreset
    });
  };

  // Comprobar si hay filtros activos
  const isFiltered = useMemo(() => {
    const hasCustomDateRange = filters.selectedPreset?.id !== 'last30days';
    const hasLocation = !!filters.selectedLocation;
    return hasCustomDateRange || hasLocation;
  }, [filters]);

  return {
    dateRange: filters.dateRange,
    selectedLocation: filters.selectedLocation,
    selectedPreset: filters.selectedPreset,
    setDateRange,
    setSelectedLocation,
    setSelectedPreset,
    resetFilters,
    isFiltered,
    presets: DEFAULT_PRESETS
  };
}
