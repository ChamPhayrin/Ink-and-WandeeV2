import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import validator from "validator";
import { jwtDecode } from "jwt-decode";

export default function Contact() {
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate()
  
  const fullname = useRef(null);
  const email = useRef(null);
  const subject = useRef(null);
  const message = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded); // Store decoded user data
    }
  }, []);

  const handleContact = async (e) => {
    e.preventDefault();
    const newErrors = [];
  
    if (!fullname.current.value) {
      newErrors.push("Full name is required");
    }
  
    if (!email.current.value) {
      newErrors.push("Email is required");
    } else if (!validator.isEmail(email.current.value)) {
      newErrors.push("Please enter a valid email address");
    }
  
    if (!subject.current.value) {
      newErrors.push("Subject is required");
    }
  
    if (!message.current.value) {
      newErrors.push("Message is required");
    } else if (message.current.value.length < 10) {
      newErrors.push("Message should be at least 10 characters long");
    }
  
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setErrors([]);
  
    try {
      const response = await fetch('https://ink-and-wandeev2-be.onrender.com/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.user_id || null,
          fullname: fullname.current.value,
          email: email.current.value,
          subject: subject.current.value,
          message: message.current.value,
        }),
      });
  
      const data = await response.json();
      console.log(data)
  
      if (data.error) {
        setErrors([data.error]);
      } else {
        // Navigate to homepage only if there are no errors
        navigate('/');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(['An error occurred while submitting the form.']);
    }
  };

  return (
    <main id="contactPage">
      <h1 id="contactTitle">Contact Us</h1>
      <form id="contactContainer">
        <div className="inputContainer">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            placeholder="e.g John Doe"
            name="name"
            id="name"
            ref={fullname}
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
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            placeholder="e.g Inquiry about a product"
            name="subject"
            id="subject"
            ref={subject}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="message">Your Message</label>
          <textarea
            placeholder="Write your message here"
            name="message"
            id="message"
            rows="5"
            ref={message}
          ></textarea>
        </div>
        
        {/* Error Display */}
        {errors.length > 0 && (
          <div id="errorMessages">
            <ul>
              {errors.map((error, index) => (
                <li key={index} className="error">{error}</li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" onClick={handleContact}>Send Message</button>
        <div id="contactLinks">
          <Link to="/">Back to Home</Link>
        </div>
      </form>
    </main>
  );
}
