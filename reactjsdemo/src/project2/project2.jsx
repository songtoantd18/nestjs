import { React, useState } from "react";
import styled from "styled-components";

import UserInput from "./component/userInput";

const ControlContainer = styled.div`
  background-color: red;
`;

export default function Project2() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 1,
    annualInvestment: 2,
    expectedReturn: 6,
    duration: 15,
  });
  const inputValid = userInput.duration >= 1;

  function handleChange(inputIdentifier, newValue) {
    console.log("🚀 ~ handleChange ~ newValue:", newValue);
    console.log("🚀 ~ handleChange ~ inputIdentifier:", inputIdentifier);
    setUserInput((prevState) => ({
      ...prevState,
      [inputIdentifier]: newValue,
    }));
  }
  return (
    <ControlContainer>
      <h1>
        Hello World
        <UserInput userInput={userInput} onChange={handleChange} />
        {!inputValid && <div>Please enter duration greater than 0</div>}
        {inputValid && <Result userInput={userInput} />}
      </h1>
    </ControlContainer>
  );
}
export function Result({ userInput }) {
  const resultData = calculateInvestmentResult(userInput);

  let totalInterest = 0;
  let totalInvested = userInput.initialInvestment;

  return (
    <>
      <div>Đây là result</div>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {resultData.map((yearData, index) => {
            totalInterest += yearData.interestEarned;

            // Chỉ cộng annualInvestment từ năm thứ hai trở đi (index >= 1)
            // if (index > 0) {
            //   totalInvested += userInput.annualInvestment;
            // }

            totalInvested =
              (yearData.endOfYearSavings + 1 - totalInterest) / yearData.interestEarned;
            return (
              <tr key={yearData.year}>
                <td>{yearData.year}</td>
                <td>${yearData.endOfYearSavings}</td>
                {/* <td>{formatter.format(yearData.endOfYearSavings)}</td> */}
                <td>${yearData.interestEarned}</td>
                <td>${totalInterest}</td>
                <td>${totalInvested}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function calculateInvestmentResult(userInput) {
  const initialInvestment = Number(userInput.initialInvestment);
  console.log("🚀 ~ calculateInvestmentResult ~ initialInvestment:", initialInvestment);
  const annualInvestment = Number(userInput.annualInvestment);
  console.log("🚀 ~ calculateInvestmentResult ~ annualInvestment:", annualInvestment);
  const expectedReturn = Number(userInput.expectedReturn);
  console.log("🚀 ~ calculateInvestmentResult ~ expectedReturn:", expectedReturn);
  const duration = Number(userInput.duration);
  console.log("🚀 ~ calculateInvestmentResult ~ duration:", duration);

  const results = [];
  let currentSavings = initialInvestment;
  const yearlyReturnRate = expectedReturn / 100;

  for (let year = 1; year <= duration; year++) {
    const interestEarned = currentSavings * yearlyReturnRate;
    currentSavings += interestEarned + annualInvestment;
    results.push({
      year,
      interestEarned,
      endOfYearSavings: currentSavings,
      annualInvestment,
    });
  }

  return results;
}
