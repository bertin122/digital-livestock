import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const CowMarketLandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  // Auto-slide functionality
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-screen w-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: 1 }}
        >
          <img
            src={
              currentSlide === 0
                ? "/src/assets/cattle1.jpg"
                : currentSlide === 1
                ? "/src/assets/cattle2.png"
                : "/src/assets/cattle3.jpg"
            }
            alt={`Cattle ${currentSlide + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-700 to-green-600 opacity-60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Empowering Farmers with
              <br />
              Smart Cattle Trading Solutions.
            </h1>
            <p className="text-xl mb-4 text-green-100">
              Buy and sell premium cattle, track livestock health,
            </p>
            <p className="text-xl mb-8 text-green-100">
              and connect with trusted farmers — all in one platform.
            </p>
            <p className="text-sm mb-8 text-green-200">
              Cattle Trading Made Simple.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-200">
                Browse Cattle
              </button>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CowMarketLandingPage;
