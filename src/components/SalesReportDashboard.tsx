import React from "react";

// KPI Card Component
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

// Sales Trend Chart Component
function SalesTrendChart() {
  return (
    <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <p className="text-[#111418] dark:text-white text-lg font-semibold leading-normal">Tendencia de Ventas</p>
      <div className="flex flex-1 flex-col gap-8 py-4 min-h-[260px]">
        <svg fill="none" height="100%" preserveAspectRatio="none" viewBox="-3 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z" fill="url(#paint0_linear_chart)"></path>
          <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#1173d4" strokeLinecap="round" strokeWidth="3"></path>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_chart" x1="236" x2="236" y1="1" y2="149">
              <stop stopColor="#1173d4" stopOpacity="0.2"></stop>
              <stop offset="1" stopColor="#1173d4" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex justify-around">
        <p className="text-[#6B7280] dark:text-gray-400 text-xs font-bold leading-normal tracking-wide uppercase">Semana 1</p>
        <p className="text-[#6B7280] dark:text-gray-400 text-xs font-bold leading-normal tracking-wide uppercase">Semana 2</p>
        <p className="text-[#6B7280] dark:text-gray-400 text-xs font-bold leading-normal tracking-wide uppercase">Semana 3</p>
        <p className="text-[#6B7280] dark:text-gray-400 text-xs font-bold leading-normal tracking-wide uppercase">Semana 4</p>
      </div>
    </div>
  );
}

// Sales by Location Component
function SalesByLocation() {
  const locations = [
    { name: 'Centro', amount: '$8,450.75', percentage: 100, color: '#1173d4' },
    { name: 'Mall', amount: '$6,820.50', percentage: 80, color: '#3B82F6' },
    { name: 'Universidad', amount: '$5,240.30', percentage: 62, color: '#6366F1' },
    { name: 'Playa', amount: '$7,680.90', percentage: 91, color: '#10B981' },
    { name: 'Casco Antiguo', amount: '$4,125.60', percentage: 49, color: '#8B5CF6' },
  ];

  return (
    <div className="lg:col-span-3 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <p className="text-[#111418] dark:text-white text-lg font-semibold leading-normal">Ventas por Local</p>
      <div className="space-y-5">
        {locations.map((location, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-[#6B7280] dark:text-gray-400">{location.name}</p>
              <p className="text-sm font-bold text-[#111418] dark:text-white">{location.amount}</p>
            </div>
            <div className="w-full h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center overflow-hidden">
              <div
                className="h-full rounded-lg flex items-center justify-end pr-3"
                style={{
                  width: `${location.percentage}%`,
                  backgroundColor: location.color
                }}
              >
                {location.percentage > 30 && (
                  <span className="text-xs font-semibold text-white">{location.amount}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Top Selling Items Component
function TopSellingItems() {
  const items = [
    { name: 'Ceviche Mixto', color: '#1173d4', percentage: '28%' },
    { name: 'Arroz con Mariscos', color: '#10B981', percentage: '22%' },
    { name: 'Langostinos al Ajillo', color: '#F59E0B', percentage: '18%' },
    { name: 'Cazuela de Mariscos', color: '#8B5CF6', percentage: '16%' },
    { name: 'Otros', color: '#6B7280', percentage: '16%' },
  ];

  return (
    <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <p className="text-[#111418] dark:text-white text-lg font-semibold leading-normal">Productos Más Vendidos</p>
      <div className="flex items-center justify-center flex-1 my-4">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <circle cx="18" cy="18" fill="transparent" r="15.91549430918954" stroke="#1173d4" strokeDasharray="28 100" strokeDashoffset="0" strokeWidth="4"></circle>
            <circle cx="18" cy="18" fill="transparent" r="15.91549430918954" stroke="#10B981" strokeDasharray="22 100" strokeDashoffset="-28" strokeWidth="4"></circle>
            <circle cx="18" cy="18" fill="transparent" r="15.91549430918954" stroke="#F59E0B" strokeDasharray="18 100" strokeDashoffset="-50" strokeWidth="4"></circle>
            <circle cx="18" cy="18" fill="transparent" r="15.91549430918954" stroke="#8B5CF6" strokeDasharray="16 100" strokeDashoffset="-68" strokeWidth="4"></circle>
            <circle cx="18" cy="18" fill="transparent" r="15.91549430918954" stroke="#6B7280" strokeDasharray="16 100" strokeDashoffset="-84" strokeWidth="4"></circle>
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="size-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm text-[#6B7280] dark:text-gray-400">{item.name} ({item.percentage})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sales by Day of Week Component
function SalesByDayOfWeek() {
  const days = [
    { day: 'Lun', height: '60%', amount: '$3,450', color: '#3B82F6' },
    { day: 'Mar', height: '75%', amount: '$4,280', color: '#10B981' },
    { day: 'Mié', height: '70%', amount: '$3,920', color: '#6366F1' },
    { day: 'Jue', height: '85%', amount: '$4,850', color: '#F59E0B' },
    { day: 'Vie', height: '100%', amount: '$5,680', color: '#1173d4' },
    { day: 'Sáb', height: '95%', amount: '$5,420', color: '#8B5CF6' },
    { day: 'Dom', height: '80%', amount: '$4,715', color: '#10B981' },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <p className="text-[#111418] dark:text-white text-lg font-semibold leading-normal">Ventas por Día de la Semana</p>
      <div className="grid grid-cols-7 gap-3 pt-4 min-h-[200px] items-end">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <p className="text-xs font-bold text-[#111418] dark:text-white mb-1">{day.amount}</p>
            <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-end overflow-hidden">
              <div
                className="w-full rounded-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
                style={{
                  height: day.height,
                  backgroundColor: day.color
                }}
              ></div>
            </div>
            <p className="text-xs font-bold text-[#6B7280] dark:text-gray-400 uppercase">{day.day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Dashboard Component
export function SalesReportDashboard() {
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
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 pl-3 pr-2">
            <span className="material-symbols-outlined text-[#6B7280] dark:text-gray-400 text-lg">calendar_today</span>
            <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal">Rango: Últimos 30 Días</p>
            <span className="material-symbols-outlined text-[#6B7280] dark:text-gray-400 text-xl">expand_more</span>
          </button>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 pl-3 pr-2">
            <span className="material-symbols-outlined text-[#6B7280] dark:text-gray-400 text-lg">store</span>
            <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal">Ubicación: Todas las Sucursales</p>
            <span className="material-symbols-outlined text-[#6B7280] dark:text-gray-400 text-xl">expand_more</span>
          </button>
        </div>

        {/* KPI Stats & Sales Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <KPICard
              title="Total de Ventas"
              value="$32,318.05"
              change="8.4% vs prev. 30 días"
              isPositive={true}
            />
            <KPICard
              title="Ticket Promedio"
              value="$28.50"
              change="2.3% vs prev. 30 días"
              isPositive={true}
            />
          </div>
          <SalesTrendChart />
        </div>

        {/* Sales by Location & Top Selling Items */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <SalesByLocation />
          <TopSellingItems />
        </div>

        {/* Sales by Day of Week */}
        <SalesByDayOfWeek />
      </div>
    </main>
  );
}

export default SalesReportDashboard;
