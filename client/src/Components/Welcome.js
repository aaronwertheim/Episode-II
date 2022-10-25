import { useContext } from 'react';
import { MoviesContext } from '../Contexts/MoviesContext';

function Welcome() {

    const movies = useContext(MoviesContext)

    const randomMovieImage = movies.movies[Math.floor(Math.random()*movies.movies.length/5)]?.image

    

    return(
        <div class="bg-yellow-400 py-16 ">  
        <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
            <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                <div class="md:5/12 lg:w-5/12">
                    <img src={ randomMovieImage } alt="" loading="lazy" className="border-4 border-white rounded-sm" />
                </div>
                <div class="md:7/12 lg:w-6/12 p-6 rounded-sm shadow-xl">
                    <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">Welcome to Episode II</h2>
                    <p class="mt-6 text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!</p>
                    <p class="mt-4 text-gray-600"> Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at? Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.</p>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Welcome;