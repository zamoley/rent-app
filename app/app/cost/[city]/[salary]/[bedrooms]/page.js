export default async function Page({ params }) {
  const { city, salary, bedrooms } = params;

  // call your existing API internally
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      city,
      salary: Number(salary),
      bedrooms: Number(bedrooms),
    }),
  });

  const data = await res.json();

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Cost of Living in {city}</h1>

      <p>
        Salary: ${salary} / month<br />
        Bedrooms: {bedrooms}
      </p>

      <hr />

      <h2 style={{ color: "#0a7a2f" }}>
        Verdict: {data.verdict}
      </h2>

      <p>{data.summary}</p>

      <ul>
        <li>Estimated Rent: ${data.avg_rent}</li>
        <li>Living Costs: ${data.est_living_costs}</li>
        <li>Remaining: ${data.remaining}</li>
      </ul>
    </div>
  );
}
