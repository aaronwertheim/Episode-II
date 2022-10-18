import { useContext } from "react";
import { Link } from "react-router-dom";
import {MoviesContext} from "../Contexts/MoviesContext";

function Home({ user, watchlistSubmit }) {

    const { movies } = useContext(MoviesContext)

    return (
      <div>
        <h1 className="text-3xl">Action</h1>
        {movies.map(movie => (
          movie.genre.includes("Action") || movie.genre.includes("Adventure") ?
          <div>{movie.name}
            <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
            <Link to={`/movie-details/${movie.id}`}>Details</Link>
          </div> : <></>
        ))}
        <h1 className="text-3xl">Drama</h1>
        {movies.map(movie => (
          movie.genre.includes("Drama") ?
          <div>{movie.name}
            <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
            <Link to={`/movie-details/${movie.id}`}>Details</Link>
          </div> : <></>
        ))}
        <h1 className="text-3xl">Comedy</h1>
        {movies.map(movie => (
          movie.genre.includes("Comedy") ?
          <div>{movie.name}
            <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
            <Link to={`/movie-details/${movie.id}`}>Details</Link>
          </div> : <></>
        ))}
      </div>
    );
  }
  
  export default Home;