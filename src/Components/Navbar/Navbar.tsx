import React, { useEffect, useRef } from 'react'
import './Navbar.css'
// import { useState } from 'react';
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}
interface NavbarMovies {
  movies: Movie[]
  query: string;
  setQuery: (query: string) => void;
}
const Navbar:React.FC<NavbarMovies> = ({movies,query,setQuery}) => {
 const inputEl = useRef<HTMLInputElement>(null);
useEffect(() =>{
  if(inputEl.current) {
    inputEl.current.focus()
  }
  
},[])
  return (
    <div>
            <nav className="nav-bar">
        <div className="logo">
          <h1>kemishMovies.</h1>
          <span role="img">🍿</span>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          ref={inputEl}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="num-results">
          {
            !movies? "Sorry, no movies found with this name." : <span>Found {movies.length} movies.</span>
          }
        </p>
      </nav>
    </div>
  )
}

export default Navbar
