import { Location, SalesData } from '../types/filters';

// Ubicaciones disponibles
export const MOCK_LOCATIONS: Location[] = [
  { id: 'centro', name: 'Centro', displayName: 'Centro' },
  { id: 'mall', name: 'Mall', displayName: 'Centro Comercial' },
  { id: 'universidad', name: 'Universidad', displayName: 'Zona Universitaria' },
  { id: 'playa', name: 'Playa', displayName: 'Zona Playa' },
  { id: 'casco-antiguo', name: 'Casco Antiguo', displayName: 'Casco Antiguo' }
];

// Platos típicos de restaurante de mariscos
export const SEAFOOD_DISHES = [
  'Ceviche Mixto',
  'Arroz con Mariscos',
  'Langostinos al Ajillo',
  'Cazuela de Mariscos',
  'Pulpo al Olivo',
  'Parihuela',
  'Chupe de Camarones',
  'Tacu Tacu de Mariscos',
  'Jalea de Pescado',
  'Escabeche de Pescado'
];

// Generar datos de ventas simulados
export function generateMockSalesData(): SalesData[] {
  const sales: SalesData[] = [];
  const now = new Date();
  const daysBack = 180; // 6 meses de datos

  
  for (let i = 0; i < daysBack; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Aumentar las ventas para los últimos 30 días para asegurar datos suficientes
    const isRecentPeriod = i <= 30; // Últimos 30 días tienen más actividad
    const maxSalesPerDay = isRecentPeriod ? 15 : 8; // Más ventas en período reciente

    // Generar entre 1 y maxSalesPerDay ventas por día por ubicación
    const totalSales = isRecentPeriod ?
      Math.floor(Math.random() * (maxSalesPerDay - 3)) + 3 : // Mínimo 3 ventas en período reciente
      Math.floor(Math.random() * (maxSalesPerDay + 1)); // Período normal puede tener 0 ventas

    for (let j = 0; j < totalSales; j++) {
      MOCK_LOCATIONS.forEach(location => {
        // Probabilidad de venta por ubicación (aumentada para mejor demo)
        const locationProbability =
          location.id === 'centro' ? 0.9 :
          location.id === 'mall' ? 0.8 :
          location.id === 'playa' ? 0.7 :
          location.id === 'universidad' ? 0.6 :
          location.id === 'casco-antiguo' ? 0.5 : 0.4;

        if (Math.random() < locationProbability) {
          // Generar entre 1 y 4 items por venta
          const itemCount = Math.floor(Math.random() * 4) + 1;
          const items: string[] = [];

          for (let k = 0; k < itemCount; k++) {
            const randomDish = SEAFOOD_DISHES[Math.floor(Math.random() * SEAFOOD_DISHES.length)];
            if (!items.includes(randomDish)) {
              items.push(randomDish);
            }
          }

          // Calcular monto basado en los items (aumentado para mejor demo)
          const baseAmount = 35; // Monto base aumentado
          const itemMultiplier = items.length * 2.0;
          const randomFactor = 0.7 + Math.random() * 0.6; // Mayor variación
          const amount = Math.round((baseAmount * itemMultiplier * randomFactor) * 100) / 100;

          sales.push({
            id: `sale-${date.getTime()}-${location.id}-${j}`,
            date: new Date(date),
            locationId: location.id,
            amount,
            items
          });
        }
      });
    }
  }

  
  return sales.sort((a, b) => b.date.getTime() - a.date.getTime()); // Ordenar por fecha descendente
}

// Generar datos de ventas
export const MOCK_SALES_DATA = generateMockSalesData();

// Función para filtrar datos de ventas
export function filterSalesData(
  salesData: SalesData[],
  startDate: Date,
  endDate: Date,
  locationId?: string | null
): SalesData[] {
  const filtered = salesData.filter(sale => {
    const dateMatch = sale.date >= startDate && sale.date <= endDate;
    const locationMatch = !locationId || sale.locationId === locationId;
    return dateMatch && locationMatch;
  });

  
  return filtered;
}

// Calcular métricas KPI
export function calculateKPIs(filteredSales: SalesData[], previousSales: SalesData[]) {
  const currentTotal = filteredSales.reduce((sum, sale) => sum + sale.amount, 0);
  const previousTotal = previousSales.reduce((sum, sale) => sum + sale.amount, 0);

  const currentCount = filteredSales.length;
  const previousCount = previousSales.length;

  const currentAverage = currentCount > 0 ? currentTotal / currentCount : 0;
  const previousAverage = previousCount > 0 ? previousTotal / previousCount : 0;

  // Calcular cambio porcentual
  const totalChange = previousTotal > 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;
  const averageChange = previousAverage > 0 ? ((currentAverage - previousAverage) / previousAverage) * 100 : 0;

  return {
    totalSales: currentTotal,
    averageTicket: currentAverage,
    changePercentage: Math.abs(totalChange),
    isPositive: totalChange >= 0,
    changePercentageAverage: Math.abs(averageChange),
    isPositiveAverage: averageChange >= 0
  };
}