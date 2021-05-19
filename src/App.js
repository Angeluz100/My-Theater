import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from './components/MovieList'
import Heading from './components/Heading'
import SearchBox from './components/SearchBox'

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async () => {
    const url = "http://www.omdbapi.com/?s=avengers&apikey=23752a75"

    const response = await fetch(url);
    const responseJson = await response.json();

    console.log(responseJson)
    setMovies(responseJson.Search)
  };

  useEffect (() => {
    getMovieRequest();
  }, [])


  return (
    <div className='container-fluid movie-app'>
      <div className="row">
        <Heading heading='Movies'/>
        <SearchBox />
      </div>
      <div className='row'>
      <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
