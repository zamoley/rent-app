export async function POST(req) {
  try {
    const body = await req.json();

    return Response.json({
      verdict: "comfortable",
      avg_rent: 1200,
      est_living_costs: 800,
      remaining: 500,
      summary: "API is working correctly (safe mode).",
      received: body
    });
  } catch (error) {
    return Response.json(
      { error: "Server crashed", details: error.message },
      { status: 500 }
    );
  }
}
