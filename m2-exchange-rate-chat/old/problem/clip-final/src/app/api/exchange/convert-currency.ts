import { getExchangeRate } from "./get-exchange-rate";
import { ConversionRates } from "./post-handler";

export async function convertCurrency({
  from,
  to,
  amount,
  conversionRates,
}: {
  from: string;
  to: string;
  amount: number;
  conversionRates: ConversionRates;
}): Promise<{ convertedAmount: number; rate: number }> {
  const rate = await getExchangeRate({ from, to, conversionRates });
  return { convertedAmount: amount * rate, rate };
}
