import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";

export default function GenreDisplay(props) {

  const [data, setData] = useState([])

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch('https://ink-and-wandeev2-be.onrender.com/searchBooksByGenre?query=' + props.genre)
      const books = await response.json()

      books.splice(3, (books.length - 4))

      setData(books)
    }

    getBooks()
  }, [])



	return (
		<>
    <section className="genreDisplay">
			<div className="title">
				<h2>#{props.genre}</h2>
			</div>
			<div className="genreWrapper">
        {data.map((book, index) => (
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
      </section>
		</>
	);
}
