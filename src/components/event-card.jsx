import Link from "next/link"

export default function EventCard({ title, description, entryFee, image, highlighted = false, registrationPath }) {
  return (
    <div
      className={`group cursor-pointer transition ${highlighted ? "border-2 border-red-600" : "border border-gray-700"}`}
    >
  
      <div className="relative h-64 overflow-hidden bg-gray-900">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-6 bg-black">
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">{description}</p>

    
        <div className="h-px bg-red-600 mb-4"></div>

    
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">ENTRY FEE</p>
            <p className="text-red-600 font-bold text-lg">{entryFee}</p>
          </div>
          <Link href={registrationPath || "/registration"}>
            <button className="bg-red-600 px-6 py-2 text-white font-bold text-sm hover:bg-red-700 transition">
              REGISTER →
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
