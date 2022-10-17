import { useEffect, useState } from "react";

function Watchlist (){
    const [watchlistMovies, setWatchlistMovies] = useState([])


    useEffect(() => {
        fetch("/watchlist_movies")
        .then((response) => response.json())
        .then(data => setWatchlistMovies(data))
    }, [])

    return(
        <div>
            { watchlistMovies.map( watchlistMovie =>{
                return <div>{ watchlistMovie.movie.name }</div>
            })}
        </div>
    )
}

export default Watchlist;