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
        <nav className="flex flex-wrap justify-between items-center mx-auto bg-gray-200 border-b-2 border-gray-600 px-4 lg:px-10 py-2.5">
           <Link to="/">
                <a href="#" className="flex items-center">
                    <img src="https://library.kissclipart.com/20180906/evw/kissclipart-video-camera-with-tripod-png-clipart-photographic-5f3c9c69f7c20fef.png" class="mr-3 h-6 sm:h-9" alt="" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Episode II</span>
                </a>
            </Link> 
            <div class="flex items-center md:order-2">
                <Link to="/login" className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-3 text-white uppercase rounded-md w-full">Log in/Register</Link>
            </div>
            <div className="text-center justify-between items-center w-full md:flex md:w-auto md:order-1 mt-2 font-medium py-2 pr-4 pl-3 text-gray-700 hover:text-blue-700 border border-gray-300 shadow">
                <Link to="/movie-catalog">Movie Catalog</Link>
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