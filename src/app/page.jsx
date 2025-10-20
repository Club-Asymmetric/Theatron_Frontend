import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import Countdown from "@/components/countdown"

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />
      <Sidebar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tagline */}
          <div className="text-center mb-16">
            <p className="text-gray-500 text-sm tracking-widest mb-8">
              A FUSION OF FILM, PHOTOGRAPHY, ART, AND EXPRESSION
            </p>

            {/* Decorative line with dot */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-12 bg-red-600"></div>
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <div className="h-px w-12 bg-red-600"></div>
            </div>
          </div>

          {/* Countdown */}
          <div className="mb-20">
            <Countdown />
          </div>

          {/* Main Title */}
          <div className="text-center mb-20">
            <h1 className="text-7xl font-bold neon-glow mb-4">
              THEATRON <span className="bg-red-600 px-6 py-2 ml-4">2025</span>
            </h1>
          </div>

          {/* Tagline */}
          <div className="text-center mb-20">
            <p className="text-gray-500 text-sm tracking-widest">A FUSION OF FILM, PHOTOGRAPHY, ART, AND EXPRESSION</p>
          </div>

          {/* Decorative line with dot */}
          <div className="flex items-center justify-center gap-4 mb-20">
            <div className="h-px w-12 bg-red-600"></div>
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <div className="h-px w-12 bg-red-600"></div>
          </div>

          {/* Sponsors Section */}
          <div className="mb-20">
            <p className="text-center text-red-600 text-xs tracking-widest mb-12">PRESENTED BY OUR SPONSORS</p>
            <div className="flex justify-center items-center gap-12">
              <p className="text-gray-600 text-lg">SPONSOR ONE</p>
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <p className="text-gray-600 text-lg">SPONSOR TWO</p>
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <p className="text-gray-600 text-lg">SPONSOR THREE</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-6">
            <button className="bg-red-600 px-12 py-3 text-white font-bold hover:bg-red-700 transition">
              REGISTER NOW →
            </button>
            <button className="border border-gray-600 px-12 py-3 text-white font-bold hover:border-white transition">
              VIEW EVENTS
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
