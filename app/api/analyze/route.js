import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const body = await req.json();
  const { salary, city, bedrooms } = body;

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `Return JSON only: salary=${salary}, city=${city}, bedrooms=${bedrooms}`,
    });

    const json = JSON.parse(response.output_text);
    return Response.json(json);

  } catch (error) {
    // fallback mode (NO AI)
    return Response.json({
      verdict: "stretch",
      avg_rent: salary * 0.5,
      est_living_costs: salary * 0.3,
      remaining: salary * 0.2,
      summary: "Fallback mode (AI unavailable due to quota)."
    });
  }
}
