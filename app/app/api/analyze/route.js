import OpenAI from "openai";

export const runtime = "nodejs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { salary, city, bedrooms } = await req.json();

  const prompt = `
A user earns ${salary} per month and wants a ${bedrooms}-bedroom apartment in ${city}.

Return ONLY JSON:
{
  "verdict": "comfortable | stretch | cannot_afford",
  "avg_rent": 0,
  "est_living_costs": 0,
  "remaining": 0,
  "summary": "string"
}
`;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  const text = response.output[0].content[0].text;

  return Response.json(JSON.parse(text));
}
