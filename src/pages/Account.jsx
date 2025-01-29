import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import WishAndCartCard from "../components/WishAndCartCard"; // Ensure this import is correct
import Admin from "./Admin";
import { useNavigate } from "react-router-dom";

export default function Account() {
	const [user, setUser] = useState({});
	const [wishlist, setWishlist] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate()

	const getUser = () => {
		const token = localStorage.getItem("token");
		if (token) {
			const decoded = jwtDecode(token);
			setUser(decoded);
		}
	};

	const handleWishlist = async () => {
		if (!user.user_id) return;

		setLoading(true);
		setError(null);

		try {
			const response = await fetch("https://ink-and-wandeev2-be.onrender.com/getWishlist", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: user.user_id,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to fetch wishlist data");
			}

			const data = await response.json();
			setWishlist(data.result);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		handleWishlist();
	}, [user.user_id]);

	const handleLogout = () => {
		setUser({});
		localStorage.clear();
		navigate("/");
	};

	return (
		<>
			{user.is_admin === 1 ? (
				<Admin />
			) : (
				<main className="container">
					<section id="accountContainer">
						<section id="accountWrapper">
							<h1>Account Info</h1>
							<div className="accountDetails">
								<div>
									<h5>Username:</h5>
									<p>{user.username || "N/A"}</p>
								</div>
								<div>
									<h5>First Name:</h5>
									<p>{user.first_name || "N/A"}</p>
								</div>
								<div>
									<h5>Last Name:</h5>
									<p>{user.last_name || "N/A"}</p>
								</div>
								<div>
									<h5>Email:</h5>
									<p>{user.email || "N/A"}</p>
								</div>
								<button onClick={handleLogout}>Log out</button>
							</div>
						</section>

						<section id="wishlist">
							<h2>Your Wishlist</h2>
							<div id="cardGrid">
								{!user.user_id ? (
									<p>Please sign in</p>
								) : wishlist.length === 0 ? (
									<p>No items in Wishlist</p>
								) : loading ? (
									<div className="loading">Loading...</div>
								) : error ? (
									<div className="error">{error}</div>
								) : (
									wishlist.map((book) => (
										<WishAndCartCard
											key={book.product_id}
											img={book.cover_img}
											title={book.title}
											price={`$${book.retail_price}`}
											book={book}
											user_id={user.user_id}
										/>
									))
								)}
							</div>
						</section>
					</section>
				</main>
			)}
		</>
	);
}
