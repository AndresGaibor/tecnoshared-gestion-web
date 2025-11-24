import React, { useState } from 'react';
import { DateRange, DatePreset } from '../types/filters';
import { formatDateRange } from '../utils/dateUtils';

interface DateRangePickerProps {
  value?: DateRange | null;
  onChange: (dateRange: DateRange) => void;
  onPresetChange?: (preset: DatePreset) => void;
  selectedPreset?: DatePreset;
}

const DATE_PRESETS: DatePreset[] = [
  { id: 'today', label: 'Hoy', startDate: new Date(), endDate: new Date() },
  { id: 'yesterday', label: 'Ayer', startDate: new Date(Date.now() - 86400000), endDate: new Date(Date.now() - 86400000) },
  { id: 'last7days', label: 'Últimos 7 días', startDate: new Date(Date.now() - 6 * 86400000), endDate: new Date() },
  { id: 'last30days', label: 'Últimos 30 días', startDate: new Date(Date.now() - 29 * 86400000), endDate: new Date() },
  { id: 'thisMonth', label: 'Este mes', startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1), endDate: new Date() },
  { id: 'lastMonth', label: 'Mes anterior', startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), endDate: new Date(new Date().getFullYear(), new Date().getMonth(), 0) },
  { id: 'thisYear', label: 'Este año', startDate: new Date(new Date().getFullYear(), 0, 1), endDate: new Date() },
  { id: 'custom', label: 'Personalizado', startDate: null, endDate: null }
];

export function DateRangePicker({
  value,
  onChange,
  onPresetChange,
  selectedPreset
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(value?.startDate || '');
  const [tempEndDate, setTempEndDate] = useState(value?.endDate || '');

  const handlePresetClick = (preset: DatePreset) => {
    if (preset.startDate && preset.endDate) {
      onChange(preset);
      onPresetChange?.(preset);
      setTempStartDate('');
      setTempEndDate('');
      setIsOpen(false);
    }
  };

  const handleCustomApply = () => {
    if (tempStartDate && tempEndDate) {
      const startDate = new Date(tempStartDate);
      const endDate = new Date(tempEndDate);

      if (startDate <= endDate) {
        onChange({ startDate, endDate });
        onPresetChange?.(DATE_PRESETS.find(p => p.id === 'custom')!);
        setIsOpen(false);
      } else {
        alert('La fecha de inicio debe ser anterior a la fecha de fin');
      }
    }
  };

  const selectedPresetLabel = selectedPreset
    ? DATE_PRESETS.find(p => p.id === selectedPreset.id)?.label
    : DATE_PRESETS[0].label;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="material-symbols-outlined text-lg">calendar_month</span>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {formatDateRange(value || null)}
        </span>
        <span className="material-symbols-outlined text-sm">expand_more</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-10 mt-1 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Seleccionar período
            </p>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Actual: {selectedPresetLabel || 'Sin selección'}
            </div>
          </div>

          <div className="p-2 space-y-1">
            {DATE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetClick(preset)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Rango personalizado
            </p>
            <div className="space-y-2">
              <input
                type="date"
                value={tempStartDate}
                onChange={(e) => setTempStartDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Fecha de inicio"
              />
              <input
                type="date"
                value={tempEndDate}
                onChange={(e) => setTempEndDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Fecha de fin"
              />
            </div>
            <button
              onClick={handleCustomApply}
              disabled={!tempStartDate || !tempEndDate}
              className="mt-3 w-full bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
