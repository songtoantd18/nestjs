import React, { useState } from "react";

const initialTable = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  const [valueChosen, setValueChosen] = useState(initialTable);
  //   console.log("🚀 ~ GameBoard ~ initialTable:", initialTable);
  function handleSelected(rowIndex, colIndex) {
    // initialTable[rowIndex][colIndex] = "X";
    setValueChosen((prev) => {
      console.log("🚀 ~ setValueChosen ~ prev:", prev);
      const updateBoard = prev.map((innerArray) => [...innerArray]); // ✔ Gọn, đúng, đủ
      console.log("🚀 ~ setValueChosen ~ updateBoard:", updateBoard);

      updateBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updateBoard;
    });
    onSelectSquare();
  }
  return (
    <ol id="game-board">
      {valueChosen.map((row, rowIndex) => {


        return (
          <li key={rowIndex} className="board-row">
            {row.map((playerSymbol, colIndex) => {

              return (
                <button
                  onClick={() => handleSelected(rowIndex, colIndex)}
                  key={colIndex}
                  className="board-cell"
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
