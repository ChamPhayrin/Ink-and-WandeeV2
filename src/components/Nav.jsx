import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faCartShopping,
	faBars,
	faX,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

export default function Nav() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		if (isMenuOpen) {
			document.body.classList.add("noScroll");
		} else {
			document.body.classList.remove("noScroll");
		}

		return () => {
			document.body.classList.remove("noScroll");
		};
	}, [isMenuOpen]);

	return (
		<nav>
			<NavLink id="logo" to='/'>
				<div className="logo">
					<img src={logo} alt="logo" />
					<h1>Ink and Wandee</h1>
				</div>
			</NavLink>

			<div className="rightNav">
				<div className="hamburger" onClick={toggleMenu}>
					<FontAwesomeIcon icon={faBars} />
				</div>

				{/* Overlay to close the menu when clicked */}
				{isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}

				<div className={`navLinks ${isMenuOpen ? "open active" : ""}`}>
					<ul>
						{isMenuOpen && (
							<li className="closeMenu">
								<FontAwesomeIcon
									icon={faX}
									onClick={toggleMenu}
									id="closeMenu"
								/>
							</li>
						)}
						<li className="underlineHover">
							<NavLink className="NavLink" to="/" onClick={toggleMenu}>
								Home
							</NavLink>
						</li>
						<li className="underlineHover">
							<NavLink className="NavLink" to="/products" onClick={toggleMenu}>
								Products
							</NavLink>
						</li>
						<li className="underlineHover">
							<NavLink className="NavLink" to="/contact" onClick={toggleMenu}>
								Contact
							</NavLink>
						</li>
						{localStorage.getItem("token") ? (
							<li>
								<NavLink
									className="NavLink"
									id="userLink"
									to="/account"
									onClick={toggleMenu}
								>
									<FontAwesomeIcon icon={faUser} />
								</NavLink>
							</li>
						) : (
							<li className="underlineHover">
								<NavLink
									className="NavLink"
									id="signupLink"
									to="/signup"
									onClick={toggleMenu}
								>
									Register
								</NavLink>
							</li>
						)}
						<li>
							<NavLink
								className="NavLink"
								id="cartLink"
								to="/cart"
								onClick={toggleMenu}
							>
								<FontAwesomeIcon icon={faCartShopping} />
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
