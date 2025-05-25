export default function UserInput({ userInput, onChange }) {
  console.log("🚀 ~ UserInput ~ onChange:", onChange);
  console.log("🚀 ~ UserInput ~ userInput:", userInput);
  return (
    <>
      <div className="input-group">
        <p>
          <label>initial investment</label>
          <input
            type="number"
            value={userInput.initialInvestment}
            required
            onChange={(event) => onChange("initialInvestment", event.target.value)}
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
            onChange={(event) => onChange("annualInvestment", event.target.value)}
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
            onChange={(event) => onChange("expectedReturn", event.target.value)}
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
            onChange={(event) => onChange("duration", event.target.value)}
          />
        </p>
      </div>
    </>
  );
}
