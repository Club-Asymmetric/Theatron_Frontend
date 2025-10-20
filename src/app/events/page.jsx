import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import EventCard from "@/components/event-card"

export default function Events() {
  const events = [
    {
      id: 1,
      title: "CINE PULSE",
      description:
        "Showcase your storytelling prowess through compelling short films. Bring your vision to life in this ultimate cinematic challenge.",
      entryFee: "₹200",
      image: "../../public/film-festival-cinema.png",
    },
    {
      id: 2,
      title: "TRAILER CUT",
      description:
        "Master the art of editing. Create captivating trailers that leave audiences wanting more. Precision, timing, and creativity.",
      entryFee: "₹150",
      image: "../../public/video-editing-camera.jpg",
    },
    {
      id: 3,
      title: "STILLS OF SOUL",
      description:
        "Capture moments that speak louder than words. Display your photography skills and freeze emotions in time.",
      entryFee: "₹150",
      image: "../../public/photography-portraits.jpg",
    },
    {
      id: 4,
      title: "ADAPT TUNE",
      description:
        "Express yourself through movement and rhythm. Dance to the beats of cinema and create mesmerizing performances.",
      entryFee: "₹200",
      image: "../../public/dance-performance-art.jpg",
      highlighted: true,
    },
  ]

  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />
      <Sidebar />

      {/* Events Section */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-red-600 text-xs tracking-widest mb-4">CHOOSE YOUR ARENA</p>
            <h1 className="text-6xl font-bold mb-4">EVENTS</h1>

            {/* Decorative line with dot */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-red-600"></div>
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <div className="h-px w-12 bg-red-600"></div>
            </div>

            <p className="text-gray-500 text-sm tracking-wider">EIGHT CATEGORIES. INFINITE POSSIBILITIES.</p>
            <div className="flex justify-center gap-8 mt-6 text-sm">
              <span className="text-gray-500">■ 8 EVENTS</span>
              <span className="text-gray-500">■ ₹150-200 ENTRY</span>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                entryFee={event.entryFee}
                image={event.image}
                highlighted={event.highlighted}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
