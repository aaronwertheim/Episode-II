import { Link } from "react-router-dom";

function Nav({setUser}) {

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
    }
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/watchlist">Watchlist</Link>
            <button onClick={handleLogoutClick}>
                Logout
            </button>
        </nav>
    )
}

export default Nav;