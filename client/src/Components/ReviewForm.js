import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UsersContext } from "../Contexts/UsersContext";

function ReviewForm() {

    const [rating, setRating] = useState();
    const [reviewContent, setReviewContent] = useState();
    const [errors, setErrors] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UsersContext);

    function reviewSubmit(e){
        e.preventDefault();
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
        }).then((r) => {
            if(r.ok) {
                r.json().then(() => navigate("/my-reviews"));
            }
            else {
                r.json().then(err => setErrors(err.errors));
            }
        })
      }
    

    return(
        <div>
            <form onSubmit={reviewSubmit}>
                <label>Rating:</label>
                <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)}
                />
                <lable>Write Your Review:</lable>
                <textarea 
                    value={reviewContent} 
                    onChange={(e) => setReviewContent(e.target.value)}>
                </textarea>
                <button>Submit Review</button>
            </form>
            <div>
                {errors.map(err => (
                    <div>{err}</div>
                ))}
            </div>
        </div>
        
    )
    
}

export default ReviewForm;