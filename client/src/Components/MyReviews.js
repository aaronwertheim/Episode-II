import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../Contexts/UsersContext";

function MyReviews() {

    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState([]);
    const [newContent, setNewContent] = useState();
    const [newRating, setNewRating] = useState();
    const { user } = useContext(UsersContext);
    
    useEffect(() => {
        fetch('/user-reviews')
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
            fetch('/user-reviews')
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
        <div className="h-screen overflow-auto no-scrollbar">
            {reviews?.map((review, index) => (
                <div className="flex flex-col md:flex-row" key={index}>
                    <div className="rounded-3xl inline-block overflow-hidden shadow-xl max-w-xs my-4 ml-4">
                        <div className="relative w-full overflow-hidden bg-black h-32 rounded-t-3xl">
                            <img
                                src={ review.movie.image }
                                className="object-cover w-full h-full backdrop-opacity-100"
                                alt=""
                            />
                            <div className="absolute bg-gradient-to-t from-black w-full h-full flex items-end justify-center -inset-y-0">
                                <h1 className="font-bold text-2xl text-white mb-2">{review.movie.name} </h1>
                            </div>
                        </div>
                        <div className="bg-white">
                            <div className="text-center px-3 pb-6 pt-2">
                                <p>{review.created_at}</p>
                                <p className="mt-2 font-sans font-light text-slate-700">
                                {review.content}
                                </p>
                            </div>
                            <div className="flex justify-center pb-3 text-slate-700">
                                <div className="text-center mr-3 border-r pr-3 last:border-r-0">
                                    <h2>Rating:</h2>
                                    <span>{review.rating}</span>
                                </div>
                                <div className="text-center mr-3 border-r pr-3 last:border-r-0">
                                    <h2>Likes:</h2>
                                    <span>{review.votes.length}</span>
                                </div>
                                <button className="hover:text-blue-700" onClick={() => showForm === review ? setShowForm([]) : setShowForm(review)}>
                                    {showForm === review ? "Hide" : "Edit / Remove"}
                                </button>
                            </div>
                        </div>
                    </div>
                    {showForm === review ? 
                        <div className="mx-auto w-full max-w-lg mt-4">
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
                            
                        </div> : 
                        <></>
                    }     
                </div>
            )).reverse()}
        </div>
        
    )
}

export default MyReviews;

// <div class="flex min-h-screen items-center justify-start bg-white">
//   <div class="mx-auto w-full max-w-lg">

//     <form action="https://api.web3forms.com/submit" class="mt-10">
    
//     <!-- This is a working contact form. 
//          Get your free access key from: https://web3forms.com/  -->

//       <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" /> 
//       <div class="grid gap-6 sm:grid-cols-2">
//         <div class="relative z-0">
//           <input type="text" name="name" class="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
//           <label class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your name</label>
//         </div>
//         <div class="relative z-0">
//           <input type="text" name="email" class="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
//           <label class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your email</label>
//         </div>
//         <div class="relative z-0 col-span-2">
//           <textarea name="message" rows="5" class="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" "></textarea>
//           <label class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">Your message</label>
//         </div>
//       </div>
//       <button type="submit" class="mt-5 rounded-md bg-black px-10 py-2 text-white">Send Message</button>
//     </form>
//   </div>
// </div>