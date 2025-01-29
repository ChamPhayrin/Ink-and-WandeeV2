import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import validator from "validator";

export default function Signup() {
	const [errors, setErrors] = useState([]);

	const username = useRef(null);
	const firstname = useRef(null);
	const lastname = useRef(null);
	const email = useRef(null);
	const password = useRef(null);
	const repeatPassword = useRef(null);

	const handleSignup = async (e) => {
		e.preventDefault();
		const newErrors = [];

		if (!username.current.value) {
			newErrors.push("Username is required");
		}

		if (!firstname.current.value) {
			newErrors.push("First Name is required");
		} else if (firstname.current.value.length > 30) {
			newErrors.push("First name must be 30 characters or less");
		}

		if (!lastname.current.value) {
			newErrors.push("Last Name is required");
		} else if (lastname.current.value.length > 30) {
			newErrors.push("Last name must be 30 characters or less");
		}

		if (!validator.isEmail(email.current.value)) {
			newErrors.push("Invalid email format");
		} else if (email.current.value.length > 30) {
			newErrors.push("Email must be 30 characters or less");
		}

		if (password.current.value.length < 6) {
			newErrors.push("Password must be at least 6 characters");
		}

		if (password.current.value !== repeatPassword.current.value) {
			newErrors.push("Passwords do not match");
		}

		if (newErrors.length > 0) {
			setErrors(newErrors);
			return;
		}

		// Clear previous errors
		setErrors([]);

		// Send signup request
		const response = await fetch("https://ink-and-wandeev2-be.onrender.com/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: username.current.value,
				firstname: firstname.current.value,
				lastname: lastname.current.value,
				email: email.current.value,
				password: password.current.value,
			}),
		});
		const data = await response.json();
		// Handle server response errors
		if (data.error) {
      newErrors.push(data.error)
			setErrors(newErrors);
		} else {
    window.location.href = '/login'

    }
	};

    useEffect(() => {
      if(localStorage.getItem('token')) {
        alert('Already logged in');
        window.location.href = "/";
      }
    }, [])

	return (
		<main id="signupPage">
			<h1 id="signupTitle">Sign up to join</h1>
			<form id="signupContainer" onSubmit={handleSignup}>
				<div className="inputContainer">
					<label htmlFor="username">Your Username</label>
					<input
						type="text"
						placeholder="e.g MyName32"
						name="username"
						id="username"
						ref={username}
					/>
				</div>
				<div className="inputContainer">
					<label htmlFor="firstName">Your First Name</label>
					<input
						type="text"
						placeholder="e.g John"
						name="firstName"
						id="firstName"
						ref={firstname}
					/>
				</div>
				<div className="inputContainer">
					<label htmlFor="lastName">Your Last Name</label>
					<input
						type="text"
						placeholder="e.g Doe"
						name="lastName"
						id="lastName"
						ref={lastname}
					/>
				</div>
				<div className="inputContainer">
					<label htmlFor="email">Your Email</label>
					<input
						type="email"
						placeholder="e.g yourname@email.com"
						name="email"
						id="email"
						ref={email}
					/>
				</div>
				<div className="inputContainer">
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						placeholder="e.g ThisIsMyPassword"
						name="password"
						id="password"
						ref={password}
					/>
				</div>
				<div className="inputContainer">
					<label htmlFor="repeatPassword">Repeat Your Password</label>
					<input
						type="password"
						placeholder="Repeat your password"
						name="repeatPassword"
						id="repeatPassword"
						ref={repeatPassword}
					/>
				</div>
				<button type="submit">Sign Up</button>
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
				<div id="signupLinks">
					<Link to="/login">Have an account? Log in</Link>
					<Link to="/">Back to Home</Link>
				</div>
			</form>
		</main>
	);
}
