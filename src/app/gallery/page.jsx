import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"

export default function Gallery() {
  const images = [
    {id: 1, src: "/img1.jpg", alt: "Gallery moment 1"},
    {id: 2, src: "/img2.jpg", alt: "Gallery moment 2"},
    {id: 4, src: "/img4.jpg", alt: "Gallery moment 4"},
    {id: 5, src: "/img5.jpg", alt: "Gallery moment 5"},
    {id: 6, src: "/img10.jpg", alt: "Gallery moment 6"},
    {id: 7, src: "/img7.jpg", alt: "Gallery moment 7"},
    {id: 8, src: "/img11.jpg", alt: "Gallery moment 8"},
    {id: 9, src: "/img12.jpg", alt: "Gallery moment 9"},
    {id: 9, src: "/img13.jpeg", alt: "Gallery moment 10"},
    {id: 9, src: "/img14.jpeg", alt: "Gallery moment 11"},
    {id: 9, src: "/img15.jpeg", alt: "Gallery moment 12"},
    {id: 9, src: "/img16.jpeg", alt: "Gallery moment 13"},
    {id: 9, src: "/img17.jpeg", alt: "Gallery moment 1"},
    {id: 9, src: "/img18.jpeg", alt: "Gallery moment 15"},
  ]

  return (
    <main className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)] animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)]"></div>

      <Navigation />
      <Sidebar />

      {/* Gallery Section */}
      <section className="pt-32 pb-20 px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="border-2 border-red-600 px-6 py-3">
                <p className="text-red-600 text-xs tracking-widest">MEMORIES CAPTURED</p>
              </div>
            </div>

            <h1 className="text-6xl font-bold mb-4">GALLERY</h1>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-red-600"></div>
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <div className="h-px w-12 bg-red-600"></div>
            </div>

            <p className="text-gray-500 text-sm tracking-wider">MOMENTS FROM PREVIOUS EDITIONS</p>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="break-inside-avoid overflow-hidden border-2 border-red-600 rounded-xl group"
              >
                <img
                  src={image.src || "/placeholder.jpg"}
                  alt={image.alt}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

