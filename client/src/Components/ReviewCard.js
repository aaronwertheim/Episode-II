import { useContext, useEffect, useState } from "react"
import { UsersContext } from "../Contexts/UsersContext";

function ReviewCard({ review }) {
    
    const [votes, setVotes] = useState([]);
    const { user } = useContext(UsersContext);

    useEffect(() => {
        fetch('/votes')
        .then(r => r.json())
        .then(voteData => setVotes(voteData.filter(vote => vote.review_id === review.id).length));
    },[])
    
    function likeReview(rev) {
        if(!user) return alert("Only registered users can upvote");
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
                    r.json().then(setVotes(votes + 1));
                } else {
                    r.json().then((err) => console.log(err.errors));
                }
            })
        }
    }

    return (
        <div className=" overflow-auto mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 border-b border-gray-600">
            <h1 className="block mt-4 text-lg font-semibold font-oswald text-gray-800 underline dark:text-white ">
                {review.author}
            </h1>
            <h2 className=" text-sm text-gray-500 uppercase">{review.created_at}</h2>
            <p className="mt-3 text-justify text-sm text-gray-500 dark:text-gray-300">
                {review.content} 
            </p>
            <div className="text-md text-gray-700 dark:text-gray-200 mt-6 font-bold">
                <h1><span className="underline font-oswald">Rating:</span> {review.rating}</h1>
                <h1><span onClick={() => likeReview(review)} className="cursor-pointer font-oswald">👍:</span> {votes} </h1>
            </div>
        </div>

    )
}

export default ReviewCard;