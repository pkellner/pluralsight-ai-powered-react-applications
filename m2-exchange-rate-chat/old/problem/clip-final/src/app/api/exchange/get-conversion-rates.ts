import { exchangeData } from "./exchange-data";
import { ConversionRates } from "./post-handler";

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const USE_RAPID_API_DATA = process.env.USE_RAPID_API_DATA === "true";

export async function getConversionRates(): Promise<ConversionRates> {
  if (!USE_RAPID_API_DATA) {
    return new Promise((resolve) => {
      resolve(exchangeData.conversion_rates as ConversionRates);
    });
  }

  const endpoint = `https://v6.exchangerate-api.com/v6/${RAPID_API_KEY}/latest/USD`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        error: "Failed to fetch exchange rates",
        message: `Call to ${endpoint} returned status ${response.status}: ${response.statusText}`,
      }),
      { status: 500 },
    );
  }

  const data = (await response.json()) as { conversion_rates: ConversionRates };
  return data.conversion_rates;
}
