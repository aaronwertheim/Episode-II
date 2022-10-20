import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

function MovieDetails() {

    const [movie, setMovie] = useState([]);
    const { id } = useParams();
    const displayActors = movie.actors?.map(a => a.split('=>')[1].replace("@type", "").replaceAll("\"", "").replaceAll(",", ""));

    useEffect(() => {
        fetch(`/movies/${id}`)
        .then(r => r.json())
        .then(movieData => setMovie(movieData));
    },[id])

    return(
        <div className="h-screen overflow-auto no-scrollbar">
            <div>Title: {movie.name?.replace("&apos;","'")}</div>
            <div>Genre: {movie.genre?.map(movie => movie + " ")}</div>
            <div>Description: {movie.description?.replaceAll("&apos;","'").replaceAll("&quot;", "\"")}</div>
            <div>Director: {movie.director}</div>
            <div>Starring: {displayActors}</div>
            <img src={movie.image} alt="" />
            <div>Reviews:
                {movie.reviews?.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))}
            </div>
        </div>
    )
}
export default MovieDetails;