export async function getCountryCodes(): Promise<Record<string, string>> {
  return {
    "united states": "USD",
    canada: "CAD",
    mexico: "MXN",
    australia: "AUD",
  };
}
