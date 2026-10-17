"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Countdown from "@/components/countdown"
import PhotoGallery from "@/components/photo-gallery"
import HomeAbout from "@/components/home-about"
import EventsSection from "@/components/events-section"
import ContactSection from "@/components/contact-section"
import CinematicHero from "@/components/cinematic-hero"
import StageBackdrop from "@/components/stage-backdrop"
import { ArrowRight, Play, CalendarDays } from "lucide-react"

const sections = ["home", "events", "gallery", "contact"]

export default function Home() {
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
    <main className="theatron-site relative min-h-screen bg-ink-950 text-white">
      <Navigation activeSection={activeSection} onNavigate={goTo} />

      <div className="theatron-screen w-full">
        {activeSection === "home" && (
          <>
          {/* The intro video plays inside the hero, then settles into the homepage composition */}
          <CinematicHero id="home" ariaLabel="Theatron 2026">
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

            <div className="theatron-progress" aria-hidden="true">
              <span>01</span>
              <i />
              <span>06</span>
            </div>
          </CinematicHero>
          <HomeAbout onRegister={() => goTo("events")} />
          <Footer />
          </>
        )}

        {/* Events Page */}
        {activeSection === "events" && (
          <div className="nx-scene relative min-h-screen overflow-x-hidden bg-ink-950">
            <StageBackdrop />
            <EventsSection />
            <Footer />
          </div>
        )}

        {/* Gallery */}
        {activeSection === "gallery" && (
          <div className="nx-scene relative min-h-screen overflow-x-hidden bg-ink-950">
            <StageBackdrop />
            <PhotoGallery />
            <Footer />
          </div>
        )}

        {/* Contact Page */}
        {activeSection === "contact" && (
          <div className="nx-scene relative min-h-screen bg-ink-950">
            <ContactSection />
            <Footer />
          </div>
        )}
      </div>
    </main>
  )
}

