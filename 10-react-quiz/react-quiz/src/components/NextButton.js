export default function NextButton({ dispatch, answer, numQuestions, index }) {

  const isLastQuestion = index === numQuestions - 1;

  if (answer === null) return null;
  if (isLastQuestion) return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "finished" })}
    >
      Finish
    </button>
  )
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}