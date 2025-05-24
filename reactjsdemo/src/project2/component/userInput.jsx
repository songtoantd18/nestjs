import { useState } from "react";

export default function UserInput() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 1000000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });
  function handleChange(inputIdentifier, newValue) {
    console.log("🚀 ~ handleChange ~ newValue:", newValue);
    console.log("🚀 ~ handleChange ~ inputIdentifier:", inputIdentifier);
    setUserInput((prevState) => ({
      ...prevState,
      [inputIdentifier]: newValue,
    }));
  }

  return (
    <>
      <div className="input-group">
        <p>
          <label>initial investment</label>
          <input
            type="number"
            value={userInput.initialInvestment}
            required
            onChange={(event) => handleChange("initialInvestment", event.target.value)}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>annual investment</label>
          <input
            type="number"
            value={userInput.annualInvestment}
            required
            onChange={(event) => handleChange("annualInvestment", event.target.value)}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>expected return</label>
          <input
            type="number"
            value={userInput.expectedReturn}
            required
            onChange={(event) => handleChange("expectedReturn", event.target.value)}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>duration</label>
          <input
            type="number"
            value={userInput.duration}
            required
            onChange={(event) => handleChange("duration", event.target.value)}
          />
        </p>
      </div>
    </>
  );
}
