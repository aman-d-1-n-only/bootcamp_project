import React, { useState } from "react";
import { CustomerCard } from "../components/Cards";
import Card1 from "../img/Cards/Card1.png";
import Card2 from "../img/Cards/Card2.png";
import Card3 from "../img/Cards/Card3.png";
import Card4 from "../img/Cards/Card4.png";
import Card5 from "../img/Cards/Card5.png";
import Card6 from "../img/Cards/Card6.png";
import Card7 from "../img/Cards/Card7.png";
import Card8 from "../img/Cards/Card8.png";
import { Nav } from "./Nav";

export const Customer = () => {
  const carouselImages = [Card1, Card2, Card3, Card4, Card5, Card6, Card7, Card8];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {/* <Nav/> */}
      <div className="lg:h-full sm:min-h-screen max-w-full py-8">
        <div className="relative h-96 max-w-xl mx-auto overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full transition-opacity duration-300 ease-in-out"
            style={{
              backgroundImage: `url('${carouselImages[currentImageIndex]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.8,
            }}
          />
          <div className="relative flex items-center justify-center h-full">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white bg-gray-800 bg-opacity-50 rounded-full"
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 text-white bg-gray-800 bg-opacity-50 rounded-full"
              onClick={handleNext}
            >
              Next
            </button>
            <CustomerCard cardName="carousel-card" img={carouselImages[currentImageIndex]} />
          </div>
        </div>
      </div>
    </>
  );
};
