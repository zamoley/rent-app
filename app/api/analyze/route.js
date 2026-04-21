import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  let body;

  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { salary = 3000, city = "Unknown", bedrooms = 1 } = body;

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
You are a strict JSON generator.

A user earns $${salary}/month and wants a ${bedrooms}-bedroom apartment in ${city}.

Return ONLY valid JSON (no extra text, no markdown):

{
  "verdict": "comfortable | stretch | cannot_afford",
  "avg_rent": number,
  "est_living_costs": number,
  "remaining": number,
  "summary": "short explanation"
}

Rules:
- Be realistic with rent in ${city}
- Output must be valid JSON only
`,
    });

    const text = response.output_text;

    // SAFE JSON parsing (prevents crashes)
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No JSON found in AI response");
    }

    const cleanJson = text.slice(jsonStart, jsonEnd + 1);
    const parsed = JSON.parse(cleanJson);

    return Response.json(parsed);
  } catch (error) {
    return Response.json({
      verdict: "stretch",
      avg_rent: salary * 0.5,
      est_living_costs: salary * 0.3,
      remaining: salary * 0.2,
      summary: "Fallback mode (AI unavailable or response invalid).",
      debug: error.message,
    });
  }
}
