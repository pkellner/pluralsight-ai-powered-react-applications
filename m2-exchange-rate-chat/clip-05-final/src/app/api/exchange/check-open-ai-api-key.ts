export function checkOpenAIApiKey(): Response | null {
  const key = process.env.OPENAI_API_KEY;

  if (!key) {
    return new Response(
      JSON.stringify({
        error: "Missing OpenAI API key",
        message:
          "No valid OpenAI API key found. Please create a .env.local file in the root of your project and set OPENAI_API_KEY to your actual key. You can copy env.local to .env.local and update the value there.",
      }),
      { status: 500 },
    );
  }

  if (key === "YOUR_OPENAI_API_KEY") {
    return new Response(
      JSON.stringify({
        error: "Default OpenAI API key",
        message:
          "Your OpenAI API key is set to its default placeholder. Please update .env.local with an actual key value.",
      }),
      { status: 500 },
    );
  }

  return null;
}
