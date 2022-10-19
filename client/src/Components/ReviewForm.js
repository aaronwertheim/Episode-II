import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ReviewForm({user}) {

    const [movie, setMovie] = useState([]);
    const [rating, setRating] = useState();
    const [reviewContent, setReviewContent] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/movies/${id}`)
        .then(r => r.json())
        .then(movieData => setMovie(movieData))
    },[id])

    function reviewSubmit(e){
        e.preventDefault()
        fetch("/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            movie_id: id,
            rating,
            content: reviewContent,
            author: user.username,
          }),
        }).then(() => navigate("/my-reviews"))
      }
    

    return(
        <form onSubmit={reviewSubmit}>
            <label>Rating:</label>
            <input type="number" value={rating} onChange={(e) => setRating(e.target.value)}></input>
            <lable>Write Your Review:</lable>
            <textarea value={reviewContent} onChange={(e) => setReviewContent(e.target.value)}></textarea>
            <button>Submit Review</button>
        </form>
    )
    
}

export default ReviewForm;