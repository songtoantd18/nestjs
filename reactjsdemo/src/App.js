import React, { useState, useEffect } from "react";

function App() {
  const [selectedValue, setSelectedValue] = useState("xin chào");
  useEffect(() => {
    console.log("✅ selectedValue đã cập nhật:", selectedValue);
  }, [selectedValue]);

  function handleClick(value) {
    console.log("🚀 ~ App ~ selectedValue:", selectedValue);

    setSelectedValue(value);
    console.log("🚀 ~ App ~ selectedValue:", selectedValue);
  }

  return (
    <div id="app">
      <TabButton label="demo1" handleClick={() => handleClick("value1")} />
      <TabButton label="demo2" handleClick={() => handleClick("value2")} />
      <TabButton label="demo3" handleClick={() => handleClick("value3")} />

      <div>{selectedValue}</div>
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
