
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UsersContext } from "../Contexts/UsersContext";

function Watchlist (){
    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const { user } = useContext(UsersContext);
    const [showButton, setShowButton] = useState([]);

    useEffect(() => {
        fetch("/watchlist_movies")
        .then((response) => response.json())
        .then(data => setWatchlistMovies(data));
    },[])

    function watchlistRemove(id){
        fetch("/watchlist_movies/"+id, {
            method: "DELETE"
        }).then(setWatchlistMovies(watchlistMovies.filter(movie => movie.id !== id)));
    }

    return(
        <div className="h-screen overflow-auto no-scrollbar bg-yellow-400 font-oswald">
             <h1 className=" text-center text-5xl uppercase underline pt-5 pb-2">{user.username}'s Watchlist</h1>
            <div className="grid sm:grid-cols-3 lg:grid-cols-6 justify-items-center pt-5">
                {watchlistMovies.map((watchlistMovie, index) => (
                <div className=" h-96" key={index}>
                    <Link to={`/movie-details/${watchlistMovie.movie.id}`}>
                        <img 
                            onMouseEnter={() => setShowButton(watchlistMovie)} 
                            className="h-5/6 border-4 border-black rounded-lg w-11/12" 
                            src={watchlistMovie.movie.image} 
                            alt="" 
                        />
                    </Link>
                    <div className="-mt-6 ">
                        {showButton === watchlistMovie ?
                            <button 
                                className="bg-gradient-to-b from-gray-700 to-gray-900 hover:text-red-400 text-white uppercase w-11/12 px-1 rounded-b-lg" 
                                onClick={() => watchlistRemove(watchlistMovie.id) }>
                                Remove
                            </button> : <></>
                        }
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Watchlist;