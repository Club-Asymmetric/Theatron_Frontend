"use client"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"

export default function GeneralPass() {
  return (
    <main className="bg-black text-white min-h-screen relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)]"></div>
      <Navigation />
      <Sidebar />

      <section className="pt-32 pb-20 px-8 relative">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-4">Dance Workshop</h1>

          <div className="border border-gray-700 p-10 rounded-lg bg-gray-900 shadow-lg">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Registration Closed</h2>
            <p className="text-gray-400">
              Registrations for the <span className="text-white font-semibold">Dance Workshop</span> are now closed.
              <br />
              Try registering for other exciting events available on our platform.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
