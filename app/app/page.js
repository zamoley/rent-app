"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);

  const test = async () => {
    const res = await fetch("/api/analyze", {
      method: "POST",
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Rent App</h1>

      <button onClick={test}>Test API</button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
