import React from "react";
import { Router, Route, Link, useLocation } from "wouter";

// Sidebar Component
function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-900/50 dark:border-r dark:border-gray-800 p-4 flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBp7AZMKP_0QPw0Fudlg5DiL3Xi2iOh1hH0-B-rGYvwLCdFl0-FtCsjeDeFSu0m31oBPcX2_86A11Y4vr-FcQgF69QTPoWdNWasQjy-ETDE6p7uqoSLaLt0mpaimueWp57r3QZLbXZRtBIoUDGbgrtUclzo0uaO_j78ZtesuqZri8nu1p3DLbPlmcWqmliMIVE0sW-Gjd4x0FwmFD7ljnPE_nvnJs_teIVSiUaFzvkpT5okAIhnkEpOwNGwuOcj_0QxMBjAPZJ0E04w")'}}
          />
          <div className="flex flex-col">
            <h1 className="text-[#111418] dark:text-white text-base font-semibold leading-normal">BillingSys</h1>
            <p className="text-[#6B7280] dark:text-gray-400 text-sm font-normal leading-normal">Accounting</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${location === '/' ? 'bg-primary/20 text-primary dark:bg-primary/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-[#1F2937] dark:text-gray-300'}`}
          >
            <span className="material-symbols-outlined">receipt_long</span>
            <p className="text-sm font-medium leading-normal">Facturación</p>
          </Link>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-[#1F2937] dark:text-gray-300" href="#">
            <span className="material-symbols-outlined">credit_card_off</span>
            <p className="text-sm font-medium leading-normal">Notas de Crédito</p>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-[#1F2937] dark:text-gray-300" href="#">
            <span className="material-symbols-outlined">description</span>
            <p className="text-sm font-medium leading-normal">Notas de Venta</p>
          </a>
          <Link
            href="/reportes"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${location === '/reportes' ? 'bg-primary/20 text-primary dark:bg-primary/30' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-[#1F2937] dark:text-gray-300'}`}
          >
            <span className="material-symbols-outlined">leaderboard</span>
            <p className="text-sm font-medium leading-normal">Reportes</p>
          </Link>
        </nav>
      </div>
      <div className="flex flex-col gap-2">
        <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-[#1F2937] dark:text-gray-300" href="#">
          <span className="material-symbols-outlined">settings</span>
          <p className="text-sm font-medium leading-normal">Configuración</p>
        </a>
        <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-[#1F2937] dark:text-gray-300" href="#">
          <span className="material-symbols-outlined">logout</span>
          <p className="text-sm font-medium leading-normal">Cerrar Sesión</p>
        </a>
      </div>
    </aside>
  );
}

// Stats Card Component
function StatsCard({ title, value, percentage, isNegative = false }: { title: string; value: string; percentage: string; isNegative?: boolean }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
      <p className="text-[#1F2937] dark:text-gray-300 text-base font-medium leading-normal">{title}</p>
      <p className="text-[#111418] dark:text-white tracking-light text-3xl font-bold leading-tight">{value}</p>
      <div className={`flex items-center text-sm font-medium leading-normal ${isNegative ? 'text-[#EF4444]' : 'text-[#10B981]'}`}>
        <span className="material-symbols-outlined text-base">{isNegative ? 'arrow_downward' : 'arrow_upward'}</span>
        <span>{percentage}</span>
      </div>
    </div>
  );
}

// Invoice Row Component
function InvoiceRow({
  folio,
  cliente,
  fecha,
  monto,
  estado
}: {
  folio: string;
  cliente: string;
  fecha: string;
  monto: string;
  estado: 'Pagada' | 'Pendiente' | 'Vencida';
}) {
  const getStatusStyles = () => {
    switch (estado) {
      case 'Pagada':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Vencida':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return '';
    }
  };

  return (
    <tr className="bg-white dark:bg-transparent border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{folio}</td>
      <td className="px-6 py-4">{cliente}</td>
      <td className="px-6 py-4">{fecha}</td>
      <td className="px-6 py-4">{monto}</td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
          {estado}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <button className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          <span className="material-symbols-outlined text-lg">more_horiz</span>
        </button>
      </td>
    </tr>
  );
}

// Main Billing Page Component
function BillingPage() {
  const invoices = [
    { folio: '#INV-00123', cliente: 'Tech Solutions Inc.', fecha: '2023-10-26', monto: '$2,500.00', estado: 'Pagada' as const },
    { folio: '#INV-00122', cliente: 'Innovate Co.', fecha: '2023-10-25', monto: '$1,200.50', estado: 'Pendiente' as const },
    { folio: '#INV-00121', cliente: 'Marketing Pro', fecha: '2023-09-15', monto: '$850.00', estado: 'Vencida' as const },
    { folio: '#INV-00120', cliente: 'Global Exports', fecha: '2023-10-22', monto: '$5,300.00', estado: 'Pagada' as const },
    { folio: '#INV-00119', cliente: 'Creative Minds', fecha: '2023-10-20', monto: '$975.00', estado: 'Pendiente' as const },
  ];

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-8">
        {/* ToolBar */}
        <header className="flex justify-between items-center gap-2 mb-6">
          <div className="flex gap-2">
            <button className="p-2 text-[#1F2937] dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <button className="p-2 text-[#1F2937] dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
          <button className="flex items-center justify-center rounded-lg h-10 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] px-4">
            <span className="material-symbols-outlined">add</span>
            <span className="truncate">Crear Nueva Factura</span>
          </button>
        </header>

        {/* PageHeading */}
        <div className="flex flex-wrap justify-between gap-3 mb-6">
          <p className="text-[#111418] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Facturación</p>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Facturado (Este Mes)"
            value="$15,750.00"
            percentage="2.5%"
          />
          <StatsCard
            title="Monto Pendiente de Cobro"
            value="$2,300.50"
            percentage="1.2%"
          />
          <StatsCard
            title="Facturas Vencidas"
            value="3"
            percentage="5.0%"
            isNegative={true}
          />
        </section>

        {/* SectionHeader */}
        <h2 className="text-[#111418] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
          Facturas Recientes
        </h2>

        {/* Invoices Table */}
        <div className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-[#6B7280] dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 font-medium" scope="col">Folio</th>
                  <th className="px-6 py-3 font-medium" scope="col">Cliente</th>
                  <th className="px-6 py-3 font-medium" scope="col">Fecha de Emisión</th>
                  <th className="px-6 py-3 font-medium" scope="col">Monto</th>
                  <th className="px-6 py-3 font-medium" scope="col">Estado</th>
                  <th className="px-6 py-3 font-medium" scope="col">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <InvoiceRow key={invoice.folio} {...invoice} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

// Reports Page Component
function ReportsPage() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-8">
        {/* ToolBar */}
        <header className="flex justify-between items-center gap-2 mb-6">
          <div className="flex gap-2">
            <button className="p-2 text-[#1F2937] dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <button className="p-2 text-[#1F2937] dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
          <button className="flex items-center justify-center rounded-lg h-10 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] px-4">
            <span className="material-symbols-outlined">add</span>
            <span className="truncate">Generar Reporte</span>
          </button>
        </header>

        {/* PageHeading */}
        <div className="flex flex-wrap justify-between gap-3 mb-6">
          <p className="text-[#111418] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Reportes</p>
        </div>

        {/* Reports Content */}
        <div className="flex flex-col items-center justify-center text-center mt-12">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Tipos de Reportes Disponibles</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Seleccione un tipo de reporte para generar. Próximamente se añadirán más opciones.</p>
            <div className="space-y-4">
              <a className="flex items-center justify-between w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" href="#">
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Reportes de Venta por Local</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Analiza las ventas detalladas por cada sucursal.</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pendiente</span>
              </a>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center">
            <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">dataset</span>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">No hay reportes generados</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Cuando genere un reporte, aparecerá aquí.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

// Main App Component
export function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <Route path="/" component={BillingPage} />
        <Route path="/reportes" component={ReportsPage} />
      </div>
    </Router>
  );
}

export default App;
