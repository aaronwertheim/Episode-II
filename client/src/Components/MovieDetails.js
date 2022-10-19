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
            <div>{movie.name} Details</div>
            <div>{movie.genre?.map(movie => movie + " ")}</div>
            <div>{movie.description}</div>
            <img src={movie.image} />
            <div>Reviews:
                {movie.reviews?.map(review => (
                    <ReviewCard review={review} user={user} />
                ))}
            </div>
        </div>
    )
}
export default MovieDetails;