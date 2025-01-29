import React from "react";
import ProductCard from "../components/ProductCard";
import HeroBanner from "../components/Herobanner";
import Slider from "../components/Slider";
import DisplayCard from "../components/DisplayCard";
import GenreDisplay from "../components/GenreDisplay";

export default function Home() {
	return (
		<>
			<HeroBanner />
			<main>
				<section id="bestSellers" className="bestSellers container">
					<div className="title">
						<h2>Best Sellers</h2>
					</div>
					<div className="cardWrapper">
						<ProductCard
							title="The Fault in Our Stars"
							author="John Green"
							price="$15.00"
							genres="Novel, Young adult literature, Romance novel"
							img="https://books.google.com/books/content?id=UzqVUdEtLDwC&pg=PP1&img=1&zoom=3&hl=en&sig=ACfU3U23l2tzvjh7KQYG81AeNrglUOlXAA&w=1280"
						/>
						<ProductCard
							title="The Spiderwick Chronicles: The Field Guide"
							author="Holly Black & Tony DiTerlizi"
							price="$10.00"
							genres="Fantasy, Juvenile Fiction"
							img="https://a2zscience.com/wp-content/uploads/2023/08/The-Field-Guide-1-The-Spiderwick-Chronicles-by-Sourcebooks.jpeg"
						/>
						<ProductCard
							title="Wicked"
							author="Winnie Holzman"
							price="$28.00"
							genres="Theatre"
							img="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS1ORXpDmy00xzgHOpx19IMA3RvLKhCKij7gkcW2i0K5-LVhb-8"
						/>
					</div>
				</section>

				<Slider />
				<GenreDisplay genre="Young Adult Fiction" />
				<GenreDisplay genre="Juvenile Nonfiction" />
				<GenreDisplay genre="Self-Help" />
				<GenreDisplay genre="Cooking" />
			</main>
		</>
	);
}
