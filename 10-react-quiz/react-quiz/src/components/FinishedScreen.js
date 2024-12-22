export default function FinishedScreen({ points, maxPossible, highScore, dispatch}) {
  const percentage = Math.round((points / maxPossible) * 100);

  let emoji;

  if (percentage === 100) {
    emoji = "🥇";
  } else if (percentage >= 80) {
    emoji = "🥈";
  } else if (percentage >= 50) {
    emoji = "🥉";
  } else {
    emoji = "🤦";
  }

  return (
    <div>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPossible} ({percentage}%)
      </p>
      <p className="highscore">
        (High score: {highScore} points)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </div>
  );
}