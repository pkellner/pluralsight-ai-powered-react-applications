export async function getExchangeRate({
  from,
  to,
}: {
  from: string;
  to: string;
}): Promise<number> {
  const exchangeRates: Record<string, Record<string, number>> = {
    USD: { USD: 1, MXN: 18.5, CAD: 1.32, EUR: 0.89, CHF: 0.91 },
    MXN: { MXN: 1, USD: 0.054, CAD: 0.073, EUR: 0.045, CHF: 0.05 },
    CAD: { CAD: 1, USD: 0.71, MXN: 13.7, EUR: 0.67, CHF: 0.69 },
    EUR: { EUR: 1, USD: 1.12, MXN: 22.5, CAD: 1.5, CHF: 1.04 },
    CHF: { CHF: 1, USD: 1.1, MXN: 20, CAD: 1.6, EUR: 0.97 },
  };
  if (from === to) {
    return 1; // Same currency conversion
  }

  if (!exchangeRates[from] || !exchangeRates[from][to]) {
    throw new Error(`Exchange rate not available for ${from} to ${to}.`);
  }

  return exchangeRates[from][to];
}
