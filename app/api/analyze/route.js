export async function POST(req) {
  let body;

  try {
    body = await req.json();
  } catch {
    return Response.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }

  const { salary = 3000, city = "Boston", bedrooms = 1 } = body;

  // ---------- 1. STATIC FALLBACK MODEL ----------
  const staticModel = () => {
    const baseRentMap = {
      Boston: 2500,
      NewYork: 3200,
      London: 2800,
      default: 1800,
    };

    const base = baseRentMap[city] || baseRentMap.default;

    const avg_rent = base * bedrooms;
    const est_living_costs = salary * 0.35;
    const remaining = salary - (avg_rent + est_living_costs);

    let verdict = "comfortable";

    if (avg_rent / salary > 0.5) verdict = "cannot_afford";
    else if (avg_rent / salary > 0.3) verdict = "stretch";

    return {
      verdict,
      avg_rent: Math.round(avg_rent),
      est_living_costs: Math.round(est_living_costs),
      remaining: Math.round(remaining),
      summary: `Static estimate for ${city} (AI unavailable or fallback mode).`,
    };
  };

  // ---------- 2. TRY AI ----------
  try {
    const OpenAI = (await import("openai")).default;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
You are a cost-of-living analyst.

Return ONLY valid JSON:

{
  "verdict": "comfortable | stretch | cannot_afford",
  "avg_rent": number,
  "est_living_costs": number,
  "remaining": number,
  "summary": "short explanation"
}

User:
Salary: ${salary}
City: ${city}
Bedrooms: ${bedrooms}
`,
    });

    const text = response.output_text;

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) throw new Error("Invalid AI output");

    const json = JSON.parse(text.slice(start, end + 1));

    return Response.json({
      ...json,
      mode: "ai",
    });
  } catch (error) {
    // ---------- 3. FALLBACK ----------
    return Response.json({
      ...staticModel(),
      mode: "static_fallback",
      debug: error.message,
    });
  }
}
