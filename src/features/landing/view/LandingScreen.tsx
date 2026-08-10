import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sevyLogo from '../../../assets/images/sevylogo_trimmed.png';
import notificationIcon from '../../../assets/images/svg/notification.svg';
import arrowDownIcon from '../../../assets/images/svg/arrow_down.svg';
import sevypcImg from '../../../assets/images/png/sevypc1.png';
import iosSevyImg from '../../../assets/images/png/iossevy1.png';
import appleIcon from '../../../assets/images/svg/ios.svg';
import androidIcon from '../../../assets/images/svg/android.svg';
import reviewer1 from '../../../assets/images/femaleprofile.jpeg';
import reviewer2 from '../../../assets/images/maleprofile.jpeg';
import reviewer3 from '../../../assets/images/profile-photo-girl.png';

const slides = [
  {
    id: 1,
    bgImage: '/hero_night_parking.jpg',
    title: 'Experience the road<br/>like never before',
    desc: 'Choose from our premium fleet of luxury and everyday vehicles. Enjoy seamless booking, top-tier comfort, and the ultimate driving experience wherever your journey takes you.',
    btnText: 'View all cars',
    cardTitle: 'Book your car',
    cardFields: ['Car type', 'Place of rental', 'Place of return'],
    hasDates: true,
    cardBtn: 'Book now',
  },
  {
    id: 2,
    bgImage: '/cinematic_driver_single.jpg',
    title: 'Request a chauffeur<br/>to take you home',
    desc: 'Enjoy a safe and comfortable ride home with our professional chauffeurs. Available 24/7 at your convenience.',
    btnText: 'Learn more',
    customRightImage: sevypcImg,
  }
];

const Landing: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white font-sans overflow-x-hidden">
      
      {/* Navbar */}
      <header className="w-full bg-white border-b border-gray-100 shadow-sm relative z-20 min-h-[70px] md:min-h-[100px] flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-3 md:py-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 md:gap-3">
              <img src={sevyLogo} alt="Sevy Mobility Logo" className="h-8 md:h-10 w-auto object-contain rounded-md" />
              <h1 className="hidden sm:block text-xl md:text-2xl font-extrabold tracking-tight text-[#006B5E]">Sevy Mobility</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/signin" className="text-gray-700 font-bold hover:text-[#006B5E] transition px-2 md:px-4 py-2 text-[13px] md:text-base whitespace-nowrap">
              Sign In
            </Link>
            <Link to="/signup" className="bg-[#006B5E] text-white font-bold px-4 md:px-6 py-2 md:py-3 rounded-xl hover:bg-[#005548] transition shadow-md text-[13px] md:text-base whitespace-nowrap">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Carousel */}
      <main className="w-full relative overflow-hidden min-h-[450px] md:min-h-[540px] bg-black">
        
        {slides.map((s, index) => (
          <div 
            key={s.id}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat flex flex-col md:flex-row items-center justify-center md:gap-20 px-6 md:px-20 py-10 md:py-10 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            style={{ backgroundImage: `url(${s.bgImage})` }}
          >
            {/* Overlay for text readability against the background */}
            <div className="absolute inset-0 bg-black/60 md:bg-black/50 pointer-events-none"></div>
            
            {/* Left-Aligned Text Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center md:items-start text-center md:text-left text-white max-w-[540px] mt-8 md:mt-0 px-4 md:px-0">
              <h2 
                className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] md:leading-[1.05] mb-4 md:mb-6 tracking-tight drop-shadow-xl"
                dangerouslySetInnerHTML={{ __html: s.title }}
              />
              <p className="text-white/90 text-sm md:text-xl leading-relaxed mb-8 md:mb-10 font-light drop-shadow-md">
                {s.desc}
              </p>
              <button className="bg-[#006B5E] hover:bg-[#005548] text-white font-bold py-3.5 md:py-4 px-8 md:px-12 rounded-xl transition-transform hover:scale-105 shadow-xl text-[15px] md:text-lg">
                {s.btnText}
              </button>
            </div>

            {/* Right Content - Booking Card or Custom Image (Hidden on mobile) */}
            {s.customRightImage ? (
              <div className="hidden md:flex relative z-10 w-full max-w-[480px] justify-center drop-shadow-2xl mt-8 md:mt-0">
                <img 
                  src={s.customRightImage} 
                  alt="App interface preview" 
                  className="w-full h-auto object-contain" 
                />
              </div>
            ) : (
              <div className="hidden md:block relative z-10 w-full max-w-[380px] bg-white rounded-3xl p-6 md:p-7 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{s.cardTitle}</h3>
                
                <div className="flex flex-col gap-3">
                  
                  <div className="relative">
                    <select className="w-full bg-[#F8F9FA] text-gray-700 text-sm font-medium py-3 px-4 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-[#006B5E] transition-all cursor-pointer">
                      <option>{s.cardFields?.[0]}</option>
                    </select>
                    <img src={arrowDownIcon} alt="" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-50" />
                  </div>
                  
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder={s.cardFields?.[1]}
                      className="w-full bg-[#F8F9FA] text-gray-900 text-sm font-medium py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-[#006B5E] transition-all"
                    />
                  </div>

                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder={s.cardFields?.[2]}
                      className="w-full bg-[#F8F9FA] text-gray-900 text-sm font-medium py-3 px-4 rounded-xl outline-none focus:ring-2 focus:ring-[#006B5E] transition-all"
                    />
                  </div>
                  
                  {s.hasDates && (
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <input type="text" placeholder="Pick up date" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} className="w-full bg-[#F8F9FA] text-gray-900 text-[13px] font-medium py-3 px-3 rounded-xl outline-none focus:ring-2 focus:ring-[#006B5E] transition-all" />
                      </div>
                      <div className="relative flex-1">
                        <input type="text" placeholder="Return date" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} className="w-full bg-[#F8F9FA] text-gray-900 text-[13px] font-medium py-3 px-3 rounded-xl outline-none focus:ring-2 focus:ring-[#006B5E] transition-all" />
                      </div>
                    </div>
                  )}

                  <button className="w-full bg-[#006B5E] hover:bg-[#005548] text-white font-bold py-3.5 rounded-xl transition-colors mt-2 text-[15px] shadow-md">
                    {s.cardBtn}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentSlide === idx 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </main>

      {/* Features Section */}
      <section className="w-full max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-28">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          {/* Left Column - Image Placeholder */}
          <div className="w-full lg:w-1/2">
            <div className="w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-blue-300 via-gray-400 to-blue-900 shadow-xl overflow-hidden">
              {/* Image will go here, currently using a placeholder gradient to match screenshot */}
            </div>
          </div>

          {/* Right Column - Numbered List */}
          <div className="w-full lg:w-1/2 flex flex-col gap-10">
            
            {/* Item 1 */}
            <div className="flex gap-5">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#006B5E] text-white flex items-center justify-center font-bold text-sm mt-0.5 shadow-sm">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Are you a driver? Register an account</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  Sign up today and start earning on your own schedule. We provide the platform, you provide the service.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-5">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#006B5E] text-white flex items-center justify-center font-bold text-sm mt-0.5 shadow-sm">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Are you a driver? Let's connect</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  Join our growing network of professional drivers. Benefit from reliable rides, clear earnings, and dedicated support.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex gap-5">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#006B5E] text-white flex items-center justify-center font-bold text-sm mt-0.5 shadow-sm">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Do you have a company?</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  Partner with us to manage your fleet efficiently. Streamline your operations and reach more customers with our enterprise solutions.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex gap-5">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#006B5E] text-white flex items-center justify-center font-bold text-sm mt-0.5 shadow-sm">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Do you own a hotel?</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  Provide your guests with premium, seamless transportation. Set up reliable airport transfers and city tours directly from your concierge.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Facts In Numbers Section */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 mt-10 md:mt-16 mb-12 md:mb-20">
        <section className="w-full bg-[#006B5E] relative overflow-hidden py-12 md:py-20 rounded-2xl md:rounded-[32px] shadow-2xl">
          
          {/* Background silhouette/overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-b from-transparent to-black/40"></div>
          </div>

          <div className="relative z-10 px-4 lg:px-12 flex flex-col items-center text-center">
          
          <h2 className="text-3xl md:text-[44px] font-extrabold text-white mb-4 md:mb-6">Facts In Numbers</h2>
          <p className="text-white/80 max-w-2xl text-[14px] md:text-[16px] leading-relaxed mb-10 md:mb-16">
            We're proud of our growing community and our commitment to providing top-tier mobility solutions. Join thousands of satisfied customers who trust Sevy.
          </p>

          <div className="flex flex-wrap justify-between gap-4 md:gap-6 w-full mt-2">
            
            {/* Card 1 */}
            <div className="bg-white rounded-[18px] py-4 px-5 flex items-center gap-4 shadow-lg transform transition-transform hover:-translate-y-1 w-full sm:w-auto sm:min-w-[220px]">
              <div className="w-14 h-14 rounded-xl bg-[#006B5E] text-white flex items-center justify-center shrink-0">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 14l1.5-4.5A2 2 0 016.4 8h11.2a2 2 0 011.9 1.5L21 14m-18 0h18m-18 0v4a2 2 0 002 2h14a2 2 0 002-2v-4M7 16h2M15 16h2" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="text-[22px] font-extrabold text-gray-900 leading-tight">540+</h4>
                <p className="text-gray-600 font-semibold text-sm mt-0.5">Cars</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[18px] py-4 px-5 flex items-center gap-4 shadow-lg transform transition-transform hover:-translate-y-1 w-full sm:w-auto sm:min-w-[220px]">
              <div className="w-14 h-14 rounded-xl bg-[#006B5E] text-white flex items-center justify-center shrink-0">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="text-[22px] font-extrabold text-gray-900 leading-tight">20k+</h4>
                <p className="text-gray-600 font-semibold text-sm mt-0.5">Customers</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[18px] py-4 px-5 flex items-center gap-4 shadow-lg transform transition-transform hover:-translate-y-1 w-full sm:w-auto sm:min-w-[220px]">
              <div className="w-14 h-14 rounded-xl bg-[#006B5E] text-white flex items-center justify-center shrink-0">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="text-[22px] font-extrabold text-gray-900 leading-tight">25+</h4>
                <p className="text-gray-600 font-semibold text-sm mt-0.5">Years</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-[18px] py-4 px-5 flex items-center gap-4 shadow-lg transform transition-transform hover:-translate-y-1 w-full sm:w-auto sm:min-w-[220px]">
              <div className="w-14 h-14 rounded-xl bg-[#006B5E] text-white flex items-center justify-center shrink-0">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="text-[22px] font-extrabold text-gray-900 leading-tight">20m+</h4>
                <p className="text-gray-600 font-semibold text-sm mt-0.5">Miles</p>
              </div>
            </div>

          </div>
          </div>
        </section>
      </div>

      {/* Download App Section */}
      <section className="w-full max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-20 mt-6 md:mt-10 mb-12 md:mb-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-3xl md:text-[48px] font-extrabold text-gray-900 leading-[1.1] mb-4 md:mb-6">
            Download<br />mobile app
          </h2>
          <p className="text-gray-500 leading-relaxed text-[15px] md:text-[16px] mb-8 md:mb-10 max-w-md">
            Get the Sevy app today to book rides effortlessly, track your driver in real-time, and manage your trips all in one place. Available on iOS and Android.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-black text-white rounded-xl px-5 py-3 flex items-center gap-3 hover:bg-gray-800 transition-colors shadow-lg">
              <img src={appleIcon} alt="Apple Icon" className="w-8 h-8" />
              <div className="text-left flex flex-col">
                <span className="text-[10px] leading-none mb-1 text-gray-300">Download on the</span>
                <span className="text-[20px] font-bold leading-none tracking-tight">App Store</span>
              </div>
            </button>
            <button className="bg-black text-white rounded-xl px-5 py-3 flex items-center gap-3 hover:bg-gray-800 transition-colors shadow-lg">
              <img src={androidIcon} alt="Android Icon" className="w-7 h-7" />
              <div className="text-left flex flex-col">
                <span className="text-[10px] leading-none mb-1 text-gray-300">GET IT ON</span>
                <span className="text-[20px] font-bold leading-none tracking-tight">Google Play</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Content - Phone Mockups */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative mt-10 lg:mt-0">
          <div className="relative w-full max-w-[450px]">
            {/* Back Image (dictates container height) */}
            <img 
              src={iosSevyImg} 
              alt="Sevy App Background" 
              className="w-[75%] ml-auto h-auto object-contain drop-shadow-2xl opacity-90 -translate-y-6 lg:-translate-y-12"
            />
            {/* Front Image (absolutely positioned relative to container) */}
            <img 
              src={iosSevyImg} 
              alt="Sevy App on iPhone" 
              className="absolute left-0 bottom-0 w-[80%] h-auto object-contain drop-shadow-2xl z-10 translate-y-6 lg:translate-y-12"
            />
          </div>
        </div>

      </section>

      {/* Reviews Section */}
      <section className="w-full max-w-[1400px] mx-auto px-4 md:px-6 mb-16 md:mb-24 py-6 md:py-10 mt-6 md:mt-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-10 md:mb-16 text-gray-900 tracking-tight">
          Reviews from our customers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Review Card 1 */}
          <div className="flex flex-col rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow bg-gray-50">
            {/* Top Half */}
            <div className="p-10 pb-16 flex flex-col items-center text-center relative min-h-[250px]">
              <span className="text-[#006B5E] text-8xl font-serif absolute top-4 left-6 leading-none">“</span>
              <p className="text-gray-800 font-medium text-[16px] leading-relaxed mt-10 relative z-10">
                Et aliquet netus at sapien pellentesque mollis nec dignissim maecenas. Amet erat volutpat quisque odio purus feugiat. In gravida neque
              </p>
            </div>
            {/* Bottom Half */}
            <div className="bg-[#006B5E] pt-12 pb-10 px-6 flex flex-col items-center text-center relative mt-auto">
              {/* Profile Image */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full overflow-hidden bg-gray-200 drop-shadow-md">
                <img src={reviewer1} alt="Emanuel Boyle" className="w-full h-full object-cover" />
              </div>
              <span className="text-teal-200/80 text-sm font-medium mb-1">Kuphal LLC</span>
              <span className="text-white font-bold text-lg">Emanuel Boyle</span>
            </div>
          </div>

          {/* Review Card 2 */}
          <div className="flex flex-col rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow bg-gray-50">
            {/* Top Half */}
            <div className="p-10 pb-16 flex flex-col items-center text-center relative min-h-[250px]">
              <span className="text-[#006B5E] text-8xl font-serif absolute top-4 left-6 leading-none">“</span>
              <p className="text-gray-800 font-medium text-[16px] leading-relaxed mt-10 relative z-10">
                Purus consectetur varius quis urna phasellus enim mattis. Sem tincidunt tortor nunc egestas amet adipiscing ligula
              </p>
            </div>
            {/* Bottom Half */}
            <div className="bg-[#006B5E] pt-12 pb-10 px-6 flex flex-col items-center text-center relative mt-auto">
              {/* Profile Image */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full overflow-hidden bg-gray-200 drop-shadow-md">
                <img src={reviewer2} alt="River Graves" className="w-full h-full object-cover" />
              </div>
              <span className="text-teal-200/80 text-sm font-medium mb-1">Glover - Orn</span>
              <span className="text-white font-bold text-lg">River Graves</span>
            </div>
          </div>

          {/* Review Card 3 */}
          <div className="flex flex-col rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow bg-gray-50">
            {/* Top Half */}
            <div className="p-10 pb-16 flex flex-col items-center text-center relative min-h-[250px]">
              <span className="text-[#006B5E] text-8xl font-serif absolute top-4 left-6 leading-none">“</span>
              <p className="text-gray-800 font-medium text-[16px] leading-relaxed mt-10 relative z-10">
                Quam neque odio urna euismod felis. Sit egestas magna in quisque famesdapibus quis sapien magna. Nisl non eget sit pellentesque tristique et
              </p>
            </div>
            {/* Bottom Half */}
            <div className="bg-[#006B5E] pt-12 pb-10 px-6 flex flex-col items-center text-center relative mt-auto">
              {/* Profile Image */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full overflow-hidden bg-gray-200 drop-shadow-md">
                <img src={reviewer3} alt="Ryder Malone" className="w-full h-full object-cover" />
              </div>
              <span className="text-teal-200/80 text-sm font-medium mb-1">Haag LLC</span>
              <span className="text-white font-bold text-lg">Ryder Malone</span>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-[#006B5E] text-white py-20 mt-auto">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-12 mb-16">
            
            {/* Column 1: Brand & App Buttons (Takes 5 columns) */}
            <div className="flex flex-col items-start xl:col-span-5 pr-4">
              <h2 className="text-4xl font-extrabold mb-6 tracking-tight">Sevy</h2>
              <p className="text-teal-50 leading-relaxed text-[16px] max-w-md mb-10">
                Your premium mobility partner. We connect you with top-tier drivers for safe, reliable, and comfortable rides across the city. Experience the ultimate journey today.
              </p>
              {/* App Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="bg-black text-white rounded-xl px-5 py-3 flex items-center gap-3 hover:bg-gray-800 transition-colors shadow-lg">
                  <img src={appleIcon} alt="Apple Icon" className="w-7 h-7" />
                  <div className="text-left flex flex-col">
                    <span className="text-[10px] leading-none mb-1 text-gray-300 uppercase tracking-wider">Download on the</span>
                    <span className="text-[16px] font-bold leading-none tracking-tight">App Store</span>
                  </div>
                </button>
                <button className="bg-black text-white rounded-xl px-5 py-3 flex items-center gap-3 hover:bg-gray-800 transition-colors shadow-lg">
                  <img src={androidIcon} alt="Android Icon" className="w-6 h-6" />
                  <div className="text-left flex flex-col">
                    <span className="text-[10px] leading-none mb-1 text-gray-300 uppercase tracking-wider">Get it on</span>
                    <span className="text-[16px] font-bold leading-none tracking-tight">Google Play</span>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Column 2: Company */}
            <div className="flex flex-col items-start xl:col-span-2">
              <h3 className="text-sm font-bold mb-6 text-white uppercase tracking-widest opacity-80">Company</h3>
              <ul className="space-y-4 text-teal-100 text-[15px] font-medium">
                <li><a href="#" className="hover:text-white hover:underline transition-all">About Us</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Careers</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Blog</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Press & Media</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Contact</a></li>
              </ul>
            </div>
            
            {/* Column 3: Services */}
            <div className="flex flex-col items-start xl:col-span-2">
              <h3 className="text-sm font-bold mb-6 text-white uppercase tracking-widest opacity-80">Services</h3>
              <ul className="space-y-4 text-teal-100 text-[15px] font-medium">
                <li><a href="#" className="hover:text-white hover:underline transition-all">Ride with Sevy</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Drive for Sevy</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Airports</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Cities</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Business Solutions</a></li>
              </ul>
            </div>
            
            {/* Column 4: Legal & Social */}
            <div className="flex flex-col items-start xl:col-span-3">
              <h3 className="text-sm font-bold mb-6 text-white uppercase tracking-widest opacity-80">Legal</h3>
              <ul className="space-y-4 text-teal-100 text-[15px] font-medium mb-10">
                <li><a href="#" className="hover:text-white hover:underline transition-all">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Cookie Policy</a></li>
              </ul>
              
              <h3 className="text-sm font-bold mb-5 text-white uppercase tracking-widest opacity-80">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all hover:-translate-y-1">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all hover:-translate-y-1">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all hover:-translate-y-1">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
            
          </div>
          
          {/* Copyright Row */}
          <div className="pt-8 border-t border-[#005248] flex flex-col md:flex-row justify-between items-center text-teal-200 text-sm">
            <p>&copy; {new Date().getFullYear()} Sevy Mobility. All rights reserved.</p>
            <div className="flex items-center gap-8 mt-6 md:mt-0">
               <a href="#" className="hover:text-white transition-colors">Support</a>
               <a href="#" className="hover:text-white transition-colors">Help Center</a>
               <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};


export default Landing;
