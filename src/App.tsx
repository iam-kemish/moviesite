import "./App.css";
import Main from "./Components/Main/Main";

import Navbar from "./Components/Navbar/Navbar";
// import React from 'react'
import { useState, useEffect } from "react";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  
}
const KEY = "213511ff";
function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const[query,setQuery] = useState("Godzilla")
  const [movieRating, setmovieRating] = useState(0);
  const[Loader,setLoader] = useState(false);
  const[selectId, setSelectId] = useState(null);

 const handleSelect = (id) =>{
  setSelectId((selectId) => id === selectId? null : id)
 }

 const handleClose = () =>{
  setSelectId(null)
 }
  useEffect(() => {
    async function fetchMovies() {
    
     try {
      setLoader(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}&type=movie`
      );
      if(!res.ok) throw new Error("Something went wrong while fetching the data");
      
      const data = await res.json();
      setMovies(data.Search);
   
      setLoader(false)
     } catch (error) {
      console.log(error)
     }
    if(query.length <=3) {
      setMovies([]);
    }
    }
    fetchMovies();
  }, [query]);

 
  return (
    <>
      <Navbar movies={movies} query={query}  setQuery={setQuery} />
      <Main movies={movies} Loader={Loader} onSelect={handleSelect} selectId={selectId} onClose={handleClose} movieRating={movieRating} setmovieRating={setmovieRating}  KEY={KEY} setQuery={setQuery}/>
    </>
  );
}

export default App;
