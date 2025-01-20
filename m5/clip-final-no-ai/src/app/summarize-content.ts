export async function summarizeContent(body: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `Email Length: ${body.length} characters`;
}
