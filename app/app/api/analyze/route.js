export async function POST(req) {
  const body = await req.json();

  return Response.json({
    verdict: "comfortable",
    avg_rent: 1200,
    est_living_costs: 800,
    remaining: 500,
    summary: "Test response (backend working without AI)."
  });
}
