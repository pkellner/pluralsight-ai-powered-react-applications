import { ConversionRates } from "./post-handler";

export async function getExchangeRate({
  from,
  to,
  conversionRates,
}: {
  from: string;
  to: string;
  conversionRates: ConversionRates;
}): Promise<number> {
  if (!conversionRates[from] || !conversionRates[to]) {
    throw new Response(
      JSON.stringify({
        error: "Invalid currency code(s)",
        message: `Please make sure both ${from} and ${to} are valid currency codes.`,
      }),
      { status: 400 },
    );
  }
  return conversionRates[to] / conversionRates[from];
}
