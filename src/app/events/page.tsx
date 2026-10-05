"use client"

import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import EventsSection from "@/components/events-section"

export default function EventsPage() {
  return (
    <main className="relative bg-gradient-to-br from-black via-zinc-900 to-black text-white min-h-screen overflow-hidden">
      <Navigation activeSection="events" />
      <Sidebar />
      <EventsSection />
      <Footer />
    </main>
  )
}
