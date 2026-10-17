"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import StageBackdrop from "@/components/stage-backdrop"
import PhotoGallery from "@/components/photo-gallery"

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-ink-950 text-white">
      <StageBackdrop />
      <Navigation activeSection="gallery" />
      <PhotoGallery />
      <Footer />
    </main>
  )
}
