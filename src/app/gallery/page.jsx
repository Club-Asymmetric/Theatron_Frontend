import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"

export default function Gallery() {
  const images = [
    {
      id: 1,
      src: "/gallery-exhibition-art.jpg",
      alt: "Gallery moment 1",
    },
    {
      id: 2,
      src: "/camera-equipment-film.jpg",
      alt: "Gallery moment 2",
    },
    {
      id: 3,
      src: "/art-installation-gallery.jpg",
      alt: "Gallery moment 3",
    },
  ]

  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />
      <Sidebar />

      {/* Gallery Section */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="border-2 border-red-600 px-6 py-3">
                <p className="text-red-600 text-xs tracking-widest">MEMORIES CAPTURED</p>
              </div>
            </div>

            <h1 className="text-6xl font-bold mb-4">GALLERY</h1>

            {/* Decorative line with dot */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-red-600"></div>
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <div className="h-px w-12 bg-red-600"></div>
            </div>

            <p className="text-gray-500 text-sm tracking-wider">MOMENTS FROM PREVIOUS EDITIONS</p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image.id} className="group cursor-pointer overflow-hidden">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-96 object-cover group-hover:scale-105 transition duration-300"
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
