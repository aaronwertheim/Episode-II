import { useContext } from "react";
import { Link } from "react-router-dom";
import {MoviesContext} from "../Contexts/MoviesContext";

function Home({ watchlistSubmit }) {

    const { movies } = useContext(MoviesContext)
    
    function shuffleArray(array) {
      let curId = array.length;
      while (0 !== curId) {
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
      }
      return array;
    }

    const moviesShuffled = shuffleArray(movies);

    return (
      <div>
        <h1 className="text-3xl">Action</h1>
        {moviesShuffled.map((movie, index) => (
          movie.genre.includes("Action") || movie.genre.includes("Adventure") ?
          <div key={index}>{movie.name.replace("&apos;","'")}
            <Link to={`/movie-details/${movie.id}`}>Details</Link>
            <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
            <Link to={`/review-form/${movie.id}`}>Write Review</Link>
          </div> : <></>
        )).slice(0, 40)}
        <h1 className="text-3xl">Drama</h1>
        {moviesShuffled.map((movie, index) => (
          movie.genre.includes("Drama") ?
          <div key={index}>{movie.name.replace("&apos;","'")}
            <Link to={`/movie-details/${movie.id}`}>Details</Link>
            <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
            <Link to={`/review-form/${movie.id}`}>Write Review</Link>
          </div> : <></>
        )).slice(0, 20)}
        <h1 className="text-3xl">Comedy</h1>
        {moviesShuffled.map((movie, index) => (
          movie.genre.includes("Comedy") ?
          <div key={index}>{movie.name.replace("&apos;","'")}
            <Link to={`/movie-details/${movie.id}`}>Details</Link>
            <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
            <Link to={`/review-form/${movie.id}`}>Write Review</Link>
          </div> : <></>
        )).slice(0, 75)}
        <h1 className="text-3xl">Romance</h1>
        {moviesShuffled.map((movie, index) => (
          movie.genre.includes("Romance") ?
          <div key={index}>{movie.name.replace("&apos;","'")}
            <Link to={`/movie-details/${movie.id}`}>Details</Link>
            <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
            <Link to={`/review-form/${movie.id}`}>Write Review</Link>
          </div> : <></>
        )).slice(0, 150)}
        <h1 className="text-3xl">Western</h1>
        {moviesShuffled.map((movie, index) => (
          movie.genre.includes("Western") ?
          <div key={index}>{movie.name.replace("&apos;","'")}
            <Link to={`/movie-details/${movie.id}`}>Details</Link>
            <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
            <Link to={`/review-form/${movie.id}`}>Write Review</Link>
          </div> : <></>
        ))}
        <h1 className="text-3xl">Animated</h1>
        {moviesShuffled.map((movie, index) => (
          movie.genre.includes("Animation") ?
          <div key={index}>{movie.name.replace("&apos;","'")}
            <Link to={`/movie-details/${movie.id}`}>Details</Link>
            <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
            <Link to={`/review-form/${movie.id}`}>Write Review</Link>
          </div> : <></>
        )).slice(0, 125)}
        <h1 className="text-3xl">Horror</h1>
        {moviesShuffled.map((movie, index) => (
          movie.genre.includes("Horror") ?
          <div key={index}>{movie.name.replace("&apos;","'")}
            <Link to={`/movie-details/${movie.id}`}>Details</Link>
            <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
            <Link to={`/review-form/${movie.id}`}>Write Review</Link>
          </div> : <></>
        ))}
      </div>
    );
  }
  
  export default Home;