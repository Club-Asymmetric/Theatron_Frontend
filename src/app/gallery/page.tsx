"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import PhotoGallery from "@/components/photo-gallery"

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)]" />
      <Navigation activeSection="gallery" />
      <PhotoGallery />
      <Footer />
    </main>
  )
}
