import { useEffect, useState } from "react"

function ReviewCard({review, user}) {
    
    const [votes, setVotes] = useState([])

    useEffect(() => {
        fetch('/votes')
        .then(r => r.json())
        .then(voteData => setVotes(voteData.filter(vote => vote.review_id === review.id).length))
    },[])
    
    function likeReview(rev) {
        if(!user) return alert("Please Log in or Sign up")
        else {
            fetch('/votes', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                user_id: user.id,
                review_id: rev.id
            }),
            }).then(r => {
                if(r.ok){
                    r.json().then(setVotes(votes + 1))
                } else {
                    r.json().then((err) => console.log(err.errors));
                }
            })
        }
    }

    return (
        <div>
            <div>Date: {review.created_at}</div>
            <div>Author: {review.author}</div> 
            <div>Rating: {review.rating}</div>
            <div>Review: {review.content}</div>
            <div><button onClick={() => likeReview(review)}>👍</button> {votes}</div>
        </div>
    )
}

export default ReviewCard