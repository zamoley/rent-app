"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const test = async () => {
    setLoading(true);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        salary: 3000,
        city: "Boston",
        bedrooms: 1,
      }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>
        Rent Affordability Checker
      </h1>

      <button
        onClick={test}
        style={{
          padding: "10px 20px",
          background: "#111",
          color: "white",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        {loading ? "Analyzing..." : "Test API"}
      </button>

      {result && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            borderRadius: 12,
            background:
              result.verdict === "comfortable"
                ? "#e6ffed"
                : result.verdict === "stretch"
                ? "#fff7e6"
                : "#ffe6e6",
          }}
        >
          <h2>Verdict: {result.verdict}</h2>
          <p><b>Rent:</b> ${result.avg_rent}</p>
          <p><b>Living costs:</b> ${result.est_living_costs}</p>
          <p><b>Remaining:</b> ${result.remaining}</p>
          <p style={{ marginTop: 10 }}>{result.summary}</p>
        </div>
      )}
    </div>
  );
}
