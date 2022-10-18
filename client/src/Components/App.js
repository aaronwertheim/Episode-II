import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { MoviesContext } from "../Contexts/MoviesContext";
import Login from "./Login";
import Home from "./Home";
import Nav from "./Nav";
import Watchlist from "./Watchlist";


function App() {

  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/movies")
    .then(response => response.json())
    .then(moviesArray => setMovies(moviesArray))
    .catch(error => console.log('error', error));
  },[])

  if (!user) return (
      <MoviesContext.Provider value={{movies, setMovies}}>
        <Login onLogin={setUser} watchlistSubmit={watchlistSubmit}/>
      </MoviesContext.Provider>
    )

    function watchlistSubmit(id){
      if (!user) return alert("Please Log in or Sign up")
      fetch("/watchlist_movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          movie_id: id
        }),
      })
    }
  
  return (
    <div className="">
        <Nav setUser={setUser} />
        <MoviesContext.Provider value={{movies, setMovies}}>
          <Routes>
            <Route path="/" element={<Home user={ user } watchlistSubmit={watchlistSubmit} />} />
            <Route path="/watchlist" element={ <Watchlist /> } />
          </Routes>
        </MoviesContext.Provider>
    </div>
  );
}

export default App;
