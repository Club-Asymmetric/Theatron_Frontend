export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-8 mb-8">
       
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">CREATED BY</p>
              <p className="text-red-600 font-bold">asymmetric</p>
            </div>
          </div>

     
          <div className="text-center">
            <p className="text-red-600 font-bold text-sm mb-1">RESOLUTION × IMMERSE</p>
            <p className="text-gray-500 text-xs">CHENNAI INSTITUTE OF TECHNOLOGY</p>
          </div>

          <div className="text-right">
            <p className="text-gray-500 text-xs">© 2025 THEATRON</p>
          </div>
        </div>

       
        <div className="h-px bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      </div>
    </footer>
  )
}
