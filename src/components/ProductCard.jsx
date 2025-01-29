import React from "react";

export default function ProductCard(props) {
	return (
		<div className="card">
			<div className="cardImg">
				<img src={`${props.img}`} />
			</div>
			<div className="cardDescription">
				<h2>{props.title}</h2>
				<h4>{props.author}</h4>
				<p>{props.genres}</p>
				<h1>{props.price}</h1>
				<div className="cardBtns">
				</div>
			</div>
		</div>
	);
}
