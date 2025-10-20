import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"

export default function Registration() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />
      <Sidebar />

      {/* Registration Section */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-8">REGISTRATION</h1>
            <p className="text-gray-500 text-sm tracking-wider">Choose your event and register now</p>
          </div>

          {/* Registration Form */}
          <div className="border border-gray-700 p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Select Event</label>
                <select className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition">
                  <option>Choose an event</option>
                  <option>CINE PULSE - ₹200</option>
                  <option>TRAILER CUT - ₹150</option>
                  <option>STILLS OF SOUL - ₹150</option>
                  <option>ADAPT TUNE - ₹200</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 px-6 py-3 text-white font-bold hover:bg-red-700 transition"
              >
                REGISTER NOW
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
