import Link from "next/link"
import Image from "next/image"

export default function EventCard({ title, description, entryFee, image, highlighted = false, registrationPath }) {
  return (
    <div
      className={`group cursor-pointer transition ${highlighted ? "border-2 border-red-600" : "border border-gray-700"}`}
    >
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-900">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={highlighted}
        />
      </div>

      <div className="p-4 sm:p-5 md:p-6 bg-black">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 md:mb-3">{title}</h3>
        <p className="text-gray-400 text-xs sm:text-sm mb-3 md:mb-4 leading-relaxed">{description}</p>

        <div className="h-px bg-red-600 mb-3 md:mb-4"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <p className="text-xs text-gray-500 mb-1">ENTRY FEE</p>
            <p className="text-red-600 font-bold text-base md:text-lg">{entryFee}</p>
          </div>
          <Link href={registrationPath || "/registration"}>
            <button className="bg-red-600 px-4 sm:px-6 py-2 text-white font-bold text-xs sm:text-sm hover:bg-red-700 transition w-full sm:w-auto">
              REGISTER →
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
