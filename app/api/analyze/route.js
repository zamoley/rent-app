import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { salary, city, bedrooms } = await req.json();

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: `A user earns $${salary} per month after tax and wants to rent a ${bedrooms}-bedroom apartment in ${city}. 
    
Estimate:
- average rent
- living costs
- whether they can afford it
    
Respond in JSON with:
verdict, avg_rent, est_living_costs, remaining, summary.`,
  });

  const text = response.output_text;

  return Response.json({
    result: text
  });
}
