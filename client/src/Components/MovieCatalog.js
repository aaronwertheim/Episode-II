import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import {MoviesContext} from "../Contexts/MoviesContext";

function MovieCatalog({watchlistSubmit, user}) {

    const { movies } = useContext(MoviesContext)
    const [searchParams, setSearchParams] = useState()

    const moviesAlphabetical = movies.sort((a, b) => a.id - b.id).reverse();

    if(!searchParams) {
        return (
            <div>
                <input onChange={(e) => setSearchParams(e.target.value)}></input>
                {moviesAlphabetical.map((movie,index) => (
                    <div key={index}>{movie.name}
                        <button onClick={() => watchlistSubmit(movie.id)} >Add to Watchlist</button>
                        <Link to={`/movie-details/${movie.id}`}>Details</Link>
                        {user ? <Link to={`/review-form/${movie.id}`}>Write Review</Link> : <button onClick={() => alert("Please log in to review")}>Write Review</button>}
                    </div> 
                ))} 
            </div>
        )
    }
    
    return (
        <div>
            <input onChange={(e) => setSearchParams(e.target.value)}></input>
            {moviesAlphabetical.map((movie,index) => (
                movie.name.toLowerCase().includes(searchParams.toLowerCase()) ||
                movie.director.toLowerCase().includes(searchParams.toLowerCase()) ||
                movie.actors.toString().toLowerCase().includes(searchParams.toLowerCase()) ?
                <div key={index}>{movie.name.replace("&apos;","'")}
                <button onClick={() => watchlistSubmit(movie.id)} >Add to Watchlist</button>
                <Link to={`/movie-details/${movie.id}`}>Details</Link>
                {user ? <Link to={`/review-form/${movie.id}`}>Write Review</Link> : <button onClick={() => alert("Please log in to review")}>Write Review</button>}
                </div> : <></>
            ))} 
        </div>
    )
}

export default MovieCatalog