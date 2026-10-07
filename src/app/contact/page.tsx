"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ContactSection from "@/components/contact-section"

export default function ContactPage() {
  return (
    <main className="relative bg-black text-white min-h-screen overflow-x-hidden selection:bg-[#8F1111] selection:text-white">
      <Navigation activeSection="contact" />
      <ContactSection />
      <Footer />
    </main>
  )
}
