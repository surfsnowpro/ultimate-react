import {useState} from "react";
import Steps from "./Steps"

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

  function onHandlePrevious() {
    if (step > 1) setStep(step - 1)
  }

  function onHandleNext() {
    if (step < messages.length) setStep(step + 1)
    // setTest({ name: "John" })
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>
      {isOpen ? <Steps step={step} messages={messages} onHandleNext={onHandleNext} onHandlePrevious={onHandlePrevious}/>: null}
    </>
  );

}

export default App;
