import {useEffect, useRef, useState} from "react";
import StarRating from "./StarRating";
import {useMovies} from "./useMovies";
import {useLocalStorageState} from "./useLocalStorageState";


const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const key = "74d20a39"

export default function App() {
  // const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const {movies, isLoading, error} = useMovies(query);

  const [watched, setWatched] = useLocalStorageState("watched", []);

  function handleSelectMovie(movieId) {
    setSelectedId(id => id === movieId ? null : movieId)
  }

  function handleCloseMovie() {
    console.log("closing movie")
    setSelectedId(null)
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatchedMovie(movieId) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== movieId));
  }

  // useEffect(function () {
  //   const controller = new AbortController()
  //
  //   async function fetchMovies() {
  //     setIsLoading(true);
  //     setError(null)
  //     try {
  //       const res = await fetch(
  //         `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
  //         {signal: controller.signal}
  //       );
  //
  //       if (!res.ok) {
  //         setError("Something went wrong with fetching movies");
  //         return;
  //       }
  //
  //       const data = await res.json()
  //
  //       if (data.Response === "False") {
  //         setError(data.Error);
  //         return;
  //       }
  //
  //       setMovies(data.Search);
  //       setError(null)
  //     } catch (err) {
  //       if (err.name !== "AbortError") {
  //         setError(err.message)
  //         console.log(err.message)
  //       }
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //
  //   if (query.length < 4) {
  //     setMovies([]);
  //     setError(null);
  //     return;
  //   }
  //
  //   handleCloseMovie();
  //   fetchMovies();
  //
  //   return () => { controller.abort("cancelling call") }
  // }, [query])

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </NavBar>
      <Main>
        <MovieBox>
          {isLoading && <Loader/>}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
          {error && <ErrorMessage message={error}/>}
        </MovieBox>
        <MovieBox>
          {selectedId
            ? <MovieDetails
              movieId={selectedId}
              watchedMovies={watched}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatchedMovie}
            />
            : <>
              <WatchedSummary watched={watched}/>
              <WatchedMovieList watched={watched} onDelete={handleDeleteWatchedMovie}/>
            </>
          }
        </MovieBox>
        {/*<MovieBox element={<MovieList movies={movies} />} />*/}
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>
}

function ErrorMessage({message}) {
  return <p className="error">
    <span>⛔️{message}</span>
  </p>
}

function Search({query, setQuery}) {
  const inputEl = useRef(null);

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }

    document.addEventListener("keydown", callback)

    inputEl.current.focus();

    return () => document.removeEventListener("keydown", callback)
  }, [setQuery]);

  // useEffect(() => {
  //   const input = document.querySelector(".search");
  //   input.focus();
  // }, []);

  return <input
    className="search"
    type="text"
    id="search"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    ref={inputEl}
  />
}

function Logo() {
  return <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>
}

function NumResults({movies}) {
  return <p className="num-results">
    Found <strong>{movies.length}</strong> results
  </p>
}

function NavBar({children}) {
  return (
    <nav className="nav-bar">
      <Logo/>
      {children}
    </nav>
  )
}

function Main({children}) {
  return (
    <main className="main">
      {children}
    </main>
  )
}

function MovieList({movies, onSelectMovie}) {
  return <ul className="list list-movies">
    {movies?.map((movie) => (
      <MovieItem
        movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}
      />
    ))}
  </ul>
}

function MovieItem({movie, onSelectMovie}) {
  return <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
    <img src={movie.Poster} alt={`${movie.Title} poster`}/>
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{movie.Year}</span>
      </p>
    </div>
  </li>
}

function MovieBox({children}) {
  const [isOpen, setIsOpen] = useState(true);

  return <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen((open) => !open)}
    >
      {isOpen ? "–" : "+"}
    </button>
    {isOpen && children}
  </div>
}

function WatchedSummary({watched}) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating.toFixed(2)}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating.toFixed(2)}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </div>
  </div>
}

function WatchedMovieList({watched, onDelete}) {
  return <ul className="list">
    {watched.map((movie) => (
      <WatchedMovieItem movie={movie} key={movie.imdbID} onDelete={onDelete}/>
    ))}
  </ul>
}

function WatchedMovieItem({movie, onDelete}) {
  return <li key={movie.imdbID}>
    <img src={movie.poster} alt={`${movie.title} poster`}/>
    <h3>{movie.title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
      <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>X</button>
    </div>
  </li>
}

function MovieDetails({movieId, watchedMovies, onCloseMovie, onAddWatched}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  const watched = watchedMovies.find((movie) => movie.imdbID === movieId);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre
  } = movie;

  function handleAddWatched() {
    const newMovie = {
      imdbID: movieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
      countRatingDecision: countRef.current
    }
    onAddWatched(newMovie)
    onCloseMovie()
  }

  useEffect(
    function () {
      async function fetchMovie() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${movieId}`
        );
        setIsLoading(false);

        const data = await res.json();
        setMovie(data)
      }

      fetchMovie();
    },
    [movieId]
  )

  useEffect(function () {
    const callback = function (e) {
      if (e.key === "Escape") {
        onCloseMovie()
        console.log("Escape key pressed")
      }
    }
    document.addEventListener("keydown", callback)
    return () => document.removeEventListener("keydown", callback)
  }, [onCloseMovie])

  useEffect(function () {
    if (!title) return;
    document.title = `Movie | ${title}`

    return () => {
      document.title = "usePopcorn"
    }
  }, [title])


  return (
    <div className="details">
      {isLoading
        ? <Loader/>
        : <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
            <img src={poster} alt={`${title} poster`}/>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p><span>⭐️</span>{imdbRating} IMDb rating</p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!watched
                ? <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
                : <p>You've rated this movie {watched.userRating}<span>⭐️</span></p>
              }
              {userRating > 0 &&
                <button className="btn-add" onClick={handleAddWatched}>
                  + Add to list
                </button>
              }
            </div>
            <p><em>{plot}</em></p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      }
    </div>
  )
}