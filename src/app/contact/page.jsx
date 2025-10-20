import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"

export default function Contact() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />
      <Sidebar />

      {/* Contact Section */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-8">CONTACT</h1>
            <p className="text-gray-500 text-sm tracking-wider">Get in touch with us</p>
          </div>

          {/* Contact Form */}
          <div className="border border-gray-700 p-8">
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
          <div className="mt-12 grid grid-cols-2 gap-8 text-center">
            <div>
              <p className="text-gray-500 text-xs mb-2">EMAIL</p>
              <p className="text-white font-bold">info@theatron.com</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-2">PHONE</p>
              <p className="text-white font-bold">+91 XXXX XXXX XX</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
