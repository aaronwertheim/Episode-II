import { useEffect, useState } from "react";

function Watchlist (){
    const [watchlistMovies, setWatchlistMovies] = useState([])


    useEffect(() => {
        fetch("/watchlist_movies")
        .then((response) => response.json())
        .then(data => setWatchlistMovies(data))
    }, [])

    function watchlistRemove(id){
        fetch("/watchlist_movies/"+id, {
            method: "DELETE"
        }).then(setWatchlistMovies(watchlistMovies.filter(movie => movie.id !== id)))
    }

    return(
        <div>
            { watchlistMovies.map( (watchlistMovie, index) =>{
                return <div key={index}>
                    <div>
                        {watchlistMovie.movie.name + " "}
                        <button onClick={() => watchlistRemove(watchlistMovie.id) }>Remove</button>
                    </div>
                </div>
            })}
        </div>
    )
}

export default Watchlist;