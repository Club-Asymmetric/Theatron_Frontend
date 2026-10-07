"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ContactSection from "@/components/contact-section"

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#1a0a08] via-black to-black text-white selection:bg-[#e10600] selection:text-white">
      <Navigation activeSection="contact" />
      <ContactSection />
      <Footer />
    </main>
  )
}
