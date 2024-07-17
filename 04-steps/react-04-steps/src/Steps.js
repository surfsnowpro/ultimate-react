export default function Steps({step, messages, onHandleNext, onHandlePrevious}) {
  return (
    <div className="steps">
      <div className="numbers">
        <div className={`${step >= 1 ? "active" : ""}`}>1</div>
        <div className={`${step >= 2 ? "active" : ""}`}>2</div>
        <div className={`${step >= 3 ? "active" : ""}`}>3</div>
      </div>

      <p className="message"><StepMessage step={step}>{messages[step - 1]}</StepMessage></p>

      <div className="buttons">
        <Button
          textColor="#fff"
          backgroundColor="#7950f2"
          onClick={onHandlePrevious}
        ><span>👈</span> Previous
        </Button>
        <Button
          textColor="#fff"
          backgroundColor="#7950f2"
          onClick={onHandleNext}
        >Next <span>👉</span>
        </Button>
      </div>
    </div>
  )
}

function StepMessage({ step, children }) {
  return <div>
    <h3>Step {step}</h3>
    {children}
  </div>
}

function Button({ backgroundColor, textColor, onClick, children}) {
  return <button
    style={{backgroundColor: backgroundColor, color: textColor}}
    onClick={onClick}
  >
    {children}
  </button>
}