import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "United States (US)",
    subject: "",
    message: "",
    agreeToTerms: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert("Please agree to the Terms & Conditions");
      return;
    }
    alert("Thank you for your message! We'll get back to you soon.");
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "United States (US)",
      subject: "",
      message: "",
      agreeToTerms: false,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-sm mr-2">
                  🐄
                </div>
                <span className="font-semibold text-gray-800">CowMarket</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
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
                  className="text-green-600 hover:text-green-700 font-medium border-b-2 border-green-600"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition duration-200">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Left Side - Contact Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16">
          <div className="max-w-lg">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              READY TO WORK WITH US
            </h1>
            <p className="text-gray-600 mb-8">
              Contact us for all your cattle trading questions and opportunities
            </p>

            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500 transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500 transition duration-200"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500 transition duration-200"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Phone Number <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500 transition duration-200"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500 transition duration-200 bg-white"
                >
                  <option value="United States (US)">United States (US)</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Brazil">Brazil</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Subject <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500 transition duration-200"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your cattle trading needs, e.g. specific breed requirements, quantity, location preferences..."
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500 transition duration-200 resize-vertical"
                ></textarea>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-600">
                  I want to receive cattle market updates and trading
                  opportunities. By submitting, I'm agreed to the{" "}
                  <a href="#" className="text-green-600 hover:underline">
                    Terms & Conditions
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded transition duration-200 uppercase tracking-wide"
              >
                SEND MESSAGE
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Information & Image */}
        <div className="hidden lg:block lg:w-1/2 bg-gray-100">
          <div className="h-full flex flex-col">
            {/* Contact Information */}
            <div className="bg-gray-200 p-8">
              {/* US Office */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">
                  UNITED STATES (HEAD QUARTER)
                </h3>
                <div className="space-y-1 text-sm text-gray-800">
                  <p>152 Ranch Road St, Farm City, TX 10463, US</p>
                  <p>(+1) 800 COW TRADE</p>
                  <p>
                    <a
                      href="mailto:hello@cowmarket.com"
                      className="text-green-600 hover:underline"
                    >
                      hello@cowmarket.com
                    </a>
                  </p>
                </div>
              </div>

              {/* UK Office */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">
                  UNITED KINGDOM (BRANCH)
                </h3>
                <div className="space-y-1 text-sm text-gray-800">
                  <p>12 Countryside Rd, Rural County, RC3 4TY, UK</p>
                  <p>(+44) 208 123 4567</p>
                  <p>
                    <a
                      href="mailto:contact@cowmarket.co.uk"
                      className="text-green-600 hover:underline"
                    >
                      contact@cowmarket.co.uk
                    </a>
                  </p>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition duration-200"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition duration-200"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition duration-200"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition duration-200"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition duration-200"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.402-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.283-.744 2.845-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Image Section */}
            <div className="flex-1 relative bg-black">
              <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-800 to-gray-900 opacity-80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-8xl mb-4 opacity-50">🐄</div>
                  <h3 className="text-2xl font-bold mb-2">
                    Premium Cattle Trading
                  </h3>
                  <p className="text-gray-300">
                    Connect with trusted farmers and
                    <br />
                    find the perfect cattle for your needs
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
