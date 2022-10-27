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
    <div className="mx-auto w-full max-w-lg mt-4">
        <h1 className="text-3xl font-medium uppercase">Write a Review</h1>
        <p className="mt-3 font-bold"> </p>
        <form className="mt-10" onSubmit={reviewSubmit}>
        <div className="grid gap-6 sm:grid-cols-2" >
            <div className="relative z-0">
            <input 
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                type="number" 
                min="1" 
                max="10" 
                value={rating} 
                onChange={(e) => setRating(e.target.value)} 
            />
            <label 
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Rating:
            </label>
        </div>
        <div className="relative z-0 col-span-2">
            <textarea 
                rows="2" 
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                value={reviewContent} 
                onChange={(e) => setReviewContent(e.target.value)}>
            </textarea>
            <label
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                Review:
            </label>
        </div>
        <button className="rounded-md bg-black px-10 py-2 text-white hover:opacity-20" type="submit">Submit</button>
    </div>   
    </form>
    </div>  
    )}

export default ReviewForm;

// <div>
// <form onSubmit={reviewSubmit}>
//     <label>Rating:</label>
//     <input 
//         type="number" 
//         min="1" 
//         max="10" 
//         value={rating} 
//         onChange={(e) => setRating(e.target.value)}
//     />
//     <lable>Write Your Review:</lable>
//     <textarea 
//         value={reviewContent} 
//         onChange={(e) => setReviewContent(e.target.value)}>
//     </textarea>
//     <button>Submit Review</button>
// </form>
// <div>
//     {errors.map(err => (
//         <div>{err}</div>
//     ))}
// </div>
// </div>

{/* <div className="mx-auto w-full max-w-lg mt-4">
<h1 className="text-3xl font-medium uppercase">Edit your Review</h1>
<p className="mt-3 font-bold">{review.movie.name} </p>
<form className="mt-10" onSubmit={(e) => {
    e.preventDefault()
    handleUpdate(review)
}}>
    <div className="grid gap-6 sm:grid-cols-2" >
        <div className="relative z-0">
            <input 
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder={review.rating}
                type="number" 
                min="1" 
                max="10" 
                value={newRating} 
                onChange={(e) => setNewRating(e.target.value)} 
            />
            <label 
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                New Rating:
            </label>
        </div>
        <div className="relative z-0 col-span-2">
            <textarea 
                rows="2" 
                className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder={review.content}
                value={newContent} 
                onChange={(e) => setNewContent(e.target.value)}>
            </textarea>
            <label
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                New Review:
            </label>
        </div>
        <button className="rounded-md bg-black px-10 py-2 text-white hover:opacity-20" type="submit">Update</button>
        <button className="rounded-md bg-black px-10 py-2 text-white hover:bg-red-600" onClick={() => handleDelete(review.id)}>Delete This Review</button>
    </div>
    
</form>

</div>  */}