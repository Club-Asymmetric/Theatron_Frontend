"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ContactSection from "@/components/contact-section"

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-ink-950 text-white">
      <Navigation activeSection="contact" />
      <ContactSection />
      <Footer />
    </main>
  )
}
