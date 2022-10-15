import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { MoviesContext } from "../Contexts/MoviesContext";
import Login from "./Login";
import Home from "./Home";
import Nav from "./Nav";


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
        <Login onLogin={setUser} />
      </MoviesContext.Provider>
    )
  
  return (
    <div className="">
        <Nav setUser={setUser} />
        <MoviesContext.Provider value={{movies, setMovies}}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MoviesContext.Provider>
    </div>
  );
}

export default App;