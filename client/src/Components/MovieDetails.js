import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

function MovieDetails({user}) {

    const [movie, setMovie] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`/movies/${id}`)
        .then(r => r.json())
        .then(movieData => setMovie(movieData))
    },[id])


    return(
        <div>
            <div>Title: {movie.name} Details</div>
            <div>Genre: {movie.genre?.map(movie => movie + " ")}</div>
            <div>Description: {movie.description}</div>
            <div>Director: {movie.director}</div>
            <img src={movie.image} alt="" />
            <div>Reviews:
                {movie.reviews?.map((review, index) => (
                    <ReviewCard key={index} review={review} user={user} />
                ))}
            </div>
        </div>
    )
}
export default MovieDetails;