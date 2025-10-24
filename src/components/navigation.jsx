"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()
  const isActive = (path) => pathname === path

  return (
    <nav className="fixed top-0 w-full bg-black border-b border-gray-800 z-50">
      <div className="relative flex items-center justify-between px-10 py-3">

        {/* Left - Theatron Logo */}
        <Link href="/" className="flex items-center h-[50px]">
          <Image
            src="/Theatron_Logo.png"
            alt="Theatron Logo"
            width={150}
            height={50}
            priority
            className="object-contain hover:opacity-90 transition-all duration-300"
          />
        </Link>

        {/* Center - Collaboration Logos (absolutely centered) */}
    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6 h-[50px]">
  <div className="w-[150px]">
    <Image
      src="/Immerse_logo.png"
      alt="Immerse Logo"
      width={150}
      height={50}
      className="object-contain hover:scale-110 transition-transform duration-300"
    />
  </div>
  <span className="text-gray-400 text-lg font-bold">×</span>
  <div className="w-[140px]">
    <Image
      src="/Resolution_logo.png"
      alt="Resolution Logo"
      width={140}
      height={50}
      className="object-contain hover:scale-105 transition-transform duration-300"
    />
  </div>
</div>



        {/* Right - Navigation Links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm tracking-wider font-medium transition ${
              isActive("/") ? "bg-red-600 px-4 py-2 text-white rounded-md" : "text-gray-400 hover:text-white"
            }`}
          >
            HOME
          </Link>
          <Link
            href="/events"
            className={`text-sm tracking-wider font-medium transition ${
              isActive("/events") ? "bg-red-600 px-4 py-2 text-white rounded-md" : "text-gray-400 hover:text-white"
            }`}
          >
            EVENTS
          </Link>
          <Link
            href="/gallery"
            className={`text-sm tracking-wider font-medium transition ${
              isActive("/gallery") ? "bg-red-600 px-4 py-2 text-white rounded-md" : "text-gray-400 hover:text-white"
            }`}
          >
            GALLERY
          </Link>
          <Link
            href="/contact"
            className={`text-sm tracking-wider font-medium transition ${
              isActive("/contact") ? "text-red-600" : "text-gray-400 hover:text-white"
            }`}
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  )
}
