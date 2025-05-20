export default function Log({ turns }) {
  console.log("🚀 ~ Log ~ turns:", turns);
  return (
    <ol>
      {turns.map((turn, index) => {
        return (
          <li key={`${turn.square.row}${turn.square.col}-${index}`}>
            {turn.player} selected {turn.square.row},{turn.square.col}
          </li>
        );
      })}
    </ol>
  );
}
