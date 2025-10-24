export default function Sidebar() {
  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40">
      {/* Instagram Icon + hover group */}
      <div className="relative group">
        {/* Main Instagram Icon */}
        <a
          href="#"
          className="bg-red-600 p-3 text-white hover:bg-red-700 transition rounded-full flex justify-center items-center"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
          </svg>
        </a>

        {/* Hover pop-up images */}
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 hidden group-hover:flex flex-col gap-2">
          <a
            href="https://www.instagram.com/immerse_page/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Immerse_logo.png"
              alt="Immerse Instagram"
              className="w-20 h-auto object-contain"
            />
          </a>
          <a
            href="https://www.instagram.com/resolution_page/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Resolution_logo.png"
              alt="Resolution Instagram"
              className="w-20 h-auto object-contain"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
