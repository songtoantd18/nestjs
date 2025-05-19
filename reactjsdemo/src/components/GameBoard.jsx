const initialTable = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
    console.log("🚀 ~ GameBoard ~ initialTable:", initialTable);
  return (

    <ol id="game-board">
      {initialTable.map((row, rowIndex) => (
        <li key={rowIndex} className="board-row">
          {row.map((playerSymbol, colIndex) => (
            <button key={colIndex} className="board-cell">
              {playerSymbol}
            </button>
          ))}
        </li>
      ))}
    </ol>
  );
}
