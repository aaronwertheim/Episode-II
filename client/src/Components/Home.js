import { useContext } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../Contexts/MoviesContext";

function Home({ watchlistSubmit }) {

    const { movies } = useContext(MoviesContext);
    const genreArray = ["Action", "Comedy", "Thriller", "Romance", "Animation", "Western", "Family", "Horror", "Crime", "Mystery", "War", "Fantasy", "Sci-Fi", "Biography"]
    
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
      <div className="h-screen overflow-y-auto no-scrollbar">
        {genreArray.map(g => (
          <div>
            <h1 className="text-3xl">{g}</h1>
              <div className="grid grid-flow-col overflow-auto">
              {moviesShuffled.map((movie, index) => (
              movie.genre.includes(g) ?
              <div className="w-44 h-100" key={index}>
                <Link to={`/movie-details/${movie.id}`}>
                  <img className="w-11/12" src={movie.image} alt="" />
                </Link>
                <div>
                  <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
                </div>
                <div>
                  <Link to={`/review-form/${movie.id}`}>Write Review</Link>
                </div>
              </div> : <></>
            ))}
          </div>
        </div>
        ))}
      </div>
    );
  }
  
  export default Home;