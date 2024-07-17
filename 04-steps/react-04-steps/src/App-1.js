import {useState} from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  // `useState` is an array of the "value" and the function to set the state.
  // Therefore, we are just using destructuring to access those values.
  // All React methods that start with "use" are hooks.
  const [step, setStep] = useState(1)
  const [isOpen, setIsOpen] = useState(true);

  // const [test, setTest] = useState({ name: "Jim" })

  function handlePrevious() {
    if (step > 1) setStep(step - 1)
  }

  function handleNext() {
    if (step < messages.length) setStep(step + 1)
    // setTest({ name: "John" })
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>
      {isOpen ? (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`${step >= 3 ? "active" : ""}`}>3</div>
          </div>

          <p className="message">Step {step}: {messages[step - 1]}</p>

          <div className="buttons">
            <button
              style={{backgroundColor: "#7950f2", color: "#fff"}}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{backgroundColor: "#7950f2", color: "#fff"}}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      ) : null
      }
    </>
  );

}

export default App;
