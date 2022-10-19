import { useEffect, useState } from "react";

function MyReviews({user}) {

    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState([])
    const [newContent, setNewContent] = useState("")
    const [newRating, setNewRating] = useState()

    useEffect(() => {
        fetch('/reviews')
        .then(r => r.json())
        .then(reviewData => setReviews(reviewData.filter(review => review.user_id === user.id)) )
    },[])

    function handleUpdate(review){
        fetch('/reviews/'+review.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: newContent,
                rating: newRating
            })
        })
    }

    function handleDelete(id){
        fetch('/reviews/'+id, {
            method: "DELETE"
        }).then (() => setReviews(reviews.filter(review => parseInt(review.id) !== parseInt(id))))
    }

    return (
        <div>
            {reviews?.map(review => (
                <div>{review.rating}{review.content}
                <button onClick={() => setShowForm(review)}>Edit/Remove</button>
                {showForm == review ? 
                <div>
                <form onSubmit={handleUpdate(review)}>
                    <label>New Content:</label>
                    <textarea value={ newContent } onChange={(e) => setNewContent(e.target.value)}></textarea>
                    <label>New Rating:</label>
                    <input type="number" value={ newRating } onChange={(e) => setNewRating(e.target.value)}></input>
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