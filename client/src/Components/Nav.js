import { Link, useNavigate } from "react-router-dom";

function Nav({setUser}) {
    const navigate = useNavigate();

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        }).then(() => navigate("/"))
    }
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/watchlist">Watchlist</Link>
            <Link to="/my-reviews">My Reviews</Link>
            <button onClick={handleLogoutClick}>
                Logout
            </button>
        </nav>
    )
}

export default Nav;