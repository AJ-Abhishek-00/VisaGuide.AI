import React, { useState } from "react";
import "./App.css"; // Link to your CSS

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse("Loading...");

    const res = await fetch("http://localhost:5000/visa-info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    setResponse(data.response || data.error);
  };

  return (
    <div className="app-container">
      <h1>Visa Info Assistant 🌐</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Ask me about visa-related information..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <div className="response-box">
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
