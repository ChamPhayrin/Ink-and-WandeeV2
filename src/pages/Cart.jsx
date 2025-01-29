import React, { useEffect, useState } from "react";
import WishAndCartCard from "../components/WishAndCartCard";
import { jwtDecode } from "jwt-decode";

export default function Cart() {
	const [user, setUser] = useState({});
	const [cart, setCart] = useState([]);
	const [subTotal, setSubTotal] = useState(0);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const getUser = () => {
		const token = localStorage.getItem("token");
		if (token) {
			const decoded = jwtDecode(token);
			setUser(decoded);
		}
	};

	const fetchCartData = async () => {
		if (!user.user_id) return;

		setLoading(true);
		setError(null);

		try {
			const response = await fetch("http://localhost:3000/getCart", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: user.user_id,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to fetch cart data");
			}

			const data = await response.json();
			setCart(data.result);

			const total = data.result.reduce(
				(acc, book) => acc + parseFloat(book.retail_price || 0),
				0
			);
			setSubTotal(total);
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
		fetchCartData();
	}, [user.user_id]);

	return (
		<>
			<main className="container">
				<section className="cartContainer">
					<section id="cardGrid">
						<div id="cardGridTitle" className="gridRow">
							<div className="title padding">Book</div>
							<div className="title padding"></div>
							<div className="title padding">Price</div>
							<div className="title padding"></div>
						</div>
						<div id="cardDisplayWrapper">
							{!user.user_id ? (
								<p>Please sign in</p>
							) : cart.length === 0 ? (
								<p>No items in Cart</p>
							) : loading ? (
								<div className="loading">Loading...</div>
							) : error ? (
								<div className="error">{error}</div>
							) : (
								cart.map((book) => (
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

					<section id="checkoutContainer">
						<div className="title">Order Summary:</div>
						<div className="checkoutWrapper">
							<div className="preTotal">
								<div className="checkoutRow">
									<h5>Subtotal {`(${cart.length} items)`}: </h5>
									<h5>{`$${subTotal.toFixed(2)}`}</h5>
								</div>
								<div className="checkoutRow">
									<h5>Shipping:</h5>
									<h5>{`$${(subTotal * 0.15).toFixed(2)}`}</h5>
								</div>
								<div className="checkoutRow">
									<h5>Tax:</h5>
									<h5>{`$${(subTotal * 0.3).toFixed(2)}`}</h5>
								</div>
							</div>
							<div className="checkoutRow">
								<h4>Total:</h4>
								<h4>{`$${(subTotal + subTotal * 0.15 + subTotal * 0.3).toFixed(
									2
								)}`}</h4>
							</div>
						</div>
						<div className="buttonWrapper">
							<button>Checkout</button>
						</div>
					</section>
				</section>
			</main>
		</>
	);
}
