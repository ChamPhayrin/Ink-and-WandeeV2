import React from "react";

export default function Message(props) {
	const emailAddress = "youremail@example.com";

	return (
		<div className="message">
			<div className="messageHeader">
				<h4 className="messageName">{props.name}</h4>
				<h5 className="messageSubject">{props.subject}</h5>
			</div>
			<p className="messageContent">{props.message}</p>
			<a
				href={`mailto:${emailAddress}?subject=Re:${props.subject}`}
				className="emailButton"
			>
				Email Back
			</a>
		</div>
	);
}
