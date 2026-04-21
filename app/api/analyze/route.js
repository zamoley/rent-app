import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { salary, city, bedrooms } = body;

    const prompt = `
You are a real estate affordability expert.

A user earns $${salary} per month after tax and wants a ${bedrooms}-bedroom apartment in ${city}.

Return ONLY valid JSON in this format:
{
  "verdict": "comfortable | stretch | cannot_afford",
  "avg_rent": number,
  "est_living_costs": number,
  "remaining": number,
  "summary": "string explanation"
}

Rules:
- Use realistic rent estimates for ${city}
- Rent is for ${bedrooms}-bedroom apartments only
- Keep response strictly JSON, no extra text
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    const text = response.output_text;

    // Safely parse AI JSON
    const json = JSON.parse(text);

    return Response.json(json);
  } catch (error) {
    return Response.json(
      {
        error: "AI request failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
