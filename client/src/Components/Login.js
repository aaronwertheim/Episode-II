import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";


function Login() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="bg-yellow-400 h-screen overflow-hidden flex items-center justify-center">
          <div className="bg-white lg:w-5/12 md:6/12 w-10/12 shadow-3xl">
            {showLogin ? (
                <>
                  <LoginForm />
                  <p className='flex justify-center mb-10'>
                    Don't have an account? &nbsp;
                    <button onClick={() => setShowLogin(false)}>
                      Sign Up
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <SignUpForm />
                  <p className='flex justify-center mb-10'>
                    Already have an account? &nbsp;
                    <button onClick={() => setShowLogin(true)}>
                      Log In
                    </button>
                  </p>
                </>
              )}
          </div>
        </div>
    )
  }
  export default Login
