import React, { useState } from "react";

const initialTable = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  let gameBoard = initialTable;
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
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
