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
        <nav>
            <Link to="/">About</Link>
            <Link to="/movie-catalog">Movie Catalog</Link>
            <Link to="/login">Login/Register</Link>
        </nav>
    )

    return (
        <nav>
            <div>{"Hello " + user.username}</div>
            <Link to="/home">Home</Link>
            <Link to="/movie-catalog">Browse All</Link>
            <Link to="/watchlist">Watchlist</Link>
            <Link to="/my-reviews">My Reviews</Link>
            <button onClick={handleLogoutClick}>
                Logout
            </button>
        </nav>
    )
}

export default Nav;