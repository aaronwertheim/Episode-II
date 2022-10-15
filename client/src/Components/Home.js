import { useContext } from "react";
import {MoviesContext} from "../Contexts/MoviesContext";

function Home() {

    const { movies } = useContext(MoviesContext)

    return (
      <div>
        {movies.map(movie => (
          <div>{movie.name}</div>
        ))}
      </div>
    );
  }
  
  export default Home;