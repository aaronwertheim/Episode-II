import { useEffect, useState } from "react"

function ReviewCard({review, user}) {
    
    const [votes, setVotes] = useState([])

    useEffect(() => {
        fetch('/votes')
        .then(r => r.json())
        .then(voteData => setVotes(voteData.filter(vote => vote.review_id === review.id).length))
    },[])
    
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

    return (
        <div>
            <div>Author: {review.author}</div> 
            <div>Rating: {review.rating}</div>
            <div>Review: {review.content}</div>
            <div><button onClick={() => likeReview(review)}>👍</button> {votes}</div>
        </div>
    )
}

export default ReviewCard