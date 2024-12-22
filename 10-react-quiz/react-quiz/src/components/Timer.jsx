import {useEffect} from "react";

export default function Timer({ secondsRemaining, dispatch }) {

  const min = Math.floor(secondsRemaining / 60)
  const sec = secondsRemaining % 60

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [dispatch])
  return <div className="timer">
    {min < 10 && "0"}
    {min}
    :
    {sec < 10 && "0"}
    {sec}
  </div>
}