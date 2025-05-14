import React, { useState, useEffect } from "react";
// import data from "./data";
import "../src/index.css";

function App() {
  const DUMMY_TODOS = ["Learn React", "Practice React", "Profit!"];
  console.log("🚀 ~ App ~ DUMMY_TODOS:", DUMMY_TODOS);
  return DUMMY_TODOS.map((todo, index) => {
    console.log("🚀 ~ returnDUMMY_TODOS.map ~ index:", index);
    console.log("🚀 ~ returnDUMMY_TODOS.map ~ todo:", todo);
    return <Todo key={index} title={todo} />;
  });
}
export default App;
export function Todo({ title }) {
  return <div>{title}</div>;
}



