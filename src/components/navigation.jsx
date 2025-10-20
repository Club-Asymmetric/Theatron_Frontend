"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path) => pathname === path

  return (
    <nav className="fixed top-0 w-full bg-black border-b border-gray-800 z-50">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link href="/" className="bg-red-600 px-4 py-2 font-bold text-white border-2 border-red-600">
          THEATRON
        </Link>

        {/* Menu Items */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm tracking-wider transition ${isActive("/") ? "bg-red-600 px-4 py-2 text-white" : "text-gray-400 hover:text-white"}`}
          >
            HOME
          </Link>
          <Link
            href="/events"
            className={`text-sm tracking-wider transition ${isActive("/events") ? "bg-red-600 px-4 py-2 text-white" : "text-gray-400 hover:text-white"}`}
          >
            EVENTS
          </Link>
          <Link
            href="/registration"
            className={`text-sm tracking-wider transition ${isActive("/registration") ? "text-red-600" : "text-gray-400 hover:text-white"}`}
          >
            REGISTRATION
          </Link>
          <Link
            href="/gallery"
            className={`text-sm tracking-wider transition ${isActive("/gallery") ? "bg-red-600 px-4 py-2 text-white" : "text-gray-400 hover:text-white"}`}
          >
            GALLERY
          </Link>
          <Link
            href="/contact"
            className={`text-sm tracking-wider transition ${isActive("/contact") ? "text-red-600" : "text-gray-400 hover:text-white"}`}
          >
            CONTACT
          </Link>
        </div>

        {/* Auth Buttons */}
       <div className="flex items-center gap-4">
      <Link href="../app/signin/page.jsx">
        <button className="border border-gray-600 px-6 py-2 text-sm text-white hover:border-white transition">
          SIGN IN
        </button>
      </Link>

      <Link href="../app/signup/page.jsx">
        <button className="bg-red-600 px-6 py-2 text-sm text-white font-bold hover:bg-red-700 transition">
          SIGN UP
        </button>
      </Link>
    </div>
      </div>
    </nav>
  )
}
