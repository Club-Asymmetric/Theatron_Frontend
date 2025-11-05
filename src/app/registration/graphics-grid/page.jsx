"use client"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import { useState } from "react"

export default function GraphicsGridRegistration() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", college: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handlePayment = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      // Redirect to GitHub Pages payment handler
      const params = new URLSearchParams({
        event: "Graphics_Grid",
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        college: formData.college,
        amount: 99,
        currency: "INR",
        receipt: `graphicsgrid_${Date.now()}`,
        redirect: "https://theatron-nu.vercel.app/success"
      }).toString()

      window.location.href = `https://farhansohail07.github.io/Project-/payment.html?${params}`
    } catch (err) {
      console.error(err)
      setErrorMsg("Something went wrong while starting payment.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-black text-white min-h-screen relative">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none"></div>

      <Navigation />
      <Sidebar />

      <section className="pt-32 pb-20 px-8 relative">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4">GRAPHICS GRID</h1>
            <p className="text-red-600 text-sm tracking-wider mb-4">POSTER DESIGN COMPETITION</p>
            <p className="text-gray-500 text-sm">
              Unleash your imagination in this poster-making challenge. Design original, AI-free artworks that capture
              the spirit of cinema, creativity, and artistic expression.
            </p>
          </div>

          {/* Form */}
          <div className="border border-gray-700 p-8 rounded-lg">
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-900 border border-red-600 text-red-200 rounded">{errorMsg}</div>
            )}

            <form className="space-y-6" onSubmit={handlePayment}>
              {["name", "phone", "email", "college"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-bold mb-2 capitalize">{field}</label>
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                    required
                  />
                </div>
              ))}

              <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
                <span className="text-lg font-bold">Entry Fee</span>
                <span className="text-red-600 text-xl font-bold">₹99</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 px-6 py-3 text-white font-bold hover:bg-red-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "PROCESSING..." : "REGISTER & PAY ₹99"}
              </button>
              <div className="text-red-600 text-lg font-bold">
                Note:- Please fill out the form below after registering to complete your setup.<br/>
                <a href="https://forms.gle/fY4pWg4JA9RBKiFk9">Graphics Grid Form</a>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
