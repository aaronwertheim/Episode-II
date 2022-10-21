import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Watchlist (){
    const [watchlistMovies, setWatchlistMovies] = useState([]);

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
        <div className="grid grid-cols-3 lg:grid-cols-6">
            {watchlistMovies.map((watchlistMovie, index) => (
               <div className="w-5/6" key={index}>
                    <Link to={`/movie-details/${watchlistMovie.movie.id}`}>
                        <img className="" src={watchlistMovie.movie.image} alt="" />
                    </Link>
                    <button onClick={() => watchlistRemove(watchlistMovie.id) }>Remove</button>
                </div>
            ))}
        </div>
    )
}

export default Watchlist;