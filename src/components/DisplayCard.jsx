import React, { useState, useEffect } from "react";
import example from '../assets/example.png';
import { jwtDecode } from "jwt-decode";

export default function DisplayCard(props) {
    const [user, setUser ] = useState({});
    const [inCart, setInCart] = useState(false);
    const [inSaved, setInSaved] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser (decoded); // Store decoded user data
        }
    }, []);

    const addToCart = async (book) => {
        if (!user.user_id) {
            setError('Must be logged in');
            return;
        }
        try {
            const response = await fetch('https://ink-and-wandeev2-be.onrender.com/addCart', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    book: book,
                    user_id: user.user_id
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }
            setInCart(true);
            setError(""); // Clear error on success
        } catch (error) {
            console.error('Error adding to cart:', error);
            setError('Failed to add to cart');
        }
    };

    const deleteFromCart = async (book) => {
        if (!user.user_id) {
            setError('Must be logged in');
            return;
        }
        try {
            const response = await fetch('https://ink-and-wandeev2-be.onrender.com/deleteCart', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    book: book,
                    user_id: user.user_id
                })
            });
            if (!response.ok) {
                throw new Error('Failed to delete from cart');
            }
            setInCart(false);
            setError(""); // Clear error on success
        } catch (error) {
            console.error('Error deleting from cart:', error);
            setError('Failed to delete from cart');
        }
    };

    const save = async (book) => {
        if (!user.user_id) {
            setError('Must be logged in ');
            return;
        }
        try {
            const response = await fetch('https://ink-and-wandeev2-be.onrender.com/savedProducts', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    book: book,
                    user_id: user.user_id
                })
            });
            if (!response.ok) {
                throw new Error('Failed to save to wishlist');
            }
            setInSaved(true);
            setError(""); // Clear error on success
        } catch (error) {
            console.error('Error saving to wishlist:', error);
            setError('Failed to save to wishlist');
        }
    };

    const deleteSaved = async (book) => {
        if (!user.user_id) {
            setError('Must be logged in');
            return;
        }
        try {
            const response = await fetch('https://ink-and-wandeev2-be.onrender.com/deleteSaved', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    book: book,
                    user_id: user.user_id
                })
            });
            if (!response.ok) {
                throw new Error('Failed to delete from wishlist');
            }
            setInSaved(false);
            setError(""); // Clear error on success
        } catch (error) {
            console.error('Error deleting from wishlist:', error);
            setError('Failed to delete from wishlist');
        }
    };

    return (
        <div className="displayCard">
            <div className="displayCardImg">
                <img src={props.image} alt={props.title} />
            </div>
            <div className="displayCardDescription">
                <h2>{props.title}</h2>
                <h4>{props.author}</h4>
                <p>{props.genres}</p>
                <h1>{props.price}</h1>
                <div className="displayCardBtns">
                    {error && <p className="error">{error}</p>}
                    {inCart ? (
                        <button className='removeBtn' onClick={() => deleteFromCart(props.book)}>Remove from Cart</button>
                    ) : (
                        <button onClick={() => addToCart(props.book)}>Add to Cart</button>
                    )}
                    {inSaved ? (
                        <button className='removeBtn' onClick={() => deleteSaved(props.book)}>Remove from wishlist</button>
                    ) : (
                        <button onClick={() => save(props.book)}>Wishlist</button>
                    )}
                </div>
            </div>
        </div>
    );
}