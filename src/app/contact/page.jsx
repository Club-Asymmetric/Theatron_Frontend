import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"

export default function Contact() {
  return (
    <main className="relative bg-black text-white min-h-screen overflow-hidden">
      {/* Animated gradient background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)] animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)]"></div>

      <Navigation />
      <Sidebar />

      {/* Contact Section */}
      <section className="relative z-10 pt-32 pb-20 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-8">CONTACT</h1>
            <p className="text-gray-500 text-sm tracking-wider">Get in touch with us</p>
          </div>

          {/* Contact Form */}
          <div className="border border-gray-700 p-8 mb-12">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Message</label>
                <textarea
                  rows="5"
                  className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                  placeholder="Your message"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 px-6 py-3 text-white font-bold hover:bg-red-700 transition"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-center text-white">
            <div>
              <p className="text-gray-400 text-xs mb-2 uppercase tracking-widest">Email</p>
              <a href="mailto:immersecit@gmail.com" className="font-bold hover:text-red-600 transition break-all">
                immersecit@gmail.com
              </a>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-2 uppercase tracking-widest">Phone</p>
              <a href="tel:+917904849032" className="font-bold hover:text-red-600 transition">
                +91 7904849032
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
