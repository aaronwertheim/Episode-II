import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { MoviesContext } from "../Contexts/MoviesContext";
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
  const [errors, setErrors] = useState([]);

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
    if (!user) return alert("Please Log in to add to watchlist")
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
        r.json().then(err => alert("This film is already on your watchlist"));
      }
    })
  }

  if (!user) return (
    <>
      <Nav setUser={setUser} user={user} />
      <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path={"movie-details/:id"} element={ <MovieDetails user={user} /> } />
      </Routes>
      <MoviesContext.Provider value={{movies, setMovies}}>
          <Routes>
            <Route path="/movie-catalog" element={<MovieCatalog watchlistSubmit={watchlistSubmit} user={user} />} />
          </Routes>
      </MoviesContext.Provider>
    </>
  )
  
  return (
    <div className="">
        <Nav setUser={setUser} user={user}/>
        <MoviesContext.Provider value={{movies, setMovies}}>
          <Routes>
            <Route path="/home" element={<Home user={ user } watchlistSubmit={watchlistSubmit} errors={errors} />} />
            <Route path="/movie-catalog" element={<MovieCatalog watchlistSubmit={watchlistSubmit} user={user}/>} />
          </Routes>
        </MoviesContext.Provider>  
          <Routes>  
            <Route path="/watchlist" element={ <Watchlist /> } />
            <Route path={"movie-details/:id"} element={ <MovieDetails user={user} /> } />
            <Route path={"review-form/:id"} element={ <ReviewForm user={user} /> } />
            <Route path={"/my-reviews"} element={ <MyReviews user={user}/> } />
          </Routes>
    </div>
  );
}

export default App;
