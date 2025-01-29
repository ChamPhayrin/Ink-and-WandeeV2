import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./sassStyles/main.css";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Nav from "./components/Nav";
import Footer from "./components/Footer";


function App() {
	const location = useLocation()

	return (
		<>
			{ !['/login', '/signup', '/contact'].includes(location.pathname) ? <Nav /> : ''}
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/products" element={<Products />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/account" element={<Account />} />
						<Route path="*" element={<Error />} />
					</Routes>
			{ !['/login', '/signup', '/contact'].includes(location.pathname) ? <Footer /> : ''}
		</>
	);
}

export default App;
