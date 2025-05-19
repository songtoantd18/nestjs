import React, { useState } from "react";
import "../src/index.css";
// import GameBoard from "./components/GameBoard";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  function handleSelectSquare(player) {
    console.log("songtoan123-----------------------------------------------");
    setActivePlayer((curentActivePlayer) => (curentActivePlayer === "X" ? "O" : "X"));
    console.log("🚀 ~ handleSelectSquare ~ player:", player);
  }
  function testdemo() {
    // đang test function tạo ở compoent cha sau đó truyền vào component con
    //  và dùng thử có được không dùng ok nhé , thêm 1 kiến thức mới
    console.log("demo11111111111111111111111111111111111111111111111111");
  }
  return (
    <>
      <div>
        <ol id="player" className="highlight-player">
          <Player
            initial="abvvvvvvssssvvvvvvvvvvvcxyz"
            symbol="X"
            isActive={activePlayer === "X"}
            testdemofunction={testdemo}
          />
          <Player
            testdemofunction={testdemo}
            initial="Nguyen"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
      </div>
      <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} />
    </>
  );
}

export default App;

export function Player({ initial, symbol, isActive, testdemofunction }) {
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
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {editPlayerName}
          <span>{symbol}</span>
        </span>
        <button onClick={handleEdit}>{edit ? "Save" : "Edit"}</button>
        <button onClick={testdemofunction}> test function</button>
      </li>
    </div>
  );
}
