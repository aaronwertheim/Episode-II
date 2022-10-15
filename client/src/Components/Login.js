import { useContext, useState } from "react";
import {MoviesContext} from "../Contexts/MoviesContext";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";


function Login({ onLogin }) {
    const [showLogin, setShowLogin] = useState(true);
    const { movies } = useContext(MoviesContext)

    return (
        <>
        {showLogin ? (
            <>
              <LoginForm onLogin={onLogin} />
              <p>
                Don't have an account? &nbsp;
                <button color="secondary" onClick={() => setShowLogin(false)}>
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <SignUpForm onLogin={onLogin} />
              <p>
                Already have an account? &nbsp;
                <button color="secondary" onClick={() => setShowLogin(true)}>
                  Log In
                </button>
              </p>
            </>
          )}
         
          </>
    )
  }
  export default Login