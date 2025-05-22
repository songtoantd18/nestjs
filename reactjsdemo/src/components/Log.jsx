export default function Log({ turns }) {
  const reversedTurns = [...turns].reverse();
  console.log("🚀 ~ Log ~ reversedTurns:", reversedTurns);
  return (
    <ol>
      {reversedTurns.map((turn, index) => {
        const turnNumber = turns.length - index; // Số lớn -> bé
        return (
          <li key={`${turn.square.row}${turn.square.col}-${index}`} className="log-item">
            #{turnNumber}: {turn.player} selected {turn.square.row},{turn.square.col}
          </li>
        );
      })}
    </ol>
  );
}
