"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "HOME", id: "home" },
  { name: "EVENTS", id: "events" },
  { name: "GALLERY", id: "gallery" },
  { name: "CONTACT", id: "contact" },
]

export default function Navigation({ activeSection = "home", onNavigate = null } = {}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const currentSection =
    activeSection ||
    (pathname?.includes("events")
      ? "events"
      : pathname?.includes("contact")
      ? "contact"
      : pathname?.includes("gallery")
      ? "gallery"
      : "home")

  const handleNavigate = (id) => {
    if (onNavigate) {
      onNavigate(id)
    } else {
      if (id === "home") {
        router.push("/")
      } else {
        router.push(`/${id}`)
      }
    }
    setMenuOpen(false)
  }

  return (
    <nav className="theatron-nav" aria-label="Main navigation">
      <div className="theatron-nav-inner">
        <button
          type="button"
          className="theatron-brand cursor-pointer"
          onClick={() => handleNavigate("home")}
          aria-label="Go to Theatron home"
        >
          <Image
            src="/theatron-double-x.png"
            alt="Theatron Double X"
            width={986}
            height={263}
            priority
            className="theatron-brand-logo"
          />
        </button>

        <div className="theatron-collab" aria-label="Immerse and Resolution">
          <div className="theatron-collab-pill">
            <Image
              src="/Immerse_logo.png"
              alt="Immerse"
              width={220}
              height={32}
              className="theatron-collab-immerse"
            />
            <span className="theatron-collab-divider">✕</span>
            <Image
              src="/Resolution_logo.png"
              alt="Resolution"
              width={80}
              height={42}
              className="theatron-collab-resolution"
            />
          </div>
        </div>

        <div className="theatron-desktop-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`theatron-nav-link cursor-pointer ${currentSection === item.id ? "is-active" : ""}`}
              onClick={() => handleNavigate(item.id)}
            >
              <span className="theatron-nav-link-text">{item.name}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="theatron-menu-button cursor-pointer"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {menuOpen && (
        <div className="theatron-mobile-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={`theatron-mobile-link cursor-pointer ${currentSection === item.id ? "is-active" : ""}`}
            >
              <span className="theatron-nav-link-text">{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
