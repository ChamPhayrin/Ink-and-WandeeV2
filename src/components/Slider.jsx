import React, { useEffect, useState } from 'react';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      title: "Game Of Thrones",
      image: "https://wallpapercave.com/wp/wp2131761.jpg",
      backgroundColor: "#5b8",
    },
    {
      title: "Percy Jackson",
      image: "https://w0.peakpx.com/wallpaper/755/883/HD-wallpaper-percy-jackson-and-the-olympians-2023.jpg", // Replace with your image URL
      backgroundColor: "#85b",
    },
    {
      title: "Hunger Games",
      image: "https://wallpapercave.com/wp/wNjnAvq.jpg", // Replace with your image URL
      backgroundColor: "#e95",
    },
    {
      title: "It Ends with Us",
      image: "https://www.itendswithus.movie/images/share.jpg", // Replace with your image URL
      backgroundColor: "#e59",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="CSSgal">
      <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}vw)` }}>
        {slides.map((slide, index) => (
          <div key={index} style={{ background: slide.backgroundColor, width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
            <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <h1>{slide.title}</h1>
            <h2>{slide.subtitle}</h2>
            <p>{slide.description}</p>
          </div>
        ))}
      </div>

      <div className="prevNext">
        <button onClick={prevSlide}>Previous</button>
        <button onClick={nextSlide}>Next</button>
      </div>

      <div className="bullets">
        {slides.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;