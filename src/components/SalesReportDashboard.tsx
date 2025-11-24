import React, { useMemo, useCallback } from "react";
import { DateRangePicker } from "./DateRangePicker";
import { LocationSelector } from "./LocationSelector";
import { useFilterState } from "../hooks/useFilterState";
import {
  MOCK_LOCATIONS,
  MOCK_SALES_DATA,
  filterSalesData,
  calculateKPIs
} from "../data/mockData";
import { KPIData } from "../types/filters";

// Componente Tarjeta KPI
function KPICard({
  title,
  value,
  change,
  isPositive
}: {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
      <p className="text-[#6B7280] dark:text-gray-400 text-base font-medium leading-normal">{title}</p>
      <p className="text-[#111418] dark:text-white tracking-light text-3xl font-bold leading-tight">{value}</p>
      <p className={`text-base font-medium leading-normal flex items-center ${isPositive ? 'text-[#078838]' : 'text-[#e73908]'}`}>
        <span className="material-symbols-outlined text-lg">{isPositive ? 'arrow_upward' : 'arrow_downward'}</span>
        {change}
      </p>
    </div>
  );
}

// Componente Gráfico de Tendencia de Ventas
function SalesTrendChart({ data }: { data: Array<{ date: Date; amount: number }> }) {
  // Función auxiliar para formatear fechas (declarada antes de usarla)
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  
  // Agrupar datos por semana para el gráfico
  const weeklyData = useMemo(() => {
    if (data.length === 0) return [];

    // Encontrar el rango de fechas
    const sortedData = [...data].sort((a, b) => a.date.getTime() - b.date.getTime());
    const startDate = new Date(sortedData[0].date);
    const endDate = new Date(sortedData[sortedData.length - 1].date);

    
    // Agrupar por semanas reales (periodos de 7 días)
    const weekGroups: { [key: string]: { amounts: number[], weekStart: Date } } = {};

    sortedData.forEach(sale => {
      // Calcular qué semana pertenece esta fecha
      const daysDiff = Math.floor((sale.date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const weekNumber = Math.floor(daysDiff / 7);
      const weekKey = `Semana ${weekNumber + 1}`;

      if (!weekGroups[weekKey]) {
        const weekStart = new Date(startDate);
        weekStart.setDate(startDate.getDate() + (weekNumber * 7));
        weekGroups[weekKey] = { amounts: [], weekStart };
      }

      weekGroups[weekKey].amounts.push(sale.amount);
    });

    // Calcular totales semanales
    const weeks = Object.entries(weekGroups).map(([week, { amounts, weekStart }]) => {
      const total = amounts.reduce((sum, amount) => sum + amount, 0);
      return {
        week,
        total,
        max: 0, // Se calculará después
        weekStart,
        count: amounts.length
      };
    });

    // Calcular el máximo global para escalado
    const globalMax = Math.max(...weeks.map(w => w.total), 1);

    // Asignar el máximo a cada semana y añadir etiquetas de fecha
    const weeksWithMax = weeks.map(w => ({
      ...w,
      max: globalMax,
      weekLabel: formatDate(w.weekStart)
    }));

    
    return weeksWithMax;
  }, [data]);

  if (data.length === 0) {
    return (
      <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
        <p className="text-[#111418] dark:text-white text-lg font-semibold leading-normal">Tendencia de Ventas</p>
        <div className="flex flex-col items-center justify-center flex-1 h-64 space-y-2">
          <p className="text-gray-500 dark:text-gray-400">No hay datos disponibles para el período seleccionado</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            💡 Intenta ampliar el rango de fechas o seleccionar otra ubicación
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <p className="text-[#111418] dark:text-white text-lg font-semibold leading-normal">Tendencia de Ventas</p>

      <div className="flex flex-1 flex-col gap-6 py-4 min-h-[300px]">
        <div className="flex items-end gap-3 h-48">
          {weeklyData.map((week, index) => {
            // Calcular altura con mínimo garantizado
            const heightPercentage = week.max > 0 ? (week.total / week.max) * 100 : 0;
            const minHeight = 8; // Mínimo 8px para visibilidad
            const calculatedHeight = Math.max((heightPercentage / 100) * 192, minHeight); // 192px = h-48

            
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                {/* Monto arriba de la barra */}
                <div className="text-xs font-semibold text-[#111418] dark:text-white">
                  ${week.total.toFixed(0)}
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-lg flex items-end relative h-48">
                  <div
                    className="w-full bg-primary rounded-t-lg transition-all duration-300 hover:opacity-80 relative"
                    style={{
                      height: `${calculatedHeight}px`
                    }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                      Semana {index + 1} ({week.weekLabel}): ${week.total.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Etiquetas de semana */}
        <div className="flex justify-around px-2">
          {weeklyData.map((week, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <p className="text-[#9CA3AF] dark:text-gray-500 text-xs font-medium">
                Semana {index + 1}
              </p>
              <p className="text-[#6B7280] dark:text-gray-400 text-xs font-bold">
                {formatDate(week.weekStart)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente Ventas por Ubicación
function SalesByLocation({ data }: { data: Array<{ locationId: string; amount: number }> }) {
  const locationData = useMemo(() => {
    const locationTotals = new Map<string, number>();

    data.forEach(sale => {
      const current = locationTotals.get(sale.locationId) || 0;
      locationTotals.set(sale.locationId, current + sale.amount);
    });

    return MOCK_LOCATIONS.map(location => ({
      ...location,
      amount: locationTotals.get(location.id) || 0,
      displayName: location.displayName
    })).filter(loc => loc.amount > 0);
  }, [data]);

  if (locationData.length === 0) {
    return (
      <div className="lg:col-span-3 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
        <p className="text-[#111418] dark:text-white text-lg font-semibold leading-normal">Ventas por Local</p>
        <div className="flex items-center justify-center flex-1 h-64">
          <p className="text-gray-500 dark:text-gray-400">No hay datos disponibles para el período seleccionado</p>
        </div>
      </div>
    );
  }

  const maxAmount = Math.max(...locationData.map(loc => loc.amount));

  return (
    <div className="lg:col-span-3 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <p className="text-[#111418] dark:text-white text-lg font-semibold leading-normal">Ventas por Local</p>
      <div className="space-y-5">
        {locationData.map((location) => {
          const percentage = (location.amount / maxAmount) * 100;
          const colors = ['#1173d4', '#3B82F6', '#6366F1', '#10B981', '#8B5CF6'];
          const color = colors[MOCK_LOCATIONS.findIndex(loc => loc.id === location.id)];

          return (
            <div key={location.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-[#6B7280] dark:text-gray-400">{location.displayName}</p>
                <p className="text-sm font-bold text-[#111418] dark:text-white">
                  ${location.amount.toFixed(2)}
                </p>
              </div>
              <div className="w-full h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center overflow-hidden">
                <div
                  className="h-full rounded-lg flex items-center justify-end pr-3"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color
                  }}
                >
                  {percentage > 30 && (
                    <span className="text-xs font-semibold text-white">
                      ${location.amount.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Componente Productos Más Vendidos
function TopSellingItems({ data }: { data: Array<{ items: string[] }> }) {
  const itemsData = useMemo(() => {
    const itemCounts = new Map<string, number>();

    data.forEach(sale => {
      sale.items.forEach(item => {
        const current = itemCounts.get(item) || 0;
        itemCounts.set(item, current + 1);
      });
    });

    const sortedItems = Array.from(itemCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const total = sortedItems.reduce((sum, [, count]) => sum + count, 0);

    return sortedItems.map(([name, count], index) => ({
      name,
      count,
      percentage: ((count / total) * 100).toFixed(0),
      color: ['#1173d4', '#10B981', '#F59E0B', '#8B5CF6', '#6B7280'][index]
    }));
  }, [data]);

  if (itemsData.length === 0) {
    return (
      <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
        <p className="text-[#111418] dark:text-white text-lg font-semibold leading-normal">Productos Más Vendidos</p>
        <div className="flex items-center justify-center flex-1 h-64">
          <p className="text-gray-500 dark:text-gray-400">No hay datos disponibles para el período seleccionado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <p className="text-[#111418] dark:text-white text-lg font-semibold leading-normal">Productos Más Vendidos</p>
      <div className="flex items-center justify-center flex-1 my-4">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            {itemsData.map((item, index) => {
              const dashOffset = itemsData
                .slice(0, index)
                .reduce((sum, prevItem) => sum + parseFloat(prevItem.percentage), 0);

              return (
                <circle
                  key={index}
                  cx="18"
                  cy="18"
                  fill="transparent"
                  r="15.91549430918954"
                  stroke={item.color}
                  strokeDasharray={`${item.percentage} 100`}
                  strokeDashoffset={-dashOffset}
                  strokeWidth="4"
                />
              );
            })}
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {itemsData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="size-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm text-[#6B7280] dark:text-gray-400">
              {item.name} ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente Ventas por Día de la Semana
function SalesByDayOfWeek({ data }: { data: Array<{ date: Date; amount: number }> }) {
  const weekData = useMemo(() => {
    const dayTotals = new Map<number, number>();

    // Inicializar todos los días en 0
    for (let i = 1; i <= 7; i++) {
      dayTotals.set(i, 0);
    }

    data.forEach(sale => {
      const dayOfWeek = sale.date.getDay(); // 0 = domingo, 1 = lunes, etc.
      const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek; // Convertir domingo de 0 a 7
      const current = dayTotals.get(adjustedDay) || 0;
      dayTotals.set(adjustedDay, current + sale.amount);
    });

    const days = [
      { day: 'Lun', dayNumber: 1 },
      { day: 'Mar', dayNumber: 2 },
      { day: 'Mié', dayNumber: 3 },
      { day: 'Jue', dayNumber: 4 },
      { day: 'Vie', dayNumber: 5 },
      { day: 'Sáb', dayNumber: 6 },
      { day: 'Dom', dayNumber: 7 }
    ];

    const maxAmount = Math.max(...Array.from(dayTotals.values()));

    return days.map(({ day, dayNumber }) => ({
      day,
      amount: dayTotals.get(dayNumber) || 0,
      height: `${((dayTotals.get(dayNumber) || 0) / maxAmount) * 100}%`,
      color: ['#3B82F6', '#10B981', '#6366F1', '#F59E0B', '#1173d4', '#8B5CF6', '#10B981'][dayNumber - 1]
    }));
  }, [data]);

  if (weekData.every(day => day.amount === 0)) {
    return (
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
        <p className="text-[#111418] dark:text-white text-lg font-semibold leading-normal">Ventas por Día de la Semana</p>
        <div className="flex items-center justify-center flex-1 h-64">
          <p className="text-gray-500 dark:text-gray-400">No hay datos disponibles para el período seleccionado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <p className="text-[#111418] dark:text-white text-lg font-semibold leading-normal">Ventas por Día de la Semana</p>
      <div className="grid grid-cols-7 gap-3 pt-4 min-h-[200px] items-end">
        {weekData.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <p className="text-xs font-bold text-[#111418] dark:text-white mb-1">
              ${day.amount.toFixed(0)}
            </p>
            <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-end overflow-hidden">
              <div
                className="w-full rounded-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
                style={{
                  height: day.height,
                  backgroundColor: day.color
                }}
              />
            </div>
            <p className="text-xs font-bold text-[#6B7280] dark:text-gray-400 uppercase">
              {day.day}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente Dashboard Principal
export function SalesReportDashboard() {
  const {
    dateRange,
    selectedLocation,
    setDateRange,
    setSelectedLocation
  } = useFilterState();

  // Filtrar datos basados en los filtros seleccionados
  const filteredData = useMemo(() => {
    return filterSalesData(
      MOCK_SALES_DATA,
      dateRange.startDate,
      dateRange.endDate,
      selectedLocation?.id
    );
  }, [dateRange, selectedLocation]);

  // Calcular datos para el período anterior
  const previousPeriodData = useMemo(() => {
    const daysDiff = Math.ceil((dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const previousEndDate = new Date(dateRange.startDate);
    previousEndDate.setDate(previousEndDate.getDate() - 1);
    const previousStartDate = new Date(previousEndDate);
    previousStartDate.setDate(previousStartDate.getDate() - daysDiff);

    return filterSalesData(
      MOCK_SALES_DATA,
      previousStartDate,
      previousEndDate,
      selectedLocation?.id
    );
  }, [dateRange, selectedLocation]);

  // Calcular KPIs
  const kpis: KPIData = useMemo(() => {
    return calculateKPIs(filteredData, previousPeriodData);
  }, [filteredData, previousPeriodData]);

  // Preparar datos para los gráficos
  const chartData = useMemo(() => {
    const trendData = filteredData.map(sale => ({
      date: sale.date,
      amount: sale.amount
    }));

    return {
      trendData,
      locationData: filteredData.map(sale => ({
        locationId: sale.locationId,
        amount: sale.amount
      })),
      itemsData: filteredData.map(sale => ({
        items: sale.items
      })),
      dayOfWeekData: filteredData.map(sale => ({
        date: sale.date,
        amount: sale.amount
      }))
    };
  }, [filteredData]);

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-[#111418] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Reporte de Ventas por Local
          </h1>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center rounded-lg h-10 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] px-4">
              <span className="material-symbols-outlined">download</span>
              <span className="truncate">Exportar</span>
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="flex gap-3 flex-wrap mb-6">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
          <LocationSelector
            value={selectedLocation}
            onChange={setSelectedLocation}
            locations={MOCK_LOCATIONS}
          />
        </div>

        {/* KPI Stats & Sales Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <KPICard
              title="Total de Ventas"
              value={`$${kpis.totalSales.toFixed(2)}`}
              change={`${kpis.changePercentage.toFixed(1)}% vs período anterior`}
              isPositive={kpis.isPositive}
            />
            <KPICard
              title="Ticket Promedio"
              value={`$${kpis.averageTicket.toFixed(2)}`}
              change={`${kpis.changePercentageAverage.toFixed(1)}% vs período anterior`}
              isPositive={kpis.isPositiveAverage}
            />
          </div>
          <SalesTrendChart data={chartData.trendData} />
        </div>

        {/* Sales by Location & Top Selling Items */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <SalesByLocation data={chartData.locationData} />
          <TopSellingItems data={chartData.itemsData} />
        </div>

        {/* Sales by Day of Week */}
        <SalesByDayOfWeek data={chartData.dayOfWeekData} />
      </div>
    </main>
  );
}

export default SalesReportDashboard;