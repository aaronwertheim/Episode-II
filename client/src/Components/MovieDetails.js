import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetails({user}) {

    const [movie, setMovie] = useState([]);
    const [votes, setVotes] = useState([])
    const { id } = useParams();

    useEffect(() => {
        fetch(`/movies/${id}`)
        .then(r => r.json())
        .then(movieData => setMovie(movieData))
    },[id])

    useEffect(() => {
        fetch('/votes')
        .then(r => r.json())
        .then(voteData => setVotes(voteData.filter(vote => vote.review_id === parseInt(id)).length))
    },[id])

    function likeReview(rev) {

        
        fetch('/votes', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                user_id: user.id,
                review_id: rev.id
            }),
        }).then(setVotes(votes + 1))
    }

    return(
        <div>
            <div>{movie.name} Details</div>
            <div>{movie.genre?.map(movie => movie + " ")}</div>
            <div>{movie.description}</div>
            <img src={movie.image} />
            <div>Reviews:
                {movie.reviews?.map(review => (
                    <div>
                        <div>Author: {review.author}</div> 
                        <div>Rating: {review.rating}</div>
                        <div>Review: {review.content}</div>
                        <div><button onClick={() => likeReview(review)}>👍</button> {votes}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MovieDetails;