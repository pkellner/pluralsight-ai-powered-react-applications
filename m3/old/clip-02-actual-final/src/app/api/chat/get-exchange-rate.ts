export async function getExchangeRate({
  from,
  to,
}: {
  from: string;
  to: string;
}): Promise<number> {
  const exchangeRates: Record<string, Record<string, number>> = {
    USD: { USD: 1, MXN: 18.5, CAD: 1.32 },
    MXN: { MXN: 1, USD: 0.054, CAD: 0.073 },
    CAD: { CAD: 1, USD: 0.71, MXN: 13.7 },
  };

  if (from === to) {
    return 1; // Same currency conversion
  }

  if (!exchangeRates[from] || !exchangeRates[from][to]) {
    throw new Error(`Exchange rate not available for ${from} to ${to}.`);
  }

  return exchangeRates[from][to];
}
