"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import EventsSection from "@/components/events-section"

export default function EventsPage() {
  return (
    <main className="relative bg-gradient-to-br from-black via-zinc-900 to-black text-white min-h-screen overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)]" />
      <Navigation activeSection="events" />
      <EventsSection />
      <Footer />
    </main>
  )
}
