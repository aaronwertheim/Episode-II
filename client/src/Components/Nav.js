import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsersContext } from "../Contexts/UsersContext";

function Nav() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UsersContext);

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        }).then(() => navigate("/"))
    }

    if(!user) return (
        <nav className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <a href="#" className="flex items-center">
                <img src="https://library.kissclipart.com/20180906/evw/kissclipart-video-camera-with-tripod-png-clipart-photographic-5f3c9c69f7c20fef.png" class="mr-3 h-6 sm:h-9" alt="" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Episode II</span>
            </a>
            <div class="flex items-center md:order-2">
                <Link to="/login" className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-3 text-white uppercase rounded-md w-full">Log in/Register</Link>
            </div>
            <div className="text-center justify-between items-center w-full md:flex md:w-auto md:order-1">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"><Link to="/">About</Link></li>
                <li className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"><Link to="/movie-catalog">Movie Catalog</Link></li>
                </ul> 
            </div>
        </nav>
        
    )

    return (
        <div className="float-left px-1">
            
            <div><Link to="/home">Home</Link></div>
            <div><Link to="/movie-catalog">Browse All</Link></div>
            <div><Link to="/watchlist">Watchlist</Link></div>
            <div><Link to="/my-reviews">My Reviews</Link></div>
            <div><button onClick={handleLogoutClick}>Logout</button></div>
            
        </div>
    )
}

export default Nav;