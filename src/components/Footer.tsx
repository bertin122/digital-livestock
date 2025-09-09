import React from "react";

const Footer = () => {
  return (
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
              Join thousands of farmers and ranchers trading premium cattle with
              complete confidence and security on our platform.
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
            Connecting farmers, ranchers, and buyers in the most trusted cattle
            marketplace. Quality guaranteed, transactions secured.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
