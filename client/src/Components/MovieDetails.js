import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UsersContext } from "../Contexts/UsersContext";
import ReviewCard from "./ReviewCard";


function MovieDetails() {

    const [showReviews, setShowReviews] = useState(false);
    const [movie, setMovie] = useState([]);
    const { user } = useContext(UsersContext);
    const { id } = useParams();
    const displayActors = movie.actors?.map(a => a.split('=>')[1].replace("@type", "").replaceAll("\"", "").replaceAll(",", "") + " | ");
    

    useEffect(() => {
        fetch(`/movies/${id}`)
        .then(r => r.json())
        .then(movieData => setMovie(movieData));
    },[id])

    return(          
        <section className="bg-yellow-400 dark:bg-gray-900 h-screen overflow-auto">
            <div className="px-6 py-10 ">
                <div className="mt-8 lg:-mx-6 flex flex-col sm:flex-row items-center">
                    <img className="w-3/5 sm:w-1/5 lg:mx-6 rounded-xl border-4 border-black" src={movie.image} alt="" />
                    {showReviews? 
                    <div className="">
                        <h1 className="font-oswald font-bold text-2xl">Reviews: </h1>
                        <div className=" bg-white border-4 border-black rounded-md h-72 overflow-auto">
                            { movie.reviews?.length === 0 ?
                                <>
                                    <p className="text-sm text-gray-700 font-semibold uppercase px-10 py-2 mt-10">No reviews yet</p>  
                                    {user ? <Link className="text-sm text-blue-500 hover:text-blue-400 font-semibold underline uppercase px-10 py-2" to={`/review-form/${movie.id}`}>Be the first one</Link> : <></>}
                                </>
                                :
                                movie.reviews?.map((review, index) => (
                                    <>
                                        <ReviewCard key={index} review={review} />
                                    </>
                                ))
                            }
                        </div> 
                            <button onClick={() => setShowReviews(false)} className=" font-oswald font-bold inline-block mt-2 text-blue-700 underline hover:text-blue-600">Show Movie Details</button>
                    </div>
                    : 
                    <div className=" mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                        <p className="text-center sm:text-left text-sm text-gray-700 uppercase font-bold">{movie.genre?.map(movie => movie + " | ")}</p>
                        <h1 className="block text-center sm:text-left mt-4 text-2xl font-semibold font-oswald text-gray-800 underline dark:text-white md:text-3xl">
                            {movie.name}
                        </h1>
                        <p className="mt-3 font-semibold text-justify text-sm text-gray-700 dark:text-gray-300">
                            {movie.description?.replaceAll("&apos;","'").replaceAll("&quot;", "\"")} 
                        </p>
                        <button 
                            onClick={() => setShowReviews(true)}  
                            className="inline-block mt-2 font-semibold text-blue-700 underline hover:text-blue-600">
                            Read Reviews
                        </button>
                        <div className="mx-2 flex items-center mt-6">
                            <img className="object-cover object-center w-12 h-12 rounded-full" src="https://tse2.mm.bing.net/th?id=OIP.vyH0q9ClFhMQVl9fdyylSQHaHa&pid=Api&P=0" alt="" />
                            <div className="mx-4 text-sm text-gray-700 dark:text-gray-200 font-semibold">
                                <h1 ><span className="underline font-bold">Starring:</span> {displayActors}</h1>
                                <h1 ><span className="underline font-bold">Directed by:</span> {movie.director}</h1>
                            </div>
                        </div>
                    </div>
                    } 
                </div>
            </div>  
        </section>     
    )
}
export default MovieDetails; 