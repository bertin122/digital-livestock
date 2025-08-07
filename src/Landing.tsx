import React, { useState } from "react";

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
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center justify-start flex-grow-0">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-sm mr-2">
                  🐄
                </div>
                <span className="font-semibold text-gray-800">D-LIVESTOCK</span>
              </div>
            </div>
            <div className="hidden md:flex flex-grow justify-end space-x-8 items-center">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Browse Cattle
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Services
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Contact
              </a>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition duration-200">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

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
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-700 transition duration-200">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Why Choose Our Premium Cattle Marketplace?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Our smart cattle trading platform revolutionizes livestock
                commerce by connecting verified farmers, ranchers, and buyers in
                a secure marketplace. With integrated health tracking, breed
                certification, and transparent pricing, we ensure every
                transaction is safe and reliable. Our platform provides
                real-time market insights, veterinary support, and logistics
                coordination to make cattle trading efficient and trustworthy.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our Expert Cattle Platform simplifies livestock transactions by
                combining advanced verification systems with user-friendly
                tools. We offer comprehensive breed documentation, health
                certificates, transportation coordination, and financing
                options. With GPS tracking for delivery, insurance coverage, and
                24/7 customer support, we provide complete peace of mind for
                both buyers and sellers, making us the premier destination for
                quality cattle trading.
              </p>
            </div>
            <div className="bg-green-50 p-8 rounded-2xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Trusted by 500+ Farmers
                </h3>
                <div className="bg-green-500 text-white px-6 py-3 rounded-full inline-block font-semibold">
                  Start Trading Cattle in Minutes!
                </div>
                <p className="text-green-700 mt-4 font-medium">
                  Your Secure Partner in Livestock Trading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            See How Our Platform Works
          </h2>
          <div className="bg-gray-300 rounded-2xl h-64 flex items-center justify-center mb-8 relative">
            <button className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition duration-200">
              <svg
                className="w-6 h-6 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 5v10l8-5-8-5z" />
              </svg>
            </button>
            <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-50 rounded-2xl opacity-50 flex items-center justify-center">
              <div className="text-8xl opacity-30">🐄</div>
            </div>
          </div>
          <div className="text-left max-w-md">
            <p className="text-gray-600 mb-4">
              "CowMarket transformed my cattle business completely. The platform
              made it so easy to connect with serious buyers, and the health
              verification process gave everyone confidence in the transactions.
              Highly recommended for any cattle trader."
            </p>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                JR
              </div>
              <span className="font-semibold text-gray-800">
                John Rodriguez, Rancher
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Powerful Features for Smart Cattle Trading
            </h2>
          </div>

          <div className="space-y-20">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏥</div>
                  <div className="text-green-700 font-semibold">
                    Health Tracking System
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Smart Health & Breed Verification
                </h3>
                <p className="text-gray-600 mb-6">
                  Our integrated health tracking system monitors cattle
                  wellness, vaccination records, and breed certification. Each
                  animal comes with verified health certificates and genetic
                  documentation, ensuring buyers receive exactly what they
                  expect.
                </p>
                <button className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-200">
                  Learn More
                </button>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Secure Payment & Transportation
                </h3>
                <p className="text-gray-600 mb-6">
                  Protected transactions with escrow services, flexible payment
                  options, and coordinated transportation. Track your cattle
                  delivery in real-time with GPS monitoring and receive
                  insurance coverage for complete peace of mind.
                </p>
                <button className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-200">
                  Learn More
                </button>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl h-64 flex items-center justify-center md:order-1">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚛</div>
                  <div className="text-blue-700 font-semibold">
                    Secure Transport
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <div className="text-purple-700 font-semibold">
                    Market Analytics
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Market Insights & Price Analytics
                </h3>
                <p className="text-gray-600 mb-6">
                  Access real-time market data, price trends, and demand
                  analytics for different cattle breeds. Make informed decisions
                  with comprehensive market reports and expert recommendations
                  tailored to your region.
                </p>
                <button className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-200">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition duration-200">
            View More Success Stories
          </button>
        </div>
      </section>

      {/* User Categories */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl h-32 mb-4 flex items-center justify-center">
                <div className="text-4xl">👨‍🌾</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Small Farmers
              </h3>
              <p className="text-sm text-gray-600">
                Perfect for individual farmers looking to buy or sell cattle
                with verified health records and fair pricing.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl h-32 mb-4 flex items-center justify-center">
                <div className="text-4xl">🏢</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Large Ranches
              </h3>
              <p className="text-sm text-gray-600">
                Bulk trading solutions with enterprise features, dedicated
                support, and custom logistics for large-scale operations.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl h-32 mb-4 flex items-center justify-center">
                <div className="text-4xl">🥩</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Meat Processors
              </h3>
              <p className="text-sm text-gray-600">
                Direct sourcing from verified farms with quality guarantees and
                streamlined procurement processes for processors.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl h-32 mb-4 flex items-center justify-center">
                <div className="text-4xl">🥛</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Dairy Operations
              </h3>
              <p className="text-sm text-gray-600">
                Specialized marketplace for dairy cattle with milk production
                records and genetic lineage tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">PLATFORM</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-green-200">
                    Browse Cattle
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-200">
                    Sell Cattle
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-200">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-200">
                    Trading Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-200">
                    Safety Standards
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">SERVICES</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-green-200">
                    Health Verification
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-200">
                    Transportation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-200">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-200">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-200">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-200">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">CONTACT</h4>
              <ul className="space-y-2 text-sm">
                <li>📞 1-800-COW-TRADE</li>
                <li>📧 support@cowmarket.com</li>
              </ul>
              <div className="mt-6">
                <h5 className="font-semibold mb-2">SOCIAL</h5>
                <div className="flex space-x-2">
                  <a
                    href="#"
                    className="w-8 h-8 bg-green-600 rounded flex items-center justify-center hover:bg-green-500"
                  >
                    <span className="text-xs">f</span>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-green-600 rounded flex items-center justify-center hover:bg-green-500"
                  >
                    <span className="text-xs">t</span>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">MARKETPLACE</h4>
              <p className="text-sm mb-4">
                Join thousands of farmers and ranchers trading premium cattle
                with complete confidence and security on our platform.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-500 transition duration-200">
                Start Trading Today
              </button>
            </div>

            <div>
              <button className="bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-500 transition duration-200 mb-4">
                🐄 List Your Cattle
              </button>
            </div>
          </div>

          <div className="border-t border-green-700 mt-12 pt-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-sm mr-2">
                🐄
              </div>
              <span className="font-semibold">CowMarket</span>
            </div>
            <p className="text-sm text-green-200">
              Connecting farmers, ranchers, and buyers in the most trusted
              cattle marketplace. Quality guaranteed, transactions secured.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CowMarketLandingPage;
