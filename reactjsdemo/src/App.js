import React, { useState } from "react";
import data from "./data"; // Import mảng data
import "../src/index.css";
import GameBoard from "./components/GameBoard";

function App() {
  const [value, setValue] = useState(false);
  function handleClick() {
    setValue(!value);
  }

  return (
    <>
      <div className="App">
        <h1>{value ? "true" : "false"}</h1>
        <button onClick={handleClick}>Click me1</button>
        <button onClick={() => setValue(!value)}>Click me2</button>
      </div>
      <div>
        <Player initial="Max" symbol="🐶" />
        <Player initial="Minh" symbol="🐱" />
      </div>
      <GameBoard />
    </>
  );
}

export default App;

export function Player({ initial, symbol }) {
  const [namePlayer, setNamePlayer] = useState(initial);
  const [edit, setEdit] = useState(false);
  function handleEdit() {
    setEdit((edit) => !edit);
    console.log("🚀 ~ handleEdit ~ edit1111:", edit);
  }
  function handleChange(event) {
    console.log("🚀 ~ handleChange ~ event:", event);
    setNamePlayer(event.target.value);
  }
  let editPlayerName = <span className="player-name">{namePlayer}</span>;
  if (edit) {
    editPlayerName = <input type="text" onChange={handleChange} value={namePlayer} required />;
  }
  return (
    <div>
      <li>
        <span>
          {editPlayerName}
          <span>{symbol}</span>
        </span>
        <button onClick={handleEdit}>{edit ? "Save" : "Edit"}</button>
      </li>
    </div>
  );
}
