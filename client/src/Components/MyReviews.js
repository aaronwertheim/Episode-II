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
                <div className="flex" key={index}>
                    <div className="rounded-3xl inline-block overflow-hidden shadow-xl max-w-xs cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-102 duration-300">
                    <div class="relative group w-full overflow-hidden bg-black h-32 rounded-t-3xl">
                        <img
                        src={ review.movie.image }
                        class="object-cover w-full h-full transform duration-700 backdrop-opacity-100"
                        />
                        <div class="absolute bg-gradient-to-t from-black w-full h-full flex items-end justify-center -inset-y-0"><h1 class="font-bold text-2xl text-white mb-2">{review.movie.name} </h1></div>
                    </div>
                    <div class="bg-white">
                        <div class="text-center px-3 pb-6 pt-2">
                            <p>{review.created_at}</p>
                            <p class="mt-2 font-sans font-light text-slate-700">
                             {review.content}
                            </p>
                        </div>
                        <div class="flex justify-center pb-3 text-slate-700">
                            <div class="text-center mr-3 border-r pr-3 last:border-r-0">
                                <h2>Rating:</h2>
                                <span>{review.rating}</span>
                            </div>
                            <div class="text-center mr-3 border-r pr-3 last:border-r-0">
                                <h2>Likes:</h2>
                                <span>{review.votes.length}</span>
                            </div>
                            <button onClick={() => showForm === review ? setShowForm([]) : setShowForm(review)}>
                                {showForm === review ? "Hide" : "Edit/Remove"}
                            </button>
                        </div>
                    </div>
                    </div>
                    {showForm === review ? 
                        <div className="mx-auto w-full max-w-lg">
                            <h1 class="text-4xl font-medium">Write Review</h1>
                            <p class="mt-3 font-bold">Reviewing {review.movie.name} </p>
                            <form className="mt-10" onSubmit={(e) => {
                                e.preventDefault()
                                handleUpdate(review)
                            }}>
                                <div className="grid gap-6 sm:grid-cols-2" >
                                <div class="relative z-0 col-span-2">
                                    <textarea 
                                        rows="2" 
                                        className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                                        placeholder=" "
                                        value={newContent} 
                                        onChange={(e) => setNewContent(e.target.value)}>
                                    </textarea>
                                    <label
                                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                                        New Review:
                                    </label>
                                </div>
                                <div className="relative z-0">
                                <label
                                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">New Rating:</label>
                                <input 
                                    className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                                    placeholder=" "
                                    type="number" 
                                    min="1" 
                                    max="10" 
                                    value={newRating} 
                                    onChange={(e) => setNewRating(e.target.value)} 
                                />
                                </div>
                                </div>
                                <button className="mt-5 rounded-md bg-black px-10 py-2 text-white">Submit</button>
                            </form>
                            <button className="mt-5 rounded-md bg-black px-10 py-2 text-white" onClick={() => handleDelete(review.id)}>Remove</button>
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