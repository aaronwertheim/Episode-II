import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { MoviesContext } from "../Contexts/MoviesContext";
import { UsersContext } from "../Contexts/UsersContext";

function MovieCatalog({ watchlistSubmit }) {

    const { movies } = useContext(MoviesContext);
    const [searchParams, setSearchParams] = useState("");
    const { user } = useContext(UsersContext);

    const moviesAlphabetical = movies.sort((a, b) => a.id - b.id).reverse();
    
    return (
        <div className="h-screen overflow-auto no-scrollbar">
            <div className="flex items-center justify-center pt-3 text-lg bg-yellow-400">
                <div className="bg-gray-200 h-14 pl-3 ml-4">
                    <svg className=" mt-4 w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </div>
                <input
                    className="bg-gray-200 pl-12 py-2 md:py-4 mr-4 focus:outline-none h-14 w-full md:w-1/2" 
                    placeholder="Search by Title, Actor, Director"
                    type="text"
                    onChange={(e) => setSearchParams(e.target.value)}
                />
            </div>
            <div className="bg-yellow-400 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-items-center pt-5">
               {moviesAlphabetical.map((movie,index) => (
                movie.name.toLowerCase().includes(searchParams?.toLowerCase()) ||
                movie.director.toLowerCase().includes(searchParams?.toLowerCase()) ||
                movie.actors.toString().toLowerCase().includes(searchParams?.toLowerCase()) ?
                <div className="w-5/6 my-12" key={index}>
                    <Link to={`/movie-details/${movie.id}`}>
                        <img className="h-full border-2 border-black rounded-t-sm" src={movie.image} alt="" />
                    </Link>
                    <div>
                        <button 
                            className="bg-gradient-to-b from-gray-700 to-gray-900 hover:opacity-50 text-white uppercase w-full p-1" 
                            onClick={() => watchlistSubmit(movie.id)}>
                            Add to Watchlist
                        </button>
                    </div>
                    <div>
                        {user ? 
                            <button className="hover:opacity-50 bg-gradient-to-b from-gray-700 to-gray-900 text-white uppercase w-full p-1 rounded-b-md">
                                <Link  to={`/review-form/${movie.id}`}>Write Review</Link>
                            </button>
                            : 
                            <button 
                                className="hover:opacity-50 bg-gradient-to-b from-gray-700 to-gray-900 text-white uppercase w-full p-1 rounded-b-md" 
                                onClick={() => alert("Please log in to review")}>
                                Write Review
                            </button>}
                    </div>
                </div> : <></>
                ))} 
            </div>
        </div>
    )
}

export default MovieCatalog