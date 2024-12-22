
export default function Options({ question, answer, dispatch }) {
  const hasAnswer = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => {
        let classExt = "";
        if (hasAnswer) {
          classExt = index === question.correctOption ? "correct" : "wrong";
        }
        return <button
            key={index}
            className={`btn btn-option 
              ${index === answer ? "answer": ""} 
              ${classExt}
            `}
            onClick={() => dispatch({
              type: "newAnswer",
              payload: question.options.indexOf(option)
            })}
            disabled={hasAnswer}
          >
            {option}
          </button>
      })}
    </div>
  );
}