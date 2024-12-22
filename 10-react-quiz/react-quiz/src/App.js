import Header from "./components/Header";
import Main from "./components/Main";
import {useEffect, useReducer} from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import ProgressBar from "./components/ProgressBar";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECONDS_PER_QUESTION = 30

const initialState = {
  questions: [],

  // "loading", "error", "ready", "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      }
    case "dataFailed":
      return { ...state, status: "error" }
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION
      }
    case "newAnswer":
      const question = state.questions[state.index]

      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
          ? state.points + question.points
          : state.points
      }
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1 }
    case "finished":
      return {
        ...state,
        highScore: state.points > state.highScore ? state.points : state.highScore,
        status: "finished"
      }
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highScore: state.highScore
      }
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        highScore: state.points > state.highScore
          ? state.points
          : state.highScore,
        status: state.secondsRemaining === 0
          ? "finished"
          : state.status
      }
    default:
      throw new Error("Unknown Action")
  }
}

export default function App() {
  const [{
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondsRemaining,
  }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length;
  const possiblePoints = questions.reduce((acc, question) => acc + question.points, 0)

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }))
  }, [])
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" &&
          <>
            <ProgressBar
              index={index}
              numQuestions={numQuestions}
              points={points}
              possiblePoints={possiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch}/>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        }
        {status === "finished" &&
          <FinishedScreen
            points={points}
            maxPossible={possiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />}
      </Main>
    </div>
  );
}

