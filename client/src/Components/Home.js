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
      <div className="bg-yellow-400 h-screen overflow-y-auto no-scrollbar">
        {genreArray.map(g => (
          <div className="my-5">
            <h1 className="font-oswald font-extrabold uppercase ml-5 text-3xl">{g}</h1>
              <div className="grid grid-flow-col overflow-auto">
              {moviesShuffled.map((movie, index) => (
              movie.genre.includes(g) ?
              <div className="w-44 h-100" key={index}>
                <Link to={`/movie-details/${movie.id}`}>
                  <img className="h-5/6 border-2 border-black rounded-t-sm w-11/12" src={movie.image} alt="" />
                </Link>
                <div>
                  <button className="bg-gradient-to-b from-gray-700 to-gray-900 hover:opacity-50 text-white uppercase w-11/12 px-1" onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
                </div>
                <div>
                  <button className="bg-gradient-to-b from-gray-700 to-gray-900 hover:opacity-50 text-white uppercase w-11/12 rounded-b-md px-1"><Link to={`/review-form/${movie.id}`}>Write Review</Link></button>
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