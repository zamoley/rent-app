"use client";

import { useState } from "react";

export default function Home() {
  const [salary, setSalary] = useState("");
  const [city, setCity] = useState("");
  const [bedrooms, setBedrooms] = useState("1");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ salary, city, bedrooms }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", fontFamily: "Arial" }}>
      <h1>Can I Afford the Rent Here?</h1>

      <input
        placeholder="Monthly salary (after tax)"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: 8, width: "100%" }}
      />

      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: 8, width: "100%" }}
      />

      <select
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: 8, width: "100%" }}
      >
        <option value="0">Studio</option>
        <option value="1">1 Bedroom</option>
        <option value="2">2 Bedroom</option>
        <option value="3">3 Bedroom</option>
      </select>

      <button onClick={handleSubmit} style={{ padding: 10 }}>
        {loading ? "Analyzing..." : "Check Affordability"}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>Verdict: {result.verdict}</h2>
          <p>{result.summary}</p>
        </div>
      )}
    </div>
  );
}
