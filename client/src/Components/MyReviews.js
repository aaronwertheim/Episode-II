import { useEffect, useState } from "react";

function MyReviews({user}) {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('/reviews')
        .then(r => r.json())
        .then(reviewData => setReviews(reviewData.filter(review => review.user_id === user.id)) )
    },[])

    return (
        <div>
            {reviews?.map(review => (
                <div>{review.rating}{review.content}</div>
            ))}
        </div>
        
    )
}

export default MyReviews;