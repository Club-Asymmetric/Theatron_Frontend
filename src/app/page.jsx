"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Countdown from "@/components/countdown"
import PhotoGallery from "@/components/photo-gallery"
import HomeAbout from "@/components/home-about"
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

      {/* Main Page Container: Rendered underneath from start, dissolves in smoothly */}
      <div
        className={`theatron-screen w-full will-change-[opacity,transform] transition-all duration-[900ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${
          showIntro && introState === "INTRO_PLAYING"
            ? "opacity-0 scale-[0.99] pointer-events-none"
            : "opacity-100 scale-100 pointer-events-auto"
        }`}
      >
        {activeSection === "home" && (
          <>
          <section className="theatron-hero" id="home" aria-label="Theatron 2026">
            <div className="theatron-hero-image" />
            <div className="theatron-hero-vignette" />
            <div className="theatron-hero-grain" />

            <div className="theatron-hero-content">
              <div className="theatron-kicker">
                <span className="theatron-kicker-dot" />
                <span>A THEATRE &amp; CINEMA EXPERIENCE</span>
              </div>
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
          <HomeAbout onRegister={() => goTo("events")} />
          <Footer />
          </>
        )}

        {/* Events Page */}
        {activeSection === "events" && (
          <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-black via-zinc-900 to-black">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)]" />
            <EventsSection />
            <Footer />
          </div>
        )}

        {/* Gallery */}
        {activeSection === "gallery" && (
          <div className="relative min-h-screen overflow-x-hidden bg-black">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)]" />
            <PhotoGallery />
            <Footer />
          </div>
        )}

        {/* Contact Page */}
        {activeSection === "contact" && (
          <div className="min-h-screen bg-black">
            <ContactSection />
            <Footer />
          </div>
        )}
      </div>
    </main>
  )
}

