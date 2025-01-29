import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import validator from 'validator';

export default function Login() {
  const [errors, setErrors] = useState([]);
  const username = useRef(null);
  const password = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = [];


    if (!username.current.value) {
      newErrors.push("Username is required");
    } else if (!validator.isAlphanumeric(username.current.value)) {
      newErrors.push("Username must contain only letters and numbers");
    }


    if (!password.current.value) {
      newErrors.push("Password is required");
    } else if (password.current.value.length < 6) {
      newErrors.push("Password must be at least 6 characters");
    }


    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }


    setErrors([]);

    const response = await fetch('https://ink-and-wandeev2-be.onrender.com/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value,
      }),
    });

    const data = await response.json();


    if (data.error) {
      newErrors.push(data.error);
      setErrors(newErrors);
    } else {
      localStorage.setItem('token', data.token);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    // Redirect if the user is already logged in
    if (localStorage.getItem('token')) {
      alert('Already logged in');
      window.location.href = "/";
    }
  }, []);

  return (
    <main id="loginPage">
      <h1 id="loginTitle">Sign in to your account</h1>
      <div id="loginContainer">
        <form onSubmit={handleLogin}>
          <div className="inputContainer">
            <label htmlFor="username">Your Username</label>
            <input
              id="username"
              type="text"
              placeholder="e.g MyName32"
              ref={username}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="password">Your Password</label>
            <input
              id="password"
              type="password"
              placeholder="e.g thisismypassword"
              ref={password}
            />
          </div>
          <div id="errorMessages">
            {errors.length > 0 && (
              <ul>
                {errors.map((error, index) => (
                  <li key={index} className="error">
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="submit">Login</button>
        </form>
        <div id="loginLinks">
          <Link to="/signup">Don't have an account?</Link>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
