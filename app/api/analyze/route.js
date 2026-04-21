"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const test = async () => {
    setLoading(true);
    setResult(null);

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

  const getVerdictStyle = (verdict) => {
    switch (verdict) {
      case "comfortable":
        return { color: "#0a7a2f", label: "Comfortable" };
      case "stretch":
        return { color: "#b7791f", label: "Stretch Budget" };
      case "cannot_afford":
        return { color: "#c53030", label: "Not Affordable" };
      default:
        return { color: "#333", label: verdict };
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "Arial" }}>
      
      {/* HEADER */}
      <h1 style={{ fontSize: 30, marginBottom: 6 }}>
        AI Financial Housing Advisor
      </h1>

      <p style={{ color: "#666", marginBottom: 20 }}>
        Get a real-world affordability breakdown before you rent
      </p>

      {/* BUTTON */}
      <button
        onClick={test}
        style={{
          padding: "12px 20px",
          background: "#111",
          color: "white",
          borderRadius: 10,
          cursor: "pointer",
          fontSize: 14,
        }}
      >
        {loading ? "Analyzing your finances..." : "Check Affordability"}
      </button>

      {/* LOADING STATE */}
      {loading && (
        <div style={{ marginTop: 30, color: "#666" }}>
          <p>📊 Analyzing rent vs income ratio...</p>
          <p>🏙 Checking local cost-of-living patterns...</p>
          <p>💡 Building financial recommendation...</p>
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            borderRadius: 14,
            background: "#f7f7f7",
            border: "1px solid #e5e5e5",
          }}
        >
          {/* VERDICT HEADER */}
          <h2 style={{ marginBottom: 10 }}>
            Financial Assessment
          </h2>

          <div
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: getVerdictStyle(result.verdict).color,
              marginBottom: 15,
            }}
          >
            {getVerdictStyle(result.verdict).label}
          </div>

          {/* AI-STYLE EXPLANATION */}
          <p style={{ marginBottom: 15, lineHeight: 1.5 }}>
            {result.summary}
          </p>

          {/* DATA BREAKDOWN */}
          <div style={{ fontSize: 14, color: "#444", lineHeight: 1.8 }}>
            <div>🏠 Estimated Rent: <b>${result.avg_rent}</b></div>
            <div>💸 Living Costs: <b>${result.est_living_costs}</b></div>
            <div>💰 Remaining Income: <b>${result.remaining}</b></div>
          </div>

          {/* DISCLAIMER STYLE (makes it feel “advisor-like”) */}
          <p style={{ marginTop: 15, fontSize: 12, color: "#888" }}>
            *This is an automated financial estimate and not professional financial advice.
          </p>
        </div>
      )}
    </div>
  );
}
