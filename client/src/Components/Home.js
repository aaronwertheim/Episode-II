import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../Contexts/MoviesContext";
import { UsersContext } from "../Contexts/UsersContext";


function Home({ watchlistSubmit }) {

    const [showButtons, setShowButtons] = useState([]);
    const { movies } = useContext(MoviesContext);
    const { user } = useContext(UsersContext);
    const genreArray = ["Action", "Comedy", "Thriller", "Romance", "Animation", "Western", "Family", "Horror", "Crime", "Mystery", "War", "Fantasy", "Sci-Fi", "Biography"]
    
    return (
      <div className="bg-yellow-400 h-screen overflow-y-auto no-scrollbar pt-5 font-oswald ">
        {genreArray.map(g => (
          <div className="">
            <h1 className="font-extrabold uppercase ml-5 text-3xl">{g}</h1>
              <div className="grid grid-flow-col overflow-auto no-scrollbar">
              {movies.map((movie, index) => (
                movie.genre.includes(g) ?
                <div className="w-44 sm:w-48 h-80" key={index}>
                  <Link to={`/movie-details/${movie.id}`}>
                    <img 
                      onMouseEnter={() => setShowButtons(movie)} 
                      className="h-5/6 border-4 border-black rounded-lg w-11/12" 
                      src={movie.image} 
                      alt="" 
                    />
                  </Link>
                  {showButtons === movie ?
                    <div className=" -mt-12">
                      <div>
                        <button 
                          className="bg-gradient-to-b from-gray-700 to-gray-900 hover:text-blue-500 text-white font-semibold uppercase w-11/12 rounded-t-sm px-1 " 
                          onClick={ () => watchlistSubmit(movie.id) }
                        >
                            {user?.watchlist_movies.map(m => m.movie_id).includes(movie.id) ? 
                              "On Watchlist" : "Add to Watchlist"
                            }
                        </button>
                      </div>
                      <div>
                        <button className="bg-gradient-to-b from-gray-700 to-gray-900 hover:text-blue-500 text-white font-semibold uppercase w-11/12 rounded-b-lg px-1">
                          <Link to={`/review-form/${movie.id}`}>Write Review</Link>
                        </button>
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