import { useContext } from "react";
import {MoviesContext} from "../Contexts/MoviesContext";

function Home({ user }) {

    const { movies } = useContext(MoviesContext)

    function watchlistSubmit(id){
      fetch("/watchlist_movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          movie_id: id
        }),
      })
    }

    return (
      <div>
        {movies.map(movie => (
          <div>{movie.name}
          <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
          </div>
        ))}
      </div>
    );
  }
  
  export default Home;