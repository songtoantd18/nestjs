import React, { useState } from "react";

function App() {
  function handleClick(value) {
    console.log("🚀 ~ handleClick ~ value:", value);
  }

  return (
    <div id="app">
      <TabButton label="demo1" handleClick={() => handleClick("value1")} />
      <TabButton label="demo2" handleClick={() => handleClick("value2")} />
      <TabButton label="demo3" handleClick={() => handleClick("value3")} />
    </div>
  );
}

export default App;

function TabButton({ label, handleClick }) {
  return (
    <li>
      <button onClick={handleClick}>{label}</button>;
    </li>
  );
}
