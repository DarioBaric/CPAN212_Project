
import React, { useState } from 'react';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div>
            <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
            <form>
                {isSignUp && <input type="text" placeholder="Name" />}
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
            </form>
            <button onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Have an account? Login' : 'New user? Sign Up'}
            </button>
        </div>
    );
};

export default Login;
