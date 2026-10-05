"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import Countdown from "@/components/countdown"
import Gallery from "@/components/gallery"
import CinematicIntro from "@/components/cinematic-intro"
import { ArrowRight, Play, CalendarDays } from "lucide-react"
import type { IntroState, SectionId } from "@/types"

const sections: SectionId[] = ["home", "events", "gallery", "contact"]

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(true)
  const [introState, setIntroState] = useState<IntroState>("INTRO_PLAYING")
  const [activeSection, setActiveSection] = useState<SectionId>("home")

  const goTo = (id: SectionId) => setActiveSection(id)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
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
    <main className="theatron-site">
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

      <div
        className="theatron-screen"
        style={{
          transform: showIntro && introState === 'INTRO_ENTERING_SCREEN' ? 'scale(0.96)' : 'scale(1)',
          filter: showIntro && introState === 'INTRO_ENTERING_SCREEN' ? 'blur(3px)' : 'none',
          transition: showIntro ? 'transform 1000ms cubic-bezier(0.22, 0.85, 0.3, 1), filter 800ms ease-out' : 'none',
        }}
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
                <button type="button" onClick={() => goTo("events")} className="theatron-button theatron-button-primary">
                  <span>EXPLORE EVENTS</span>
                  <ArrowRight size={18} />
                </button>
                <button type="button" onClick={() => goTo("gallery")} className="theatron-button theatron-button-secondary">
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

        {activeSection === "events" && (
          <section className="events-screen" id="events">
            <div className="events-section">
              <div className="events-glow" />
              <div className="events-content">
                <span className="section-kicker">THEATRON / PROGRAMME</span>
                <h2>THE <b>EVENTS</b></h2>
                <p>Experience cinema, theatre and performance across one cinematic programme.</p>
                <div className="event-grid">
                  <article><span>01</span><h3>SCREEN</h3><p>Curated cinematic experiences.</p></article>
                  <article><span>02</span><h3>STAGE</h3><p>Live theatre and performance.</p></article>
                  <article><span>03</span><h3>LIVE</h3><p>Immersive experiences and moments.</p></article>
                </div>
              </div>
            </div>
            <Footer />
          </section>
        )}

        {activeSection === "gallery" && (
          <section className="gallery-screen" id="gallery">
            <Gallery />
            <Footer />
          </section>
        )}

        {activeSection === "contact" && (
          <section className="contact-screen" id="contact">
            <Footer />
          </section>
        )}
      </div>
    </main>
  )
}
