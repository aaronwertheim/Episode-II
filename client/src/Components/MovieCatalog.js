import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import {MoviesContext} from "../Contexts/MoviesContext";

function MovieCatalog({watchlistSubmit, user}) {

    const { movies } = useContext(MoviesContext)
    const [searchParams, setSearchParams] = useState("")

    const moviesAlphabetical = movies.sort((a, b) => a.id - b.id).reverse();
    
    return (
        <div>
            <input placeholder="Search by Title, Actor, Director" onChange={(e) => setSearchParams(e.target.value)}></input>
            {moviesAlphabetical.map((movie,index) => (
                movie.name.toLowerCase().includes(searchParams?.toLowerCase()) ||
                movie.director.toLowerCase().includes(searchParams?.toLowerCase()) ||
                movie.actors.toString().toLowerCase().includes(searchParams?.toLowerCase()) ?
                <div key={index}>{movie.name.replace("&apos;","'")}
                <Link to={`/movie-details/${movie.id}`}>Details</Link>
                <button onClick={() => watchlistSubmit(movie.id)} >Add to Watchlist</button>
                {user ? <Link to={`/review-form/${movie.id}`}>Write Review</Link> : <button onClick={() => alert("Please log in to review")}>Write Review</button>}
                </div> : <></>
            ))} 
        </div>
    )
}

export default MovieCatalog