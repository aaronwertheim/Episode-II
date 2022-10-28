import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../Contexts/MoviesContext";

function Home({ watchlistSubmit }) {

    const { movies } = useContext(MoviesContext);
    const genreArray = ["Action", "Comedy", "Thriller", "Romance", "Animation", "Western", "Family", "Horror", "Crime", "Mystery", "War", "Fantasy", "Sci-Fi", "Biography"]
    const [showButtons, setShowButtons] = useState([]);
    

    return (
      <div className="bg-yellow-400 h-screen overflow-y-auto no-scrollbar">
        {genreArray.map(g => (
          <div className="my-5">
            <h1 className="font-oswald font-extrabold uppercase ml-5 text-3xl">{g}</h1>
              <div className="grid grid-flow-col overflow-auto no-scrollbar">
              {movies.map((movie, index) => (
              movie.genre.includes(g) ?
              <div className="w-44 sm:w-48 h-72" key={index}>
                <Link to={`/movie-details/${movie.id}`}>
                  <img onMouseEnter={() => setShowButtons(movie)} className="h-5/6 border-2 border-black rounded-t-sm w-11/12" src={movie.image} alt="" />
                </Link>
                {showButtons === movie ?
                  <div className=" -mt-12">
                    <div>
                      <button className="bg-gradient-to-b from-gray-700 to-gray-900 hover:text-blue-500 text-white uppercase w-11/12 px-1" onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
                    </div>
                    <div>
                      <button className="bg-gradient-to-b from-gray-700 to-gray-900 hover:text-blue-500 text-white uppercase w-11/12 rounded-b-md px-1"><Link to={`/review-form/${movie.id}`}>Write Review</Link></button>
                    </div>
                  </div> 
                  : 
                  <></>
                }
              </div> 
              : 
              <></>
            ))}
          </div>
        </div>
        ))}
      </div>
    );
  }
  
  export default Home;