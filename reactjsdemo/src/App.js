import React, { useState, useEffect } from "react";
// import data from "./data";
import "../src/index.css";

function App() {
  const [showWarning, setShowWarning] = React.useState(false);

  let warningBox = null;
  if (showWarning) {
    warningBox = (
      <div data-testid="alert" id="alert">
        <h2>Are you sure?</h2>
        <p>These changes can't be reverted!</p>
        <button onClick={() => setShowWarning(false)}>Proceed</button>
      </div>
    );
  }

  return (
    <div>
      {warningBox}
      <button onClick={() => setShowWarning(true)}>Delete</button>
    </div>
  );
}
export default App;
