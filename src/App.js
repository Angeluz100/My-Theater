import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList'
import Heading from './components/Heading'
import SearchBox from './components/SearchBox'
import AddFavorites from './components/AddFavorites'

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=23752a75`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search){
      setMovies(responseJson.Search)
    }
  };

  useEffect (() => {
    getMovieRequest(searchValue);
  }, [searchValue])

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);

  }


  return (
    <div className='container-fluid movie-app'>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Heading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
      <MovieList 
      movies={movies} 
      handleFavoritesClick={addFavoriteMovie} 
      favoriteComponent={AddFavorites}/>
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Heading heading='Favorites'/>
      </div>
      <div className='row'>
      <MovieList 
      movies={favorites} 
      handleFavoritesClick={addFavoriteMovie} 
      favoriteComponent={AddFavorites}/>
      </div>
    </div>
  );
}

export default App;
