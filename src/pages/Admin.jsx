import React, { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import Message from "../components/Message";
import User from "../components/User";


export default function Admin() {
	const [user, setUser] = useState({});
	const [listUsers, setListUsers] = useState([]);
	const [messages, setMessages] = useState([]);
  const seeUsers = useRef(null)
  const seeMessages = useRef(null)
	const [currentTab, setCurrentTab] = useState("messages");

  const switchTab = (tab) => {
    setCurrentTab(tab)
  }

	const getUser = () => {
		const token = localStorage.getItem("token");
		if (token) {
			const decoded = jwtDecode(token);
			setUser(decoded);
		}
	};

	useEffect(() => {
		getUser();

		const getListUsers = async () => {
			const response = await fetch("https://ink-and-wandeev2-be.onrender.com/getAllUsers");
			const data = await response.json();
			setListUsers(data.result);
		};

		const getMessages = async () => {
			const response = await fetch("https://ink-and-wandeev2-be.onrender.com/getMessages");
			const data = await response.json();
			setMessages(data.result);
		};

		getListUsers();
		getMessages();
	}, []);

  useEffect(() => {
    if(currentTab == 'messages') {
      seeMessages.current.classList.add('active')
      seeUsers.current.classList.remove('active')
    } else {
      seeMessages.current.classList.remove('active')
      seeUsers.current.classList.add('active')
    }
  }, [currentTab])

	useEffect(() => {
		if (user.is_admin === "0") {
			alert("You are not authorized to enter this page.");
			window.location.href = "/";
		}
	}, [user]);

  const handleLogout = () => {
		setUser({});
		localStorage.clear();
		window.location.href = "/";
	};

	return (
		<>
			<main className="container">
				<section className="adminContainer">
					<div id="messagesWrapper">
            <div id="messagesWrapperHeader">
              <h1 className="title">Admin Inbox</h1>
              <small ref={seeMessages} onClick={() => switchTab('messages')}>View Messages</small>
              <small ref={seeUsers} onClick={() => switchTab('users')}>View Users</small>
							<button onClick={handleLogout}>Log Out</button>
            </div>
						{currentTab == "messages" ? (
							<div id="messagesList">
								{messages.map((message) => (
									<Message
										name={message.full_name}
										subject={message.subject}
										message={message.message}
									/>
								))}
							</div>
						) : (
							<div id="usersList">
								{listUsers.map((user) => (
									<User
										name={user.full_name}
                    email={user.email}
                    role={user.is_admin == 1 ? 'Admin' : 'User'}
                    user={user}
									/>
								))}
							</div>
						)}
					</div>
				</section>
			</main>
		</>
	);
}
