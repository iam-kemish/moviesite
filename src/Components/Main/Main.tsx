import React from "react";
import "./Main.css";
import { useState } from "react";

import Movie from "../MovieDetaails/Movie";
import Watch from "../Watch/Watch";

interface film {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  // imdbRating: number;
 
}

const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const total = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);

const Main: React.FC<{
  movies: film[];
  Loader: boolean;
  selectId: null;
  onSelect: (selectId: null | string) => void;
  onClose: () => void;
  movieRating: number;
  setmovieRating: (moiveRating: number) => void;
  setQuery: (query: string) => void;
  KEY: string;
}> = ({ movies, Loader, onSelect, selectId, onClose, KEY,setQuery }) => {
  const [watched, setWatched] = useState<Movie[]>([]);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [rating, setRating] = useState(0);

  const avgImdbRating = average(
    watched.map((movie) => Math.floor(movie.imdbRating))
  );
  const avgUserRating = average(
    watched.map((movie) => Math.floor(movie.rating))
  );
  const avgRuntime = total(watched.map((movie) => Math.floor(movie.runtime)));

  function addWatched(movie: Movie) {
    setWatched((watched) => [...watched, movie]);
    setQuery("")
  }

  // function deleteWatched(id: number) {
  //   setWatched((prevWatched) => {
  //     return prevWatched.filter((movie) => movie.imdbRating !== id);
  //   });
  // }
  function deleteWatched(id: number) {
    setWatched((watched) => watched.filter((movie) => movie.imdbRating !== id))
  }
  
  
  return (
    <div className="main">
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen1((open) => !open)}
        >
          {isOpen1 ? "–" : "+"}
        </button>
        {isOpen1 &&
          (Loader ? (
            <p style={{ fontSize: "2rem" }}>Data is Loading....</p>
          ) : (
            <ul className="list list-movies">
              {movies?.map((movie) =>
                !movies ? (
                  <h3>Sorry no movies found</h3>
                ) : (
                  <li key={movie.imdbID} onClick={() => onSelect(movie.imdbID)}>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <h3>{movie.Title}</h3>
                    <div>
                      <p>
                        <span>🗓</span>
                        <span>{movie.Year}</span>
                      </p>
                    </div>
                  </li>
                )
              )}
            </ul>
          ))}
      </div>

      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen2((open) => !open)}
        >
          {isOpen2 ? "–" : "+"}
        </button>
        {isOpen2 && (
          <>
            {selectId ? (
              <Movie
                selectId={selectId}
                onClose={onClose}
                KEY={KEY}
                Loader={Loader}
                onhandleAdd={addWatched}
                rating={rating}
                setRating={setRating}
              />
            ) : (
              <>
                <Watch
                  watched={watched}
                  avgImdbRating={avgImdbRating}
                  avgUserRating={avgUserRating}
                  avgRuntime={avgRuntime}
                  ondeleteWatch={deleteWatched}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
