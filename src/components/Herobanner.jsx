import React from 'react';
import mary from '../assets/mary.jpg'

const HeroBanner = () => {
  return (
    <section id="heroBanner">
      <div className="details">
        <h4>Top Choice:</h4>
        <h1>Mary: An Awakening of Terror</h1>
        <h4>Nat Cassidy</h4>
        <p>
          "Mary" follows almost 50-year-old Mary who is called home by her aunt from New York.
        </p>
        <button className="homeBtn">
          <a href="/products">View More</a>
        </button>
      </div>
      <div className="image">
        <img src={mary} alt="Mary: An Awakening of Terror cover" />
      </div>
    </section>
  );
};

export default HeroBanner;