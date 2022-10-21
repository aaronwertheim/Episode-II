import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";


function Login() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <>
        {showLogin ? (
            <>
              <LoginForm />
              <p>
                Don't have an account? &nbsp;
                <button onClick={() => setShowLogin(false)}>
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <SignUpForm />
              <p>
                Already have an account? &nbsp;
                <button onClick={() => setShowLogin(true)}>
                  Log In
                </button>
              </p>
            </>
          )}
        
          </>
    )
  }
  export default Login