import React from 'react'
// import WatchMovieList from './Wa?tchMovieList';
import './Watch.css'
import WatchMovieList from './WatchMovieList';
interface Movie {
  imdbID: string | null;
  title: string;
  poster: string | null;
  imdbRating: number;
  rating: number;
  runtime: number;
}
// console.log(Watch)

interface passedFrom {
    watched : Movie[]
    avgImdbRating: number
    avgRuntime: number
    avgUserRating: number
    ondeleteWatch: (id : number) => void;
}
const Watch:React.FC<passedFrom> = ({watched, avgImdbRating,avgRuntime,avgUserRating,ondeleteWatch}) => {
  

  return (
    <div>
        <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{Math.floor(avgImdbRating)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Math.floor(avgRuntime)} min</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{Math.floor(avgUserRating)}</span>
        </p>
      </div>
    </div>
    <ul className="list">
      {
        watched.map((movie) =>{
        
          return (
            
            <WatchMovieList movie={movie} key={movie.imdbRating} ondeleteWatch={ondeleteWatch}/>
          )
        })
      }
    </ul>
    </div>
  )
}

export default Watch
