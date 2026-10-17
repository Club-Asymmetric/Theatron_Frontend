"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import StageBackdrop from "@/components/stage-backdrop"
import EventsSection from "@/components/events-section"

export default function EventsPage() {
  return (
    <main className="relative bg-ink-950 text-white min-h-screen overflow-x-hidden">
      <StageBackdrop />
      <Navigation activeSection="events" />
      <EventsSection />
      <Footer />
    </main>
  )
}
