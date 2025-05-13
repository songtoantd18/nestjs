import React, { useState } from "react";

function App() {
  return (
    <div id="app">
      <h1>Available Experts</h1>
      <Card name="Anthony Blake">
        <p>Blake is a professor of Computer Science at the University of Illinois.</p>
        <p>
          <a href="mailto:blake@example.com">Email Anthony</a>
        </p>
      </Card>

      <Card name="Maria Miles">
        <p>Maria is a professor of Computer Science at the University of Illinois.</p>
        <p>
          <a href="mailto:blake@example.com">Email Maria</a>
        </p>
      </Card>
    </div>
  );
}

export default App;

export function Card({ name, children }) {
  console.log("🚀 ~ Card ~ children:", children);
  console.log("🚀 ~ Card ~ name:", name);
  console.log("songtoan123");

  return (
    <div className="card">
      <h2>{name}</h2>
      {children}
    </div>
  );
}
