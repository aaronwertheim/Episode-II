import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../Contexts/UsersContext";

function MyReviews() {

    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState([]);
    const [newContent, setNewContent] = useState();
    const [newRating, setNewRating] = useState();
    const { user } = useContext(UsersContext);
    
    useEffect(() => {
        fetch('/reviews')
        .then(r => r.json())
        .then(reviewData => setReviews(reviewData.filter(review => review.user_id === user.id)));
    },[])

    function handleUpdate(review){
        
        fetch('/reviews/' + review.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: newContent,
                rating: newRating
            })
        }).then(() => {
            fetch('/reviews')
            .then(r => r.json())
            .then(reviewData => setReviews(reviewData.filter(review => review.user_id === user.id)));
        })
        setNewContent();
        setNewRating();
    }

    function handleDelete(id){
        fetch('/reviews/'+id, {
            method: "DELETE"
        }).then (() => setReviews(reviews.filter(review => parseInt(review.id) !== parseInt(id))));
    }

    return (
        <div>
            {reviews?.map((review, index) => (
                <div key={index} className="border border-black">
                    <div>{review.created_at}</div>
                    <div>{review.movie.name}</div>
                    <div>Rating: {review.rating}</div>
                    <div>Review: {review.content}</div>
                    <div>Likes: {review.votes.length}</div>
                    <button onClick={() => showForm === review ? setShowForm([]) : setShowForm(review)}>
                        {showForm === review ? "Hide" : "Edit/Remove"}
                    </button>
                    {showForm === review ? 
                        <div>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                handleUpdate(review)
                            }}>
                                <label>New Review:</label>
                                <textarea 
                                    value={newContent} 
                                    onChange={(e) => setNewContent(e.target.value)}>
                                </textarea>
                                <label>New Rating:</label>
                                <input 
                                    type="number" 
                                    min="1" 
                                    max="10" 
                                    value={newRating} 
                                    onChange={(e) => setNewRating(e.target.value)} 
                                />
                                <button>Submit</button>
                            </form>
                            <button onClick={() => handleDelete(review.id)}>Remove</button>
                        </div> : 
                        <></>
                    }     
                </div>
            ))}
        </div>
        
    )
}

export default MyReviews;