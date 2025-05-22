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
  let gameBoard = initialTable.map((row) => [...row]);

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner;
  let hasDraw = false;
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
      winner = firstSquareSymbol;
      console.log("🎉 Người chiến thắng là:", winner);
      break; // Thoát khỏi vòng lặp vì đã có người thắng
    }
  }
  if (!winner && gameTurn.length === 9) {
    hasDraw = true;
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
  function handleRestart() {
    setGameTurn([]);
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

      {/* {winner && (
        <div className="text-center text-xl font-bold text-green-600 mt-4">
          Người chiến thắng là: {winner}
        </div>
      )}

      {hasDraw && (
        <div className="text-center text-xl font-bold text-blue-600 mt-4">Cả 2 đã hòa!</div>
      )}
      
      {*/}

      {(winner || hasDraw) && <GameOver winner1={winner} onRestart={handleRestart} />}
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
export function GameOver({ winner1, onRestart }) {
  return (
    <>
      <div className="p-6 bg-red-100 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Game Over</h1>
        {winner1 ? (
          <div className="text-xl text-green-700">
            Người chiến thắng là: <span className="font-semibold">{winner1}</span>
          </div>
        ) : (
          <div className="text-xl text-gray-700">Cả 2 đã hòa</div>
        )}
      </div>
      <button onClick={onRestart}> Rematch</button>
    </>
  );
}
