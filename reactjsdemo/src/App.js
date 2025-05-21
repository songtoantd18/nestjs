import React, { useState } from "react";
import "../src/index.css";
// import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNER_CONDITION } from "./constants/data";
function derviActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
const initialTable = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function App() {
  const [gameTurn, setGameTurn] = useState([]);
  const activePlayer = derviActivePlayer(gameTurn);
  let gameBoard = initialTable;
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  // Lặp qua từng tổ hợp điều kiện chiến thắng đã định nghĩa trong WINNER_CONDITION
  for (const combination of WINNER_CONDITION) {
    // Lấy giá trị ở ô đầu tiên của tổ hợp
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    console.log("🚀 ~ App ~ firstSquareSymbol:", firstSquareSymbol);

    // Lấy giá trị ở ô thứ hai của tổ hợp
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    console.log("🚀 ~ App ~ secondSquareSymbol:", secondSquareSymbol);

    // Lấy giá trị ở ô thứ ba của tổ hợp
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];
    console.log("🚀 ~ App ~ thirdSquareSymbol:", thirdSquareSymbol);

    // Kiểm tra cả 3 ô có cùng giá trị (X hoặc O) và không phải là null (nghĩa là đã có người chơi đánh)
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      // Nếu đúng, in ra người chiến thắng
      console.log("🎉 Người chiến thắng là:", firstSquareSymbol);
      break; // Thoát khỏi vòng lặp vì đã có người thắng
    }
  }

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
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
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

export function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => {
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
