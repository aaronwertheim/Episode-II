import userEvent from "@testing-library/user-event";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UsersContext } from "../Contexts/UsersContext";

function Watchlist (){
    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const { user } = useContext(UsersContext)

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
        <div className="h-screen overflow-auto no-scrollbar bg-yellow-400">
             <h1 className="font-oswald text-center text-5xl uppercase underline pt-5 pb-2">{user.username}'s Watchlist</h1>
        <div className="grid grid-cols-2 lg:grid-cols-6 justify-items-center pt-5">
           
            {watchlistMovies.map((watchlistMovie, index) => (
               <div className="w-5/6" key={index}>
                    <Link to={`/movie-details/${watchlistMovie.movie.id}`}>
                        <img className="h-5/6 border-2 border-black rounded-t-sm w-11/12" src={watchlistMovie.movie.image} alt="" />
                    </Link>
                    <button className="bg-gradient-to-b from-gray-700 to-gray-900 hover:opacity-50 text-white uppercase w-11/12 px-1 rounded-b-md" onClick={() => watchlistRemove(watchlistMovie.id) }>Remove</button>
                </div>
            ))}
        </div>
        </div>
    )
}

export default Watchlist;