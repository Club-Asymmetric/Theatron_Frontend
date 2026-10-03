"use client"

import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "HOME", id: "home" },
  { name: "EVENTS", id: "events" },
  { name: "GALLERY", id: "gallery" },
  { name: "CONTACT", id: "contact" },
]

export default function Navigation({ activeSection, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavigate = (id) => {
    onNavigate?.(id)
    setMenuOpen(false)
  }

  return (
    <nav className="theatron-nav" aria-label="Main navigation">
      <div className="theatron-nav-inner">
        <button
          type="button"
          className="theatron-brand"
          onClick={() => handleNavigate("home")}
          aria-label="Go to Theatron home"
        >
          <Image
            src="/Theatron_Logo.png"
            alt="Theatron"
            width={150}
            height={50}
            priority
            className="theatron-brand-logo"
          />
        </button>

        <div className="theatron-collab" aria-label="Immerse and Resolution">
          <Image src="/Immerse_logo.png" alt="Immerse" width={150} height={50} />
          <span>×</span>
          <Image src="/Resolution_logo.png" alt="Resolution" width={100} height={40} />
        </div>

        <div className="theatron-desktop-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`theatron-nav-link ${activeSection === item.id ? "is-active" : ""}`}
              onClick={() => handleNavigate(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="theatron-menu-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {menuOpen && (
        <div className="theatron-mobile-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={`theatron-mobile-link ${activeSection === item.id ? "is-active" : ""}`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
