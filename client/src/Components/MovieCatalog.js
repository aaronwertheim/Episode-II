import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import {MoviesContext} from "../Contexts/MoviesContext";

function MovieCatalog({watchlistSubmit}) {

    const { movies } = useContext(MoviesContext)
    const [searchParams, setSearchParams] = useState()

    if(!searchParams) {
        return (
            <div>
                <input onChange={(e) => setSearchParams(e.target.value)}></input>
                {movies.map((movie,index) => (
                    <div key={index}>{movie.name}
                    <button onClick={() => watchlistSubmit(movie.id)} >Add to Watchlist</button>
                    <Link to={`/movie-details/${movie.id}`}>Details</Link>
                    </div> 
                ))} 
            </div>
        )
    }
    
    return (
        <div>
            <input onChange={(e) => setSearchParams(e.target.value)}></input>
            {movies.map((movie,index) => (
                movie.name.toLowerCase().includes(searchParams.toLowerCase()) ||
                movie.director.toLowerCase().includes(searchParams.toLowerCase()) ||
                movie.actors.includes(searchParams) ?
                <div key={index}>{movie.name}
                <button onClick={() => watchlistSubmit(movie.id)} >Add to Watchlist</button>
                <Link to={`/movie-details/${movie.id}`}>Details</Link>
                </div> : <></>
            ))} 
        </div>
    )
}

export default MovieCatalog