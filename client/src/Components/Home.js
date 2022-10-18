import { useContext } from "react";
import {MoviesContext} from "../Contexts/MoviesContext";

function Home({ user, watchlistSubmit }) {

    const { movies } = useContext(MoviesContext)



    return (
      <div>
        <h1 className="text-3xl">Action</h1>
        {movies.map(movie => (
          movie.genre.includes("Action") ?
          <div>{movie.name}
            <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
          </div> : <></>
        ))}
        <h1 className="text-3xl">Drama</h1>
        {movies.map(movie => (
          movie.genre.includes("Drama") ?
          <div>{movie.name}
            <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
          </div> : <></>
        ))}
        <h1 className="text-3xl">Comedy</h1>
        {movies.map(movie => (
          movie.genre.includes("Comedy") ?
          <div>{movie.name}
            <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
          </div> : <></>
        ))}
      </div>
    );
  }
  
  export default Home;