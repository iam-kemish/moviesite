
import React from 'react'
interface Movie {
  imdbID: string | null;
  title: string;
  poster: string | null;
  imdbRating: number;
  rating: number;
  runtime: number;
}
interface WatchedMovie {
  movie: Movie;
  ondeleteWatch: (id: number) => void;
}


const WatchMovieList:React.FC<WatchedMovie> = ({movie, ondeleteWatch}) => {
  return (
    <div>
       <li >
      <img src={movie.poster? movie.poster : "unIdentified Poster"} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div className='grid'>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.rating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <p
          className="btn-delete"
          onClick={() => ondeleteWatch(movie.imdbRating)}
        >
         <span>X</span>
        </p>
      </div>
    </li>
    </div>
  )
}

export default WatchMovieList


