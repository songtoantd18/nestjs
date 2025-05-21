import React, { useState } from "react";
import "../src/index.css";
// import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function derviActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const activePlayer = derviActivePlayer(gameTurn);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurn((prevTurn) => {
      console.log("🚀 ~ setGameTurn ~ prevTurn:", prevTurn);
      const currentPlayer = derviActivePlayer(prevTurn);

      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurn,
      ];
      console.log("🚀 ~ setGameTurn ~ updatedTurn:", updatedTurn);
      return updatedTurn;
    });
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
      <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurn} />
      <Log turns={gameTurn} />
    </>
  );
}

export default App;

export function Player({ initial, symbol, isActive, testdemofunction }) {
  const [namePlayer, setNamePlayer] = useState(initial);
  const [edit, setEdit] = useState(false);
  function handleEdit() {
    setEdit((edit) => !edit);
  }
  function handleChange(event) {
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

const initialTable = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export function GameBoard({ onSelectSquare, turns }) {
  let gameBoard = initialTable;
  for (const turn of turns) {
    console.log("🚀 ~ GameBoard ~ turn:", turn);
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
    console.log("🚀 ~ GameBoard ~ player:", player);
  }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => {
        return (
          <li key={rowIndex} className="board-row">
            {row.map((playerSymbol, colIndex) => {
              return (
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  key={colIndex}
                  className="board-cell"
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              );
            })}
          </li>
        );
      })}
    </ol>
  );
}
