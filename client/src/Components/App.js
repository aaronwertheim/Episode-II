import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { MoviesContext } from "../Contexts/MoviesContext";
import { UsersContext } from "../Contexts/UsersContext";
import Login from "./Login";
import Home from "./Home";
import Nav from "./Nav";
import Watchlist from "./Watchlist";
import MovieDetails from "./MovieDetails";
import ReviewForm from "./ReviewForm";
import MyReviews from "./MyReviews";
import Welcome from "./Welcome";
import MovieCatalog from "./MovieCatalog";


function App() {

  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);

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

  function watchlistSubmit(id){
    if (!user) return alert("Please Log in to add to watchlist");
    fetch("/watchlist_movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        movie_id: id
      })
    }).then((r) => {
      if(r.ok) {
        r.json().then(data => console.log(data));
      } else {
        r.json().then(() => alert("This film is already on your watchlist"));
      }
    })
  }

  if (!user) return (
    <UsersContext.Provider value={{ user, setUser }}>
      <Nav />
      <Routes>
          <Route path="/" element={ <Welcome /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path={"/movie-details/:id"} element={ <MovieDetails /> } />
      </Routes>
      <MoviesContext.Provider value={{ movies, setMovies }}>
          <Routes>
            <Route path="/movie-catalog" element={ <MovieCatalog watchlistSubmit={watchlistSubmit} /> } />
          </Routes>
      </MoviesContext.Provider>
    </UsersContext.Provider>
  );
  
  return (
    <UsersContext.Provider value={{ user, setUser }}>
        <Nav />
        <MoviesContext.Provider value={{ movies, setMovies }}>
          <Routes>
            <Route path="/home" element={ <Home watchlistSubmit={watchlistSubmit} /> } />
            <Route path="/movie-catalog" element={ <MovieCatalog watchlistSubmit={watchlistSubmit}/> } />
          </Routes>
        </MoviesContext.Provider>  
          <Routes>  
            <Route path="/watchlist" element={ <Watchlist /> } />
            <Route path={"movie-details/:id"} element={ <MovieDetails /> } />
            <Route path={"review-form/:id"} element={ <ReviewForm /> } />
            <Route path={"/my-reviews"} element={ <MyReviews /> } />
          </Routes>
      </UsersContext.Provider>
  );
}

export default App;
