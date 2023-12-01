import React from "react";
import "./Movie.css";
import { useEffect, useState } from "react";
import Star from "../StarRating/Star";
interface Movie {
  imdbID: string | null;
  title: string;
  year: string | null;
  poster: string | null;
  imdbRating: number;
  rating: number;
  runtime: number;
}

interface MovieData {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: number;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
}

interface ProppedFrom {
  onClose: () => void;
  selectId: null | string;
  KEY: string;
  Loader: boolean;
  // watched: Nmovies[];
  onhandleAdd: (movie: Movie) => void;
  rating: number;
  setRating: (rating: number) => void;
}
const Movie: React.FC<ProppedFrom> = ({
  onClose,
  selectId,
  KEY,
  Loader,
  onhandleAdd,
  rating,
  setRating,
}) => {
  const [movie, setMovie] = useState<MovieData>({} as MovieData);

  const handleAddClick = () => {
    const newMovies: Movie = {
      imdbID: selectId,
      title,
      year,
      poster,
      rating,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0])
    };
    onhandleAdd(newMovies);
    onClose();
    setRating(0);
  };
  // console.log(movieRating)
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
    Genre: genre,
  } = movie;

  let imdb = "";

  if (imdbRating < 8 && imdbRating > 5) {
    imdb = "Considered as a decent movie🥰.";
  } else if (imdbRating == 8 || imdbRating > 8 && imdbRating < 9) {
    imdb = "One of the best movie you will see😍.";
  } else if (imdbRating < 5 && imdbRating > 2) {
    imdb = "Below average movie😟 .";
  } else if (imdbRating == 9) {
    imdb = "One of the greatest movie ever made😮😍";
  } else if (imdbRating <= 2) {
    imdb = "One of the worse movie😠.";
  }else if(imdbRating > 9) {
    imdb = "Simply the Greatest ever!!😮"
  }
  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectId}&type=movie`
      );
      const data = await res.json();
      setMovie(data);
      // console.log(data);
    }
    fetchMovie();
  }, [selectId, KEY]);
  return (
    <div>
      {Loader ? (
       <p style={{ fontSize: "2rem" }}>Data is Loading....</p>
      ) : (
        <div>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <div className="toFlex">
              <img
                src={poster}
                alt={`Poster of ${movie} movie`}
                className="img1"
              />
              <div className="details-overview">
                <h2 className="h2">{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <strong>Year-</strong>
                  {year}
                </p>
                <p className="rate">
                  <span>⭐️</span>
                  {imdbRating} IMDb rating {imdb}
                </p>
              </div>
            </div>
          </header>
          <section>
            <div className="rating">
           {
            rating > 0 && (
              <button className="btn-add" onClick={handleAddClick}>
              + Add movie
            </button>
            )
           }

              <div className="starSlide">
                <Star toRating={5} rating={rating} setRating={setRating} />
              </div>
            </div>
            <p>
              <em>
                <strong>Plot-</strong>
                {plot}
              </em>
            </p>
            <br />
            <p>
              <strong>Starring-</strong> {actors}
            </p>
            <br />
            <p>
              <strong>Directed by-</strong> {director}
            </p>
            <br />
          </section>
        </div>
      )}
    </div>
  );
};

export default Movie;
