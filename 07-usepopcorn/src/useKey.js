import {useEffect} from "react";

export function useKey(key, action) {
  useEffect(function () {
    const callback = function (e) {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        action()
        console.log("Escape key pressed")
      }
    }

    document.addEventListener("keydown", callback)

    return () => document.removeEventListener("keydown", callback)
  }, [key, action])
}