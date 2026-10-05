"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import Countdown from "@/components/countdown"
import Gallery from "@/components/gallery"
import EventsSection from "@/components/events-section"
import ContactSection from "@/components/contact-section"
import CinematicIntro from "@/components/cinematic-intro"
import { ArrowRight, Play, CalendarDays } from "lucide-react"

const sections = ["home", "events", "gallery", "contact"]

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [introState, setIntroState] = useState("INTRO_PLAYING")
  const [activeSection, setActiveSection] = useState("home")

  const goTo = (id) => setActiveSection(id)

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        const current = sections.indexOf(activeSection)
        goTo(sections[Math.min(current + 1, sections.length - 1)])
      }
      if (event.key === "ArrowLeft") {
        const current = sections.indexOf(activeSection)
        goTo(sections[Math.max(current - 1, 0)])
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [activeSection])

  const isIntroZooming = introState === "INTRO_ENTERING_SCREEN" || introState === "INTRO_REVEALING_HOME"

  return (
    <main className="theatron-site relative min-h-screen bg-black text-white selection:bg-red-800 selection:text-white">
      {/* Cinematic Intro with Tailwind CSS & TypeScript */}
      {showIntro && (
        <CinematicIntro
          onStateChange={setIntroState}
          onComplete={() => {
            setShowIntro(false)
            setIntroState("INTRO_COMPLETE")
          }}
        />
      )}

      <Navigation activeSection={activeSection} onNavigate={goTo} />

      {/* Main Page Container: Emerges seamlessly with Tailwind CSS transitions */}
      <div
        className={`theatron-screen w-full transition-all duration-1000 ease-out ${
          showIntro && isIntroZooming
            ? "scale-[0.98] blur-[1px] opacity-95"
            : "scale-100 blur-none opacity-100"
        }`}
      >
        {activeSection === "home" && (
          <section className="theatron-hero" id="home" aria-label="Theatron 2026">
            <div className="theatron-hero-image" />
            <div className="theatron-hero-vignette" />
            <div className="theatron-hero-grain" />

            <div className="theatron-hero-content">
              <h1 className="theatron-title">THEATRON</h1>
              <p className="theatron-year">2026</p>

              <div className="theatron-tagline">
                <span />
                <p>Where stories come alive.</p>
              </div>

              <p className="theatron-description">
                YOUR SHOW BEGINS IN<br />
              </p>

              <div className="theatron-countdown-wrap">
                <Countdown />
              </div>

              <div className="theatron-actions">
                <button type="button" onClick={() => goTo("events")} className="theatron-button theatron-button-primary cursor-pointer">
                  <span>EXPLORE EVENTS</span>
                  <ArrowRight size={18} />
                </button>
                <button type="button" onClick={() => goTo("gallery")} className="theatron-button theatron-button-secondary cursor-pointer">
                  <Play size={16} />
                  <span>WATCH TRAILER</span>
                </button>
              </div>

              <div className="theatron-date-note">
                <CalendarDays size={16} />
                <span>Dates to be announced</span>
              </div>
            </div>

            <Sidebar />

            <div className="theatron-venue">
              <span>A THEATRE &amp; CINEMA EXPERIENCE</span>
              <span>CHENNAI INSTITUTE OF TECHNOLOGY</span>
            </div>

            <div className="theatron-progress" aria-hidden="true">
              <span>01</span>
              <i />
              <span>06</span>
            </div>
          </section>
        )}

        {/* Events Page from GitHub Repo */}
        {activeSection === "events" && (
          <div className="min-h-screen">
            <Sidebar />
            <EventsSection />
            <Footer />
          </div>
        )}

        {/* Gallery */}
        {activeSection === "gallery" && (
          <section className="gallery-screen" id="gallery">
            <Gallery />
            <Footer />
          </section>
        )}

        {/* Contact Page from GitHub Repo */}
        {activeSection === "contact" && (
          <div className="min-h-screen">
            <Sidebar />
            <ContactSection />
            <Footer />
          </div>
        )}
      </div>
    </main>
  )
}
