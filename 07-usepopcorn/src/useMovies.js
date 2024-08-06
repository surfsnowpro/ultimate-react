import {useEffect, useState} from "react";

const key = "74d20a39"

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {

    const controller = new AbortController()

    async function fetchMovies() {
      setIsLoading(true);
      setError(null)
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
          {signal: controller.signal}
        );

        if (!res.ok) {
          setError("Something went wrong with fetching movies");
          return;
        }

        const data = await res.json()

        if (data.Response === "False") {
          setError(data.Error);
          return;
        }

        setMovies(data.Search);
        setError(null)
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message)
          console.log(err, err.name)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (query.length < 4) {
      setMovies([]);
      setError(null);
      return;
    }

    // callback?.();
    fetchMovies();

    return () => { controller.abort("cancelling call") }
  }, [query]);

  return {movies, isLoading, error}
}