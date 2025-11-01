export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-6 md:py-12 px-4 md:px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8 items-center">

          {/* Created By */}
          <div className="flex items-center gap-4 group justify-center md:justify-start">
            
           <div className="flex items-center gap-3 md:gap-4 group">
  {/* Icon */}
  
  {/* Text + Logo */}
  <div className="flex flex-col">
    <p className="text-xs text-gray-400 uppercase tracking-widest">Created By</p>
    <img
      src="/Asymmetric_logo.png"
      alt="Asymmetric Logo"
      className="w-20 sm:w-24 h-auto mt-1"
    />
  </div>
</div>

          </div>

          {/* Center */}
          <div className="text-center">
            <p className="text-red-600 font-bold text-base md:text-lg mb-1 tracking-wider drop-shadow-md">RESOLUTION × IMMERSE</p>
            <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wide">Chennai Institute of Technology</p>
          </div>

          {/* Right */}
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-xs md:text-sm">&copy; 2025 THEATRON</p>
          </div>
        </div>

        {/* Gradient Divider */}
        <div className="h-0.5 md:h-1 rounded-full bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-lg"></div>
      </div>
    </footer>
  );
}
