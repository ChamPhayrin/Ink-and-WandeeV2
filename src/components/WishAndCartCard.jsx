import React from 'react';

export default function WishAndCartCard(props) {

  const deleteFromCart = async (book) => {
    try {
      const response = await fetch('https://ink-and-wandeev2-be.onrender.com/deleteCart', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book: book,
          user_id: props.user_id
        })
      });

      if (!response.ok) {
        throw new Error("Failed to delete item from cart");
      }

      await props.onclick();
    } catch (error) {
      console.error("Error deleting from cart:", error);
    }
  };

  return (
    <>
      <div className="cardDisplay gridRow borderTop">
        <div className="cardImg">
          <img src={props.img} alt={props.title} />
        </div>
        <h5 className="padding">{props.title}</h5>
        <p className='padding'>{props.price}</p>
        <button className='x' onClick={() => {deleteFromCart(props.book); window.location.href='/cart'}}> 
          x
        </button>
      </div>
    </>
  );
}