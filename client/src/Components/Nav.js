import { Link, useNavigate } from "react-router-dom";

function Nav({setUser, user,}) {
    const navigate = useNavigate();

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