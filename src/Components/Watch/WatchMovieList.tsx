
import React from 'react'
interface Movie {
  imdbID: string;
  title: string;
  poster: string;
  imdbRating: number;
  rating: number;
  runtime: number;
  // userRating: number;
}


interface WatchedMovie {
  movie: Movie;
  ondeleteWatch: (id: number) => void;
}


const WatchMovieList:React.FC<WatchedMovie> = ({movie, ondeleteWatch}) => {
  return (
    <div>
       <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
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

        <button
          className="btn-delete"
          onClick={() => ondeleteWatch(movie.imdbRating)}
        >
          X
        </button>
      </div>
    </li>
    </div>
  )
}

export default WatchMovieList

