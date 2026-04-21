import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { salary, city, bedrooms } = await req.json();

  const prompt = `
You are a cost of living expert.

A user earns $${salary} per month (after tax) and wants a ${bedrooms}-bedroom apartment in ${city}.

Return ONLY valid JSON:
{
  "verdict": "comfortable | stretch | cannot_afford",
  "avg_rent": number,
  "est_living_costs": number,
  "remaining": number,
  "summary": string
}
`;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  const text = response.output[0].content[0].text;

  return Response.json(JSON.parse(text));
}
