import React, {useEffect, useState, useRef} from "react";
import DisplayCard from "../components/DisplayCard";

export default function Products() {
	const [books, setBooks] = useState([])
	const search = useRef(null)

	useEffect(() => {
		const handleProducts= async() =>{
			const response = await fetch('https://ink-and-wandeev2-be.onrender.com/bookProducts');
			const data = await response.json();
			setBooks(data);
		};
		handleProducts();
	}, [])

	const handleSearch = async (e) => {
		e.preventDefault()
		async function getBooks() {
			const response = await fetch('https://ink-and-wandeev2-be.onrender.com/searchBooks?query='+search.current.value)
			const data = await response.json()

			setBooks(data)
		}
		getBooks()
	}


	return (
		<main className="container">
			<h1 className="title">All Books:</h1>

			<form id="searchContainer" onSubmit={(e) => handleSearch(e)}>
				<h3>Search: </h3>
				<div className="inputContainer">
					<input type="text" name="search" placeholder="Poetry" ref={search}/>
					<button type="submit">Search</button>
				</div>
			</form>

			<div id="productGrid">
				{books.map((book, index) => (
					<DisplayCard
					key={index}
					image={book.cover_img}
					title={book.title}
					author={book.author}
					price={book.retail_price === 'Unavailable' ? book.retail_price : `$${book.retail_price}`}
					genres={book.genre}
					book={book}
				/>
				))}
			</div>
		</main>
	);
}
