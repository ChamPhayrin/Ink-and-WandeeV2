import React, { useEffect, useState } from 'react';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      title: "Best Fantasy Book",
      subtitle: "A Song of Ice and Fire: Book 1",
      description: "George RR Martin",
      image: "https://www.aiobot.com/wp-content/uploads/2018/07/Adidas-Game-of-Thrones.jpg", // Replace with your image URL
      backgroundColor: "#5b8",
    },
    {
      title: "Best Thriller Book",
      subtitle: "Another Amazing Slide",
      description: "Description for Slide 2",
      image: "https://via.placeholder.com/800x400?text=Slide+2", // Replace with your image URL
      backgroundColor: "#85b",
    },
    {
      title: "Best Meditation Book",
      subtitle: "Yet Another Slide",
      description: "Description for Slide 3",
      image: "https://via.placeholder.com/800x400?text=Slide+3", // Replace with your image URL
      backgroundColor: "#e95",
    },
    {
      title: "Best Biography Book",
      subtitle: "Final Slide",
      description: "Description for Slide 4",
      image: "https://via.placeholder.com/800x400?text=Slide+4", // Replace with your image URL
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
            <img src={slide.image} alt={slide.title} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
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