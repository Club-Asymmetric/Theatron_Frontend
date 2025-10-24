export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8 items-center">

          {/* Created By */}
          <div className="flex items-center gap-4 group">
            
           <div className="flex items-center gap-4 group">
  {/* Icon */}
  
  {/* Text + Logo */}
  <div className="flex flex-col">
    <p className="text-xs text-gray-400 uppercase tracking-widest">Created By</p>
    <img
      src="/Asymmetric_logo.png" // replace with your logo path
      alt="Asymmetric Logo"
      className="w-24 h-auto mt-1"
    />
  </div>
</div>

          </div>

          {/* Center */}
          <div className="text-center">
            <p className="text-red-600 font-bold text-lg mb-1 tracking-wider drop-shadow-md">RESOLUTION × IMMERSE</p>
            <p className="text-gray-400 text-sm uppercase tracking-wide">Chennai Institute of Technology</p>
          </div>

          {/* Right */}
          <div className="text-right">
            <p className="text-gray-500 text-sm">&copy; 2025 THEATRON</p>
          </div>
        </div>

        {/* Gradient Divider */}
        <div className="h-1 rounded-full bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-lg"></div>
      </div>
    </footer>
  );
}
