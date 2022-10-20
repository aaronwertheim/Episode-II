import { useContext } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../Contexts/MoviesContext";

function Home({ watchlistSubmit }) {

    const { movies } = useContext(MoviesContext);
    
    function shuffleArray(array) {
      let curId = array.length;
      while (0 !== curId) {
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
      }
      return array;
    }

    const moviesShuffled = shuffleArray(movies);

    return (
      <div>
        <h1 className="text-3xl">Action</h1>
        <div className="grid grid-flow-col overflow-auto">
          {moviesShuffled.map((movie, index) => (
            movie.genre.includes("Action") || movie.genre.includes("Adventure") ?
            <div className="w-44 h-100" key={index}>
              <Link to={`/movie-details/${movie.id}`}>
                <img className="w-11/12" src={movie.image} alt="" />
              </Link>
              <div>
                <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
              </div>
              <div>
                <Link to={`/review-form/${movie.id}`}>Write Review</Link>
              </div>
            </div> : <></>
          )).slice(0, 50)}
        </div>

        <h1 className="text-3xl">Drama</h1>
        <div className="grid grid-flow-col overflow-auto">
          {moviesShuffled.map((movie, index) => (
            movie.genre.includes("Drama") ?
            <div className="w-44 h-100" key={index}>
              <Link to={`/movie-details/${movie.id}`}>
                <img className="w-11/12" src={movie.image} alt="" />
              </Link>
              <div>
                <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
              </div>
              <div>
                <Link to={`/review-form/${movie.id}`}>Write Review</Link>
              </div>
            </div> : <></>
          )).slice(0, 20)}
        </div>

        <h1 className="text-3xl">Comedy</h1>
        <div className="grid grid-flow-col overflow-auto">
          {moviesShuffled.map((movie, index) => (
            movie.genre.includes("Comedy") ?
            <div className="w-44 h-100" key={index}>
              <Link to={`/movie-details/${movie.id}`}>
                <img className="w-11/12" src={movie.image} alt="" />
              </Link>
              <div>
                <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
              </div>
              <div>
                <Link to={`/review-form/${movie.id}`}>Write Review</Link>
              </div>
            </div> : <></>
          )).slice(0, 75)}
        </div>

        <h1 className="text-3xl">Romance</h1>
        <div className="grid grid-flow-col overflow-auto">
          {moviesShuffled.map((movie, index) => (
            movie.genre.includes("Romance") ?
            <div className="w-44 h-100" key={index}>
              <Link to={`/movie-details/${movie.id}`}>
                <img className="w-11/12" src={movie.image} alt="" />
              </Link>
              <div>
                <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
              </div>
              <div>
                <Link to={`/review-form/${movie.id}`}>Write Review</Link>
              </div>
            </div> : <></>
          )).slice(0, 150).reverse()}
        </div>

        <h1 className="text-3xl">Western</h1>
        <div className="grid grid-flow-col overflow-auto">
          {moviesShuffled.map((movie, index) => (
            movie.genre.includes("Western") ?
            <div className="w-44 h-100" key={index}>
              <Link to={`/movie-details/${movie.id}`}>
                <img className="w-11/12" src={movie.image} alt="" />
              </Link>
              <div>
                <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
              </div>
              <div>
                <Link to={`/review-form/${movie.id}`}>Write Review</Link>
              </div>
            </div> : <></>
          ))}
        </div>

        <h1 className="text-3xl">Animated</h1>
        <div className="grid grid-flow-col overflow-auto">
          {moviesShuffled.map((movie, index) => (
            movie.genre.includes("Animation") ?
            <div className="w-44 h-100" key={index}>
              <Link to={`/movie-details/${movie.id}`}>
                <img className="w-11/12" src={movie.image} alt="" />
              </Link>
              <div>
                <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
              </div>
              <div>
                <Link to={`/review-form/${movie.id}`}>Write Review</Link>
              </div>
            </div> : <></>
          )).slice(0, 150)}
        </div>
        
        <h1 className="text-3xl">Horror</h1>
        <div className="grid grid-flow-col overflow-auto">
          {moviesShuffled.map((movie, index) => (
            movie.genre.includes("Horror") ?
            <div className="w-44 h-100" key={index}>
              <Link to={`/movie-details/${movie.id}`}>
                <img className="w-11/12" src={movie.image} alt="" />
              </Link>
              <div>
                <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
              </div>
              <div>
                <Link to={`/review-form/${movie.id}`}>Write Review</Link>
              </div>
            </div> : <></>
          ))}
        </div>

        <h1 className="text-3xl">Crime / Mystery</h1>
        <div className="grid grid-flow-col overflow-auto">
          {moviesShuffled.map((movie, index) => (
            movie.genre.includes("Crime") ||
            movie.genre.includes("Mystery") ?
            <div className="w-44 h-100" key={index}>
              <Link to={`/movie-details/${movie.id}`}>
                <img className="w-11/12" src={movie.image} alt="" />
              </Link>
              <div>
                <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
              </div>
              <div>
                <Link to={`/review-form/${movie.id}`}>Write Review</Link>
              </div>
            </div> : <></>
          )).slice(0, 50)}
        </div>

        <h1 className="text-3xl">Thriller</h1>
        <div className="grid grid-flow-col overflow-auto">
          {moviesShuffled.map((movie, index) => (
            movie.genre.includes("Thriller") ?
            <div className="w-44 h-100" key={index}>
              <Link to={`/movie-details/${movie.id}`}>
                <img className="w-11/12" src={movie.image} alt="" />
              </Link>
              <div>
                <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
              </div>
              <div>
                <Link to={`/review-form/${movie.id}`}>Write Review</Link>
              </div>
            </div> : <></>
          )).slice(0,150)}
        </div>

        <h1 className="text-3xl">Family</h1>
        <div className="grid grid-flow-col overflow-auto">
          {moviesShuffled.map((movie, index) => (
            movie.genre.includes("Family") ?
            <div className="w-44 h-100" key={index}>
              <Link to={`/movie-details/${movie.id}`}>
                <img className="w-11/12" src={movie.image} alt="" />
              </Link>
              <div>
                <button onClick={ () => watchlistSubmit(movie.id) }>Add to Watchlist</button>
              </div>
              <div>
                <Link to={`/review-form/${movie.id}`}>Write Review</Link>
              </div>
            </div> : <></>
          ))}
        </div>
      </div>
    );
  }
  
  export default Home;