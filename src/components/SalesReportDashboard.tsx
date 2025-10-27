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
    { name: 'Centro', amount: '$45,729.15', percentage: 100 },
    { name: 'Mall', amount: '$38,109.25', percentage: 85 },
    { name: 'Universidad', amount: '$30,486.10', percentage: 70 },
    { name: 'Playa', amount: '$23,550.00', percentage: 55 },
    { name: 'Casco Antiguo', amount: '$14,556.00', percentage: 40 },
  ];

  return (
    <div className="lg:col-span-3 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <p className="text-[#111418] dark:text-white text-lg font-semibold leading-normal">Ventas por Local</p>
      <div className="space-y-4">
        {locations.map((location, index) => (
          <div key={index} className="grid grid-cols-4 items-center gap-4">
            <p className="col-span-1 text-sm font-medium text-[#6B7280] dark:text-gray-400">{location.name}</p>
            <div className="col-span-3 h-8 rounded-lg bg-primary/20 flex items-center" style={{ width: `${location.percentage}%` }}>
              <div className="h-full rounded-lg bg-primary" style={{ width: '100%' }}></div>
            </div>
            <p className="col-start-2 col-span-3 text-sm font-semibold text-[#111418] dark:text-white -mt-7 ml-2">{location.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Top Selling Items Component
function TopSellingItems() {
  const items = [
    { name: 'Producto A', color: '#4F46E5', percentage: '25%' },
    { name: 'Producto B', color: '#3B82F6', percentage: '20%' },
    { name: 'Producto C', color: '#10B981', percentage: '18%' },
    { name: 'Producto D', color: '#F59E0B', percentage: '15%' },
    { name: 'Otros', color: '#EF4444', percentage: '22%' },
  ];

  return (
    <div className="lg:col-span-2 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <p className="text-[#111418] dark:text-white text-lg font-semibold leading-normal">Productos Más Vendidos</p>
      <div className="flex items-center justify-center flex-1 my-4">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <circle cx="18" cy="18" fill="transparent" r="15.91549430918954" stroke="#4F46E5" strokeDasharray="25 100" strokeDashoffset="0" strokeWidth="4"></circle>
            <circle cx="18" cy="18" fill="transparent" r="15.91549430918954" stroke="#3B82F6" strokeDasharray="20 100" strokeDashoffset="-25" strokeWidth="4"></circle>
            <circle cx="18" cy="18" fill="transparent" r="15.91549430918954" stroke="#10B981" strokeDasharray="18 100" strokeDashoffset="-45" strokeWidth="4"></circle>
            <circle cx="18" cy="18" fill="transparent" r="15.91549430918954" stroke="#F59E0B" strokeDasharray="15 100" strokeDashoffset="-63" strokeWidth="4"></circle>
            <circle cx="18" cy="18" fill="transparent" r="15.91549430918954" stroke="#EF4444" strokeDasharray="22 100" strokeDashoffset="-78" strokeWidth="4"></circle>
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
    { day: 'Lun', height: '60%' },
    { day: 'Mar', height: '75%' },
    { day: 'Mié', height: '70%' },
    { day: 'Jue', height: '85%' },
    { day: 'Vie', height: '100%' },
    { day: 'Sáb', height: '95%' },
    { day: 'Dom', height: '80%' },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6">
      <p className="text-[#111418] dark:text-white text-lg font-semibold leading-normal">Ventas por Día de la Semana</p>
      <div className="grid grid-cols-7 gap-4 pt-4 min-h-[200px] items-end">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="w-full h-24 bg-primary/20 rounded-lg">
              <div className="w-full bg-primary rounded-lg" style={{ height: day.height }}></div>
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
              value="$152,430.50"
              change="5.2% vs prev. 30 días"
              isPositive={true}
            />
            <KPICard
              title="Ticket Promedio"
              value="$35.75"
              change="-1.8% vs prev. 30 días"
              isPositive={false}
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
