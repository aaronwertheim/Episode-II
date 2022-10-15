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
            <button onClick={handleLogoutClick}>
                Logout
            </button>
        </nav>
    )
}

export default Nav;