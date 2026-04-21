export async function POST() {
  return Response.json({
    verdict: "comfortable",
    avg_rent: 1200,
    est_living_costs: 800,
    remaining: 500,
    summary: "Backend working."
  });
}
