import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

function MovieDetails() {

    const [movie, setMovie] = useState([]);
    const { id } = useParams();
    const displayActors = movie.actors?.map(a => a.split('=>')[1].replace("@type", "").replaceAll("\"", "").replaceAll(",", "") + " | ");
    const [showReviews, setShowReviews] = useState(false);

    useEffect(() => {
        fetch(`/movies/${id}`)
        .then(r => r.json())
        .then(movieData => setMovie(movieData));
    },[id])

    return(          
        <section className="bg-white dark:bg-gray-900 h-screen overflow-auto">
            <div className="px-6 py-10 ">
                <div className="mt-8 lg:-mx-6 flex flex-col sm:flex-row items-center">
                    <img className="w-3/5 sm:w-1/5 lg:mx-6 rounded-xl " src={movie.image} alt="" />
                    {showReviews? 
                    <div className="">
                        <h1 className="font-oswald font-bold text-2xl">Reviews: </h1>
                        <div className="border-4 border-black rounded-md h-72 overflow-auto">
                            {movie.reviews?.map((review, index) => (
                                <>
                                    <ReviewCard key={index} review={review} />
                                </>
                            ))}
                        </div> 
                            <button onClick={() => setShowReviews(false)} className=" font-oswald inline-block mt-2 text-blue-500 underline hover:text-blue-400">Show Movie Details</button>
                    </div>
                    : 
                    <div className=" mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                        <p className="text-center sm:text-left text-sm text-gray-500 uppercase">{movie.genre?.map(movie => movie + " | ")}</p>
                        <h1 className="block text-center sm:text-left mt-4 text-2xl font-semibold font-oswald text-gray-800 underline dark:text-white md:text-3xl">
                            {movie.name}
                        </h1>
                        <p className="mt-3 text-justify text-sm text-gray-500 dark:text-gray-300">
                            {movie.description?.replaceAll("&apos;","'").replaceAll("&quot;", "\"")} 
                        </p>
                        <button 
                            onClick={() => setShowReviews(true)}  
                            className="inline-block mt-2 text-blue-500 underline hover:text-blue-400">
                            Read Reviews
                        </button>
                        <div className="mx-2 flex items-center mt-6">
                            <img className="object-cover object-center w-12 h-12 rounded-full" src="https://tse2.mm.bing.net/th?id=OIP.vyH0q9ClFhMQVl9fdyylSQHaHa&pid=Api&P=0" alt="" />
                            <div className="mx-4 text-sm text-gray-700 dark:text-gray-200">
                                <h1><span className="underline">Starring:</span> {displayActors}</h1>
                                <h1><span className="underline">Directed by:</span> {movie.director}</h1>
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

{/* <div>Title: {movie.name?.replace("&apos;","'")}</div>
            <div>Genre: {movie.genre?.map(movie => movie + " ")}</div>
            <div>Description: {movie.description?.replaceAll("&apos;","'").replaceAll("&quot;", "\"")}</div>
            <div>Director: {movie.director}</div>
            <div>Starring: {displayActors}</div>
            <img src={movie.image} alt="" />
            <div>Reviews:
                {movie.reviews?.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))}
            </div> */}