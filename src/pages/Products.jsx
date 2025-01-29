import React, { useEffect, useState, useRef } from "react";
import DisplayCard from "../components/DisplayCard";

export default function Products() {
	const [books, setBooks] = useState([]);
	const [filteredBooks, setFilteredBooks] = useState([]);
	const [priceFilter, setPriceFilter] = useState("all"); // "all", "lessThan10", "above10"
	const [sortCriteria, setSortCriteria] = useState("title-asc"); // "title-asc", "title-desc", "price-asc", "price-desc"
	const search = useRef(null);

	useEffect(() => {
		const handleProducts = async () => {
			const response = await fetch('https://ink-and-wandeev2-be.onrender.com/bookProducts');
			const data = await response.json();
			setBooks(data);
			setFilteredBooks(data);
		};
		handleProducts();
	}, []);

	useEffect(() => {
		applyFiltersAndSort();
	}, [books, priceFilter, sortCriteria]);

	const handleSearch = async (e) => {
		e.preventDefault();
		const response = await fetch('https://ink-and-wandeev2-be.onrender.com/searchBooks?query=' + search.current.value);
		const data = await response.json();
		setBooks(data);
	};

	const applyFiltersAndSort = () => {
		let filtered = books.filter(book => {
			const price = parseFloat(book.retail_price);

			// Price filter
			const meetsPriceFilter =
				priceFilter === "all" ||
				(priceFilter === "lessThan10" && price < 10) ||
				(priceFilter === "above10" && price >= 10);

			return meetsPriceFilter;
		});

		// Sorting
		filtered.sort((a, b) => {
			switch (sortCriteria) {
				case "title-asc":
					return a.title.localeCompare(b.title);
				case "title-desc":
					return b.title.localeCompare(a.title);
				case "price-asc":
					return parseFloat(a.retail_price) - parseFloat(b.retail_price);
				case "price-desc":
					return parseFloat(b.retail_price) - parseFloat(a.retail_price);
				default:
					return 0;
			}
		});

		setFilteredBooks(filtered);
	};

	const handlePriceFilterChange = (e) => setPriceFilter(e.target.value);
	const handleSortChange = (e) => setSortCriteria(e.target.value);

	return (
		<main className="container">
			<h1 className="title">All Books:</h1>

			<form id="searchContainer" onSubmit={handleSearch}>
				<h3>Search: </h3>
				<div className="inputContainer">
					<input type="text" name="search" placeholder="Poetry" ref={search} />
					<button type="submit">Search</button>
				</div>
			</form>
			<section id="filterSort">
			<div id="filters">
				<h3>Filters:</h3>
				<div>
					<select value={priceFilter} onChange={handlePriceFilterChange}>
						<option value="all">All Prices</option>
						<option value="lessThan10">Less than $10</option>
						<option value="above10">$10 and above</option>
					</select>
				</div>
				<div>
				</div>
			</div>

			<div id="sort">
				<h3>Sort By: </h3>
				<select value={sortCriteria} onChange={handleSortChange}>
					<option value="title-asc">Title (A-Z)</option>
					<option value="title-desc">Title (Z-A)</option>
					<option value="price-asc">Price (Low to High)</option>
					<option value="price-desc">Price (High to Low)</option>
				</select>
			</div>
			</section>

			<div id="productGrid">
				{filteredBooks.length > 0 ? (
					filteredBooks.map((book, index) => (
						<DisplayCard
							key={index}
							image={book.cover_img}
							title={book.title}
							author={book.author}
							price={book.retail_price === 'Unavailable' ? book.retail_price : `$${book.retail_price}`}
							genres={book.genre} // Ensure genres is always an array
							book={book}
						/>
					))
				) : (
					<p className="no-results">No matching results found.</p>
				)}
			</div>
		</main>
	);
}