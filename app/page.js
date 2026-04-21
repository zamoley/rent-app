"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const test = async () => {
    try {
      setLoading(true);

      console.log("Button clicked");

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

      console.log("API response:", data);

      setResult(data);
    } catch (err) {
      console.error("Request failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Rent App</h1>

      <button onClick={test} disabled={loading}>
        {loading ? "Loading..." : "Test API"}
      </button>

      {result && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
