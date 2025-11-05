"use client"
import Navigation from "@/components/navigation"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import { useState } from "react"

export default function CinePulseRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    college: "",
    short_flim_link: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handlePayment = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      // Prepare query params for payment redirect
      const params = new URLSearchParams({
        event: "CinePlus",
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        college: formData.college,
        short_flim_link: formData.short_flim_link,
        amount: 149,
        currency: "INR",
        receipt: `cineplus_${Date.now()}`,
        redirect: "https://theatron-nu.vercel.app/success",
      }).toString()

      // Redirect to payment handler
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.25),transparent_60%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none"></div>

      <Navigation />
      <Sidebar />

      <section className="pt-32 pb-20 px-8 relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4">CINE PLUS</h1>
            <p className="text-red-600 text-sm tracking-wider mb-4">
              SHORT FILM COMPETITION
            </p>
            <p className="text-gray-500 text-sm">
              This short film competition invites participants to showcase their creativity, storytelling, and cinematic vision in a max of 2 mins.
            </p>
          </div>

          <div className="border border-gray-700 p-8 rounded-lg">
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-900 border border-red-600 text-red-200 rounded">
                {errorMsg}
              </div>
            )}

            <form className="space-y-6" onSubmit={handlePayment}>
              {[
                { label: "Participant Name", name: "name" },
                { label: "Phone Number", name: "phone" },
                { label: "Email ID", name: "email" },
                { label: "College", name: "college" },
                { label: "Short Film Link", name: "short_flim_link" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-bold mb-2">{field.label}</label>
                  <input
                    type={
                      field.name === "email"
                        ? "email"
                        : field.name === "phone"
                        ? "tel"
                        : field.name === "short_flim_link"
                        ? "url"
                        : "text"
                    }
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-700 px-4 py-2 text-white focus:border-red-600 focus:outline-none transition"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    required
                  />
                  {field.name === "short_flim_link" && (
                    <p className="text-xs text-gray-500 mt-1">
                      Please ensure your link is publicly accessible (YouTube, Drive, etc.)
                    </p>
                  )}
                </div>
              ))}

              <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
                <span className="text-lg font-bold">Entry Fee</span>
                <span className="text-red-600 text-xl font-bold">₹149</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 px-6 py-3 text-white font-bold hover:bg-red-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "PROCESSING..." : "REGISTER & PAY ₹149"}
              </button>
              <div className="text-red-600 text-lg font-bold">
                Note:- Please fill out the form below after registering to complete your setup.<br/>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSesizujXd4fzW_p7-Q2VGORme-uAI6oYg6gH5kHnkini53Qxw/viewform" target="_blank" className="text-blue-500 hover:text-blue-700 underline">Graphics Grid Form</a>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
