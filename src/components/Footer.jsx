import Image from "next/image";

const Footer = () => {
  return (
    <div id="footer" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8 mt-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff6b6b] via-[#ee5a6f] to-[#ff6b6b]"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-[#ff6b6b]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#ee5a6f]/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col text-sm md:text-base gap-y-12 md:flex-row items-center text-center md:text-left md:items-start justify-center md:justify-around px-8">
        {/* LEFT */}
        <div className="flex justify-center items-center md:justify-start md:items-start flex-col gap-6 max-w-md fadeInUp">
          <Image src="/logo.png" alt="logo" width={160} height={50} className="w-32 md:w-40 brightness-0 invert" />
          <p className="text-gray-300 leading-relaxed">
            Delivering happiness one meal at a time. Experience the finest culinary delights with our
            premium food delivery service. Fresh ingredients, expert chefs, and lightning-fast delivery.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-12 h-12 bg-white/10 hover:bg-[#ff6b6b] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <Image src="/facebook_icon.png" alt="facebook" width={20} height={20} className="brightness-0 invert" />
            </a>
            <a href="#" className="w-12 h-12 bg-white/10 hover:bg-[#ff6b6b] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <Image src="/twitter_icon.png" alt="twitter" width={20} height={20} className="brightness-0 invert" />
            </a>
            <a href="#" className="w-12 h-12 bg-white/10 hover:bg-[#ff6b6b] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <Image src="/linkedin_icon.png" alt="linkedin" width={20} height={20} className="brightness-0 invert" />
            </a>
          </div>
        </div>

        {/* CENTER */}
        <div className="flex flex-col gap-4 fadeInUp" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-bold mb-2 gradient-text">COMPANY</h2>
          <a href="#" className="text-gray-300 hover:text-[#ff6b6b] transition-colors duration-300 hover:translate-x-2 inline-block">Home</a>
          <a href="#" className="text-gray-300 hover:text-[#ff6b6b] transition-colors duration-300 hover:translate-x-2 inline-block">About us</a>
          <a href="#" className="text-gray-300 hover:text-[#ff6b6b] transition-colors duration-300 hover:translate-x-2 inline-block">Delivery</a>
          <a href="#" className="text-gray-300 hover:text-[#ff6b6b] transition-colors duration-300 hover:translate-x-2 inline-block">Privacy Policy</a>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-4 fadeInUp" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-2xl font-bold mb-2 gradient-text">GET IN TOUCH</h2>
          <div className="flex items-center gap-3 text-gray-300 hover:text-[#ff6b6b] transition-colors duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <p>+1-212-456-7890</p>
          </div>
          <div className="flex items-center gap-3 text-gray-300 hover:text-[#ff6b6b] transition-colors duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p>contact@tomato.com</p>
          </div>
          <div className="flex items-center gap-3 text-gray-300 hover:text-[#ff6b6b] transition-colors duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p>123 Food Street, NY</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12">
        <div className="w-[90%] mx-auto h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        <p className="text-center text-sm text-gray-400 mt-6">
          Copyright © 2025 Tomato.com - All Rights Reserved. Made with ❤️
        </p>
      </div>
    </div>
  );
};

export default Footer;
